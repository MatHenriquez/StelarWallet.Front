import React from 'react';
import { desktopHeaderLinks } from '../constants/header-links';

const DesktopHeaderMenu = () => (
  <div className='navbar-center hidden lg:flex'>
    <ul className='menu menu-horizontal bg-main-blue-200 px-1'>
      {desktopHeaderLinks.map((link) => (
        <li key={link.key}> {link}</li>
      ))}
    </ul>
  </div>
);

export default DesktopHeaderMenu;
