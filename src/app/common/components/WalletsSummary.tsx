import React from 'react';

const WalletsSummary = () => (
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
);

export default WalletsSummary;
