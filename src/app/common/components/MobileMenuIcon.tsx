import React from 'react';

const MobileMenuIcon = () => (
  <div tabIndex={0} role='button' className='btn btn-ghost hover:bg-main-blue-500 lg:hidden'>
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='h-5 w-5'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M4 6h16M4 12h8m-8 6h16'
      />
    </svg>
  </div>
);

export default MobileMenuIcon;
