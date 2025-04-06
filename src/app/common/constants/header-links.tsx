import React from 'react';
import BalancesLink from '../components/BalancesLink';
import TransactionsLink from '../components/TransactionsLink';
import WalletsDropdown from '../components/WalletsDropdown';
import WalletsSummary from '../components/WalletsSummary';

export const mobileHeaderLinks = [
  <BalancesLink key='balances-link' />,
  <WalletsDropdown key='wallets-dropdown' />,
  <TransactionsLink key='transactions-link' />,
];

export const desktopHeaderLinks = [
  <BalancesLink key='balances-link' />,
  <WalletsSummary key='wallets-dropdown' />,
  <TransactionsLink key='transactions-link' />,
];
