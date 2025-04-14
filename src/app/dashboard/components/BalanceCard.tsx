import React, { useEffect, useState } from 'react';
import { IBalanceCardProps } from '../interfaces/balances-response.interface';
import styles from '../styles/BalanceCard.module.css';
import SendIcon from './SendIcon';

const BalanceCard = ({
  asset,
  amount,
  paymentAsset,
  setPaymentAsset,
  issuer,
}: IBalanceCardProps) => {
  const [shouldOpenModal, setShouldOpenModal] = useState(false);

  useEffect(() => {
    if (shouldOpenModal) {
      const dialog = document?.getElementById(
        `payment-modal-${paymentAsset.code}`,
      ) as HTMLDialogElement | null;
      dialog?.showModal();
      setShouldOpenModal(false);
    }
  }, [paymentAsset, shouldOpenModal]);

  const handleSendClick = () => {
    setPaymentAsset(asset);
    setShouldOpenModal(true);
  };

  const amountEmoji = parseFloat(amount) > 0 ? '🤑' : '😥';

  const formattedAmount = parseFloat(amount).toFixed(2);
  const formattedIssuer = issuer.substring(0, 4) + '...' + issuer.substring(issuer.length - 6, issuer.length);

  return (
    <div className={styles.container} data-cy={`balance-card-${asset.code?.toLowerCase()}`}>
      <div className={styles.cardBody}>
        <p className={styles.asset}>{asset.code == 'native' ? 'XLM' : asset.code}</p>
        <p className={styles.amount}>{formattedAmount + amountEmoji}</p>
         <span className={styles.issuer}>{asset.code == 'native' ? asset.code :formattedIssuer}</span>
        <div className={styles.cardAction}>
          <button className={styles.cardButton} onClick={handleSendClick} data-cy={`${asset.code?.toLowerCase()}-send-payment-button`}>
           <SendIcon /> Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
