import React from 'react';
import Image from 'next/image';
import brandIcon from '../../favicon.ico';
import { CLIENT_ROUTES } from '@/app/constants/routes/front-routes';

const HomeButton = () => (
  <a href={CLIENT_ROUTES.HOME} className='btn btn-ghost text-2xl hover:bg-main-blue-500'>
    {' '}
    <Image src={brandIcon} alt='icon' height={48} /> Crippy
  </a>
);

export default HomeButton;
