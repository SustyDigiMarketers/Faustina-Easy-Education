import { useState } from 'react';
import { Page } from '../../App';

type UserRole = 'admin' | 'superadmin' | null;

interface UseAuthProps {
    navigate: (page: Page) => void;
}

export const useAuth = ({ navigate }: UseAuthProps) => {
    const [isLoginPageOpen, setLoginPageOpen] = useState(false);
    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
    const [isSuperAdminAuthenticated, setIsSuperAdminAuthenticated] = useState(false);

    const handleOpenLoginPage = () => setLoginPageOpen(true);
    const handleCloseLoginPage = () => setLoginPageOpen(false);

    const handleLoginSuccess = (credentials: { email: string }) => {
        if (credentials.email.toLowerCase().startsWith('superadmin')) {
            setIsSuperAdminAuthenticated(true);
            setIsAdminAuthenticated(true);
        } else {
            setIsAdminAuthenticated(true);
            setIsSuperAdminAuthenticated(false);
        }
        setLoginPageOpen(false);
        navigate('admin');
    };

    const handleLogout = () => {
        setIsAdminAuthenticated(false);
        setIsSuperAdminAuthenticated(false);
        navigate('home');
    };
    
    const userRole: UserRole = isSuperAdminAuthenticated ? 'superadmin' : isAdminAuthenticated ? 'admin' : null;

    return {
        userRole,
        isLoginPageOpen,
        isSuperAdminAuthenticated,
        isAdminAuthenticated,
        authHandlers: {
            handleOpenLoginPage,
            handleCloseLoginPage,
            handleLoginSuccess,
            handleLogout,
        }
    };
};
