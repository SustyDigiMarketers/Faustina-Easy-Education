import React, { useEffect, useRef, useState } from 'react';
import { XIcon, LogoGraduationCapIcon } from './icons';

interface LoginPageProps {
    onClose: () => void;
    onLoginSuccess: (credentials: { email: string, password: string }) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onClose, onLoginSuccess }) => {
    const formRef = useRef<HTMLDivElement>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        const handleClickOutside = (e: MouseEvent) => {
            if (formRef.current && !formRef.current.contains(e.target as Node)) {
                onClose();
            }
        }

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('mousedown', handleClickOutside);

        const firstInput = formRef.current?.querySelector('input');
        firstInput?.focus();

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLoginSuccess({ email, password });
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4 transition-opacity duration-300 animate-fade-in"
            role="dialog"
            aria-modal="true"
            aria-labelledby="login-form-title"
        >
            <div ref={formRef} className="bg-white rounded-lg shadow-2xl w-full max-w-md relative flex flex-col">
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 bg-slate-50 rounded-t-lg">
                    <div className="flex items-center space-x-3">
                        <div className="bg-blue-600 p-2 rounded-md">
                            <LogoGraduationCapIcon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 id="login-form-title" className="text-lg sm:text-xl font-bold text-gray-800">Admin Portal Login</h2>
                            <p className="text-xs sm:text-sm text-gray-500">Use 'superadmin@example.com' for Superadmin access.</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Close login form"
                    >
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
                    <div>
                        <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-1">Email Address <span className="text-red-500">*</span></label>
                        <input
                            type="email"
                            id="login-email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="admin@example.com"
                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-1">Password <span className="text-red-500">*</span></label>
                        <input
                            type="password"
                            id="login-password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="any password"
                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    
                    <div className="pt-2">
                        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-md hover:bg-blue-700 transition-all duration-300 disabled:bg-gray-400">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
