'use client';
import React, { useEffect, useState } from 'react';
import { toast, Toaster } from 'sonner';
import styles from './styles/page.module.css';
import { ITransaction } from './interfaces/transaction.interface';
import TransactionsTable from './components/TransactionsTable';
import { AUTH } from '../constants/auth/auth';
import useTransactionHistory from '../hooks/use-transaction-history';

const Transactions = () => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number | undefined>();
  const getUserTransactions = useTransactionHistory();

  const getTransactions = (pageNumber: number) => {
    setIsLoading(true);
    toast.loading('Getting transactions...');

    getUserTransactions({
      setTransactions,
      setTotalPages,
      setIsLoading,
      pageNumber,
    });
  };

  useEffect(() => {
    getTransactions(1);
  }, [publicKey]);

  useEffect(() => {
    const key = localStorage.getItem(AUTH.PUBLIC_KEY);
    setPublicKey(key);
  }, []);

  return (
    <div className={styles.container}>
      <Toaster position='top-right' />
      <h2 className={styles.title} data-cy='transactions-title'>
        Transactions
      </h2>
      {(() => {
        if (isLoading) {
          return <p>Loading...</p>;
        } else if (transactions && transactions.length > 0) {
          return (
            <TransactionsTable
              transactions={transactions}
              totalPages={totalPages as number}
              getTransactions={getTransactions}
            />
          );
        } else {
          return <p data-cy='no-transactions-message'>No transactions found.</p>;
        }
      })()}
    </div>
  );
};

export default Transactions;
