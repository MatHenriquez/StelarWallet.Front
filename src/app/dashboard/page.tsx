'use client';
import React, { useEffect, useState } from 'react';
import styles from './styles/page.module.css';
import { IBalance } from './interfaces/balances-response.interface';
import BalanceCard from './components/BalanceCard';
import Pagination from './components/Pagination';
import LoadingBalance from './components/LoadingBalance';
import { toast, Toaster } from 'sonner';
import GetTestBalances from './components/GetTestBalances';
import { IPaymentPayload } from './interfaces/payment-payload.interface';
import PaymentModal from './components/PaymentModal';
import { IAsset } from '../auth/common/interfaces/asset.interface';
import { AUTH } from '../constants/auth/auth';
import useTestFunds from '../hooks/use-test-funds';
import useBalances from '../hooks/use-balances';
import useSendPayment from '../hooks/use-send-payment';

const Page = () => {
  const [balances, setBalances] = useState<IBalance[]>([]);
  const [filterBalancesInZero, setFilterBalancesInZero] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isGettingTestBalances, setIsGettingTestBalances] = useState<boolean>(false);
  const [isTestnet] = useState<boolean>(process.env.NEXT_PUBLIC_HORIZON_NETWORK === 'testnet');
  const [isSendingPayment, setIsSendingPayment] = useState<boolean>(false);
  const [paymentAsset, setPaymentAsset] = useState<IAsset>({} as IAsset);
  const getTestFunds = useTestFunds();
  const getUserBalances = useBalances();
  const sendPayment = useSendPayment();

  const getTestBalances = () => {
    setIsGettingTestBalances(true);
    toast.loading('Getting test balances...');

    const publicKey = localStorage.getItem(AUTH.PUBLIC_KEY);

    getTestFunds({
      setIsGettingTestBalances,
      getBalances,
      publicKey: publicKey as string,
    });
  };

  const getBalances = () => {
    setIsLoading(true);
    toast.loading('Getting balances...');

    const publicKey = localStorage.getItem(AUTH.PUBLIC_KEY);

    getUserBalances({
      publicKey: publicKey as string,
      filterBalancesInZero,
      page,
      setBalances,
      setTotalPages,
      setIsLoading,
    });
  };

  const handlePayment = async (values: IPaymentPayload) => {
    setIsSendingPayment(true);
    toast.loading('Sending payment...');

    sendPayment({
      setIsSendingPayment,
      paymentPayload: values,
      getBalances,
      paymentAsset,
    });
  };

  useEffect(() => {
    getBalances();
  }, [filterBalancesInZero, page]);

  return (
    <div className={styles.container} data-cy='balances-section'>
      <Toaster position='top-right' />
      <h2 className={styles.title} data-cy='balances-title'>
        Balances
      </h2>
      <PaymentModal
        sendPayment={handlePayment}
        isSendingPayment={isSendingPayment}
        assetName={paymentAsset.code}
        assetIssuer={paymentAsset.issuer}
      />
      <span className='max-h-2'>
        {isLoading ? (
          <p>Loading your balances...</p>
        ) : (
          <>
            {balances.length > 0 ? (
              <div className='flex items-center justify-between bg-main-blue-200 p-2 rounded-lg border-main-blue-950 border-2 text-main-blue-950'>
                <input
                  id='filter-balances'
                  type='checkbox'
                  checked={filterBalancesInZero}
                  onChange={() => setFilterBalancesInZero(!filterBalancesInZero)}
                  data-cy='filter-balances'
                />
                <label htmlFor='filter-balances' className='p-2 text-sm bg-main'>
                  Filter balances in zero
                </label>
              </div>
            ) : (
              <div className={styles.noBalancesSection}>
                <p data-cy='no-balances-message'>You don&apos;t have any balance yet.</p>
                <GetTestBalances
                  getTestBalances={getTestBalances}
                  isLoading={isGettingTestBalances}
                  isTesnet={isTestnet}
                />
              </div>
            )}
          </>
        )}
      </span>
      <div className={styles.balancesContainer}>
        {balances.map((balance) =>
          isLoading ? (
            <LoadingBalance key={balance.asset} />
          ) : (
            <BalanceCard
              key={balance.asset}
              asset={{ code: balance.asset, issuer: balance.issuer } as IAsset}
              amount={balance.amount}
              issuer={balance.issuer}
              paymentAsset={paymentAsset}
              setPaymentAsset={setPaymentAsset}
            />
          ),
        )}
      </div>
      {balances.length > 0 && <Pagination page={page} setPage={setPage} totalPage={totalPages} />}
    </div>
  );
};

export default Page;
