import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import Language from '@components/language/Language';

const Header: React.FC = () => {
    const { t } = useTranslation('common');

    const handleSignOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        window.location.href = '/login';
    };

    return (
        <header className="flex justify-between items-center px-8 py-4 bg-white shadow">
            {/* Left side of the navbar */}
            <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold text-red-600">
                    <Link href="/">
                        <span>Pinnacle</span>
                    </Link>
                </h1>
                <nav className="flex space-x-4">
                    <Link href="/" className="text-gray-700 hover:text-black">
                        {t('header.nav.pins')}
                    </Link>
                    <Link href="/boards" className="text-gray-700 hover:text-black">
                        {t('header.nav.boards')}
                    </Link>
                </nav>
            </div>

            {/* Right side of the navbar */}
            <div className="flex items-center space-x-6">
                <Language />
                <Link href="/profile" className="text-gray-700 hover:text-black">
                    {t('header.nav.profile')}
                </Link>
                <button
                    onClick={handleSignOut}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    {t('header.nav.signout')}
                </button>
            </div>
        </header>
    );
};

export default Header;
