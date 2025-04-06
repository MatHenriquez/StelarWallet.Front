'use client';

import Image from 'next/image';
import React from 'react';
import brandIcon from '../../favicon.ico';
import { CLIENT_ROUTES } from '@/app/constants/routes/front-routes';
import { useRouter } from 'next/navigation';
import MobileMenuIcon from './MobileMenuIcon';
import UserMenu from './UserMenu';

const Header = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    router.push(CLIENT_ROUTES.AUTH.LOGIN);
  };

  return (
    <header data-cy='header'>
      <div className='navbar bg-main-blue-200 text-main-blue-900'>
        <div className='navbar-start'>
          <div className='dropdown'>
            <MobileMenuIcon />
            <ul
              tabIndex={0}
              className='menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 bg-main-blue-200 p-2 shadow'
            >
              <li>
                <a href='/dashboard' className='hover:bg-main-blue-500'>
                  Balances
                </a>
              </li>
              <li>
                <button className='hover:bg-main-blue-500'>Wallets</button>
                <ul className='bg-main-blue-200 p-2'>
                  <li>
                    <button className='hover:bg-main-blue-500'>Wallet 1</button>
                  </li>
                  <li>
                    <button className='hover:bg-main-blue-500'>Wallet 2</button>
                  </li>
                </ul>
              </li>
              <li>
                <a href={CLIENT_ROUTES.TRANSACTIONS} className='hover:bg-main-blue-500'>
                  Transactions
                </a>
              </li>
            </ul>
          </div>
          <a href={CLIENT_ROUTES.HOME} className='btn btn-ghost text-2xl hover:bg-main-blue-500'>
            {' '}
            <Image src={brandIcon} alt='icon' height={48} /> Crippy
          </a>
        </div>
        <div className='navbar-center hidden lg:flex'>
          <ul className='menu menu-horizontal bg-main-blue-200 px-1'>
            <li>
              <a href='/dashboard' className='hover:bg-main-blue-500'>
                Balances
              </a>
            </li>
            <li>
              <details>
                <summary className='hover:bg-main-blue-500'>Wallets</summary>
                <ul className='bg-main-blue-200 p-2'>
                  <li>
                    <button className='hover:bg-main-blue-500'>Wallet 1</button>
                  </li>
                  <li>
                    <button className='hover:bg-main-blue-500'>Wallet 2</button>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <a href={CLIENT_ROUTES.TRANSACTIONS} className='hover:bg-main-blue-500'>
                Transactions
              </a>
            </li>
          </ul>
        </div>
        <div className='navbar-end'>
          <UserMenu handleLogout={handleLogout} />
        </div>
      </div>
    </header>
  );
};

export default Header;
