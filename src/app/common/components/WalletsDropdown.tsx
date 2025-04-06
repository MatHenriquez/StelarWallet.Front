import React from 'react';

const WalletsDropdown = () => (
  <>
    <button className='hover:bg-main-blue-500'>Wallets</button>
    <ul className='bg-main-blue-200 p-2'>
      <li>
        <button className='hover:bg-main-blue-500'>Wallet 1</button>
      </li>
      <li>
        <button className='hover:bg-main-blue-500'>Wallet 2</button>
      </li>
    </ul>
  </>
);

export default WalletsDropdown;
