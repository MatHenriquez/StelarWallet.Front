import React from 'react';
import styles from '../styles/SignUpForm.module.css';

const OptionsKeysMessage = () => (
  <p className={styles.optionalTitle} data-cy='optional-title'>
    *Optional{' '}
    <span className={styles.optionalSubtitle}>
      (if you don&apos;t have Stellar keys, we will create them for you!)
    </span>
  </p>
);

export default OptionsKeysMessage;
