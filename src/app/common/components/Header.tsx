'use client';

import React from 'react';
import { CLIENT_ROUTES } from '@/app/constants/routes/front-routes';
import { useRouter } from 'next/navigation';
import UserMenu from './UserMenu';
import MobileHeaderMenu from './MobileHeaderMenu';
import DesktopHeaderMenu from './DesktopHeaderMenu';

const Header = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    router.push(CLIENT_ROUTES.AUTH.LOGIN);
  };

  return (
    <header data-cy='header'>
      <div className='navbar bg-main-blue-200 text-main-blue-900'>
        <MobileHeaderMenu />
        <DesktopHeaderMenu />
        <div className='navbar-end'>
          <UserMenu handleLogout={handleLogout} />
        </div>
      </div>
    </header>
  );
};

export default Header;
