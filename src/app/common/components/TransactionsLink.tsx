import React from 'react';
import { CLIENT_ROUTES } from '@/app/constants/routes/front-routes';

const TransactionsLink = () => (
  <a href={CLIENT_ROUTES.TRANSACTIONS} className='hover:bg-main-blue-500'>
    Transactions
  </a>
);

export default TransactionsLink;
