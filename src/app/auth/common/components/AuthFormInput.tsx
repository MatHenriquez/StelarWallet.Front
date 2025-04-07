
import React, { ChangeEvent, useState } from 'react';
import styles from '../styles/AuthFormInput.module.css';

type AuthFormInputProps = {
  handleChange: {
    (e: ChangeEvent<HTMLInputElement>): void;
    <T = string | ChangeEvent<unknown>>(
      field: T,
    ): T extends ChangeEvent<unknown> ? void : (e: string | ChangeEvent<unknown>) => void;
  };
  handleBlur: {
    (e: React.FocusEvent<HTMLInputElement>): void;
    <T = unknown>(fieldOrEvent: T): T extends string ? (e: unknown) => void : void;
  };
  value?: string;
  error: string | undefined;
  touched: boolean | undefined;
  type: string;
  name: string;
  icon?: React.ReactNode;
  label: string;
  placeholder?: string;
};

const AuthFormInput = ({
  handleChange,
  handleBlur,
  value,
  error,
  touched,
  type,
  name,
  icon,
  label,
  placeholder,
}: AuthFormInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    handleBlur(e);
    if (!value) {
      setIsFocused(false);
    }
  };

  const isActive = isFocused || !!value;

  return (
    <div className={styles.formField} data-cy={`${name}-field`}>
        <div className={styles.inputWrapper}>
          <input
            className={styles.input}
            type={type}
            name={name}
            id={name}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleInputBlur}
            value={value}
            placeholder={isActive ? placeholder : ''}
            data-cy={`${name}-input`}
          />
          <label
            htmlFor={name}
            className={`${styles.floatingLabel} ${isActive ? styles.active : ''}`}
            data-cy={`${name}-label`}
          >
            <div className='flex'>{icon}{label}</div>
          </label>
          {error && touched && (
            <div className={styles.errorMessage} data-cy={`${name}-error`}>
              {error}
            </div>
          )}
        </div>
    </div>
  );
};

export default AuthFormInput;