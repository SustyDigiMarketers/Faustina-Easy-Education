import { GalleryImage, BlogPost } from '../types';
import { Course } from './CourseCard';

// Define a loose type for SupabaseClient to avoid needing the package types
type SupabaseClient = any;

// --- HELPER FUNCTIONS ---

/**
 * Converts a base64 string (like one from a file reader) into a Blob,
 * which is needed for uploading to Supabase Storage.
 */
const base64ToBlob = (base64: string, contentType: string = ''): Blob => {
    try {
        const byteCharacters = atob(base64.split(',')[1]);
        const byteArrays = [];
        for (let offset = 0; offset < byteCharacters.length; offset += 512) {
            const slice = byteCharacters.slice(offset, offset + 512);
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        return new Blob(byteArrays, { type: contentType });
    } catch (e) {
        console.error("Error converting base64 to blob", e);
        return new Blob([], { type: contentType });
    }
};

// --- SUPABASE CLIENT FACTORY ---
export const createSupabaseClient = (): SupabaseClient => {
    const config = (window as any).SUPABASE_CONFIG;
    if (!config || !config.URL || !config.ANON_KEY) {
        console.warn("Supabase credentials missing. Falling back to offline mode.");
        throw new Error("Supabase not configured");
    }
    
    // Access the global supabase client provided by the CDN script
    const supabaseGlobal = (window as any).supabase;
    if (!supabaseGlobal || !supabaseGlobal.createClient) {
         console.warn("Supabase library not loaded via CDN.");
         throw new Error("Supabase library not loaded");
    }

    // Custom fetch to remove headers that might be blocked by some firewalls
    const customFetch = (input: RequestInfo | URL, init?: RequestInit) => {
        if (init && init.headers) {
            // Remove x-client-info to avoid detection/blocking by strict firewalls
            const headers = new Headers(init.headers);
            headers.delete('x-client-info');
            
            // Explicitly add Authorization if it's missing but anon key is known (fallback)
            if (!headers.has('Authorization') && config.ANON_KEY) {
                headers.set('Authorization', `Bearer ${config.ANON_KEY}`);
            }
            if (!headers.has('apikey') && config.ANON_KEY) {
                headers.set('apikey', config.ANON_KEY);
            }

            init.headers = headers;
        }
        return fetch(input, init);
    };

    return supabaseGlobal.createClient(config.URL, config.ANON_KEY, {
        global: {
            fetch: customFetch,
        },
        auth: {
            detectSessionInUrl: false,
            persistSession: true,
        }
    });
};

// --- API FUNCTIONS ---

const handleApiError = (context: string, error: any) => {
    const errorMessage = error?.message || JSON.stringify(error);
    const errorCode = error?.code;
    
    // Suppress noisy "Failed to fetch" errors which happen in offline/sandbox environments
    if (errorMessage === 'Failed to fetch' || errorMessage.includes('NetworkError') || errorMessage.includes('Load failed')) {
        console.warn(`[${context}] Network unavailable or blocked. Switching to offline data.`);
        return null;
    }

    // Check for "Table Not Found" (42P01)
    if (errorCode === '42P01' || errorMessage.includes('Could not find the table')) {
        console.warn(`[${context}] Database tables missing. App will run with static data.`);
        return null;
    }

    // Check for common Supabase errors and give specific advice
    if (errorMessage.includes("row-level security") || errorCode === "42501") {
        console.error(`[${context}] 🚨 PERMISSION DENIED (RLS) 🚨`);
        console.warn("REASON: You are logged in as 'Simulated Admin', which is effectively a Guest to the database.");
        console.warn("FIX: Please run the 'database_setup.sql' file content in your Supabase SQL Editor.");
    } else if (errorMessage.includes("not found") || errorCode === "42P01" || error?.statusCode === "404") {
        console.warn(`[${context}] RESOURCE MISSING (Bucket/Table).`);
    } else {
        console.error(`API Error in ${context}:`, errorMessage);
    }

    return null;
};

// Delay helper to wait for DB consistency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Gallery
export const fetchGalleryImages = async (): Promise<GalleryImage[] | null> => {
    try {
        const supabase = createSupabaseClient();
        const { data, error } = await supabase.from('gallery_images').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        return data as GalleryImage[];
    } catch (error) {
        return handleApiError("fetchGalleryImages", error);
    }
};

export const addGalleryImage = async (image: GalleryImage): Promise<GalleryImage[] | null> => {
    try {
        const supabase = createSupabaseClient();
        let finalSrc = image.src; 

        // If it's a local file (base64), try to upload it
        if (image.src.startsWith('data:')) {
            const blob = base64ToBlob(image.src, 'image/jpeg');
            const fileName = `gallery-${Date.now()}.jpg`;
            
            // Explicitly try to upload to 'gallery_uploads' bucket
            const { error: uploadError } = await supabase.storage.from('gallery_uploads').upload(fileName, blob);
            if (uploadError) throw uploadError;

            // Get Public URL
            const { data: urlData } = supabase.storage.from('gallery_uploads').getPublicUrl(fileName);
            finalSrc = urlData.publicUrl; 
        }

        const { error: insertError } = await supabase.from('gallery_images').insert({ src: finalSrc, caption: image.caption, category: image.category });
        if (insertError) throw insertError;

        // Small delay to ensure DB write is propagated before read
        await delay(500);

        return fetchGalleryImages();
    } catch (error) {
        return handleApiError("addGalleryImage", error);
    }
};

export const deleteGalleryImage = async (src: string): Promise<GalleryImage[] | null> => {
    try {
        const supabase = createSupabaseClient();
        // Don't try to delete from storage if it's a base64 string (local only)
        if (!src.startsWith('data:')) {
            const fileName = src.split('/').pop();
            if (fileName) {
                await supabase.storage.from('gallery_uploads').remove([fileName]);
            }
            const { error: dbError } = await supabase.from('gallery_images').delete().eq('src', src);
            if (dbError) throw dbError;
        }

        await delay(300);
        return fetchGalleryImages();
    } catch (error) {
        return handleApiError("deleteGalleryImage", error);
    }
};

// Blog Posts
export const fetchBlogPosts = async (): Promise<BlogPost[] | null> => {
    try {
        const supabase = createSupabaseClient();
        const { data, error } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        return data as BlogPost[];
    } catch (error) {
        return handleApiError("fetchBlogPosts", error);
    }
};

export const addBlogPost = async (post: Omit<BlogPost, 'id' | 'date' | 'author' | 'comments'>): Promise<BlogPost[] | null> => {
    try {
        const supabase = createSupabaseClient();
        let imageUrl = post.image;

        if (post.image.startsWith('data:')) {
            const blob = base64ToBlob(post.image, 'image/jpeg');
            const fileName = `blog-${Date.now()}.jpg`;
            const { error: uploadError } = await supabase.storage.from('blog_uploads').upload(fileName, blob);
            if (uploadError) throw uploadError;
            const { data: urlData } = supabase.storage.from('blog_uploads').getPublicUrl(fileName);
            imageUrl = urlData.publicUrl;
        }
        
        const newPostForDb = {
            ...post,
            image: imageUrl,
            date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            author: 'Admin',
            comments: 0,
        };
        
        const { error: insertError } = await supabase.from('blog_posts').insert(newPostForDb);
        if (insertError) throw insertError;
        
        await delay(500);
        return fetchBlogPosts();
    } catch (error) {
        return handleApiError("addBlogPost", error);
    }
};

export const updateBlogPost = async (updatedPost: BlogPost): Promise<BlogPost[] | null> => {
    try {
        const supabase = createSupabaseClient();
        const postForDb = { ...updatedPost };
        
        if (postForDb.image.startsWith('data:image')) {
            const blob = base64ToBlob(postForDb.image, 'image/jpeg');
            const fileName = `blog-${Date.now()}.jpg`;
            const { error: uploadError } = await supabase.storage.from('blog_uploads').upload(fileName, blob);
            if (uploadError) throw uploadError;
            const { data: urlData } = supabase.storage.from('blog_uploads').getPublicUrl(fileName);
            postForDb.image = urlData.publicUrl;
        }
        
        const { error } = await supabase.from('blog_posts').update(postForDb).eq('id', postForDb.id);
        if (error) throw error;

        await delay(300);
        return fetchBlogPosts();
    } catch (error) {
        return handleApiError("updateBlogPost", error);
    }
};

export const deleteBlogPost = async (id: number): Promise<BlogPost[] | null> => {
    try {
        const supabase = createSupabaseClient();
        const { data: post } = await supabase.from('blog_posts').select('image').eq('id', id).single();
        const { error: dbError } = await supabase.from('blog_posts').delete().eq('id', id);
        if (dbError) throw dbError;
        if (post?.image && !post.image.startsWith('data:')) {
            const fileName = post.image.split('/').pop();
            if (fileName) {
                await supabase.storage.from('blog_uploads').remove([fileName]);
            }
        }
        await delay(300);
        return fetchBlogPosts();
    } catch (error) {
         return handleApiError("deleteBlogPost", error);
    }
};

// Courses
export const fetchCourses = async (): Promise<Course[] | null> => {
    try {
        const supabase = createSupabaseClient();
        const { data, error } = await supabase.from('courses').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        // Transform logic: Ensure uniqueness is handled correctly if it's returned as null or string
        const transformedData = (data as any[]).map(course => ({
             ...course,
             uniqueness: Array.isArray(course.uniqueness) ? course.uniqueness : (course.uniqueness ? [course.uniqueness] : []),
             instructor: { name: course.instructor_name || 'Instructor' }
        }));
        return transformedData as Course[];
    } catch (error) {
        return handleApiError("fetchCourses", error);
    }
};

export const addCourse = async (course: Omit<Course, 'id'>): Promise<Course[] | null> => {
    try {
        const supabase = createSupabaseClient();
        let imageUrl = course.image;

        if (course.image.startsWith('data:')) {
            const blob = base64ToBlob(course.image, 'image/jpeg');
            const fileName = `course-${Date.now()}.jpg`;
            const { error: uploadError } = await supabase.storage.from('course_uploads').upload(fileName, blob);
            if (uploadError) throw uploadError;
            const { data: urlData } = supabase.storage.from('course_uploads').getPublicUrl(fileName);
            imageUrl = urlData.publicUrl;
        }
        
        const newCourse = { 
            ...course, 
            image: imageUrl,
            instructor_name: course.instructor.name,
        };
        const { instructor, ...courseDataForDb } = newCourse as any;

        const { error: insertError } = await supabase.from('courses').insert(courseDataForDb);
        if (insertError) throw insertError;
        
        await delay(500);
        return fetchCourses();
    } catch (error) {
        return handleApiError("addCourse", error);
    }
};

export const updateCourse = async (updatedCourse: Course): Promise<Course[] | null> => {
    try {
        const supabase = createSupabaseClient();
        const courseForDb = { ...updatedCourse, instructor_name: updatedCourse.instructor.name } as any;
        delete courseForDb.instructor;
        
        if (courseForDb.image.startsWith('data:image')) {
            const blob = base64ToBlob(courseForDb.image, 'image/jpeg');
            const fileName = `course-${Date.now()}.jpg`;
            const { error: uploadError } = await supabase.storage.from('course_uploads').upload(fileName, blob);
            if (uploadError) throw uploadError;
            const { data: urlData } = supabase.storage.from('course_uploads').getPublicUrl(fileName);
            courseForDb.image = urlData.publicUrl;
        }

        const { error } = await supabase.from('courses').update(courseForDb).eq('id', courseForDb.id);
        if (error) throw error;
        
        await delay(300);
        return fetchCourses();
    } catch (error) {
        return handleApiError("updateCourse", error);
    }
};

export const deleteCourse = async (id: number): Promise<Course[] | null> => {
    try {
        const supabase = createSupabaseClient();
        const { data: course } = await supabase.from('courses').select('image').eq('id', id).single();
        const { error: dbError } = await supabase.from('courses').delete().eq('id', id);
        if (dbError) throw dbError;
        if (course?.image && !course.image.startsWith('data:')) {
            const fileName = course.image.split('/').pop();
            if (fileName) {
                await supabase.storage.from('course_uploads').remove([fileName]);
            }
        }
        await delay(300);
        return fetchCourses();
    } catch (error) {
        return handleApiError("deleteCourse", error);
    }
};