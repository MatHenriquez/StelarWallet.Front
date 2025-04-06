'use client';

import { Formik } from 'formik';
import React from 'react';
import { toast, Toaster } from 'sonner';
import { LoginInitialValues, LoginRequest } from '../utils/constants';
import { LoginUserSchema } from '../utils/login-user-schema';
import styles from '../styles/LoginForm.module.css';
import AuthFormInput from '../../common/components/AuthFormInput';
import SubmitButton from '../../common/components/SubmitButton';
import SwapAuthLink from '../../common/components/SwapAuthLink';
import useLogin from '@/app/hooks/use-login';
import { loginFormFields } from '../utils/form-fields';

const LoginForm = () => {
  const login = useLogin();

  return (
    <>
      <Toaster position='top-right' />

      <Formik
        initialValues={LoginInitialValues}
        validationSchema={LoginUserSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);

          toast.promise(
            new Promise<void>((resolve) => {
              setTimeout(() => {
                resolve();
              }, 500);
            }),
            {
              loading: 'Logging in...',
            },
          );

          const loginRequest = new LoginRequest(values.email, values.password);

          login({ loginRequest, setSubmitting });
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form className={styles.form} onSubmit={handleSubmit} data-cy='login-form'>
            <p className={styles.signInTitle} data-cy='title'>
              Login
            </p>
            <SwapAuthLink
              name='signup'
              link='/auth/signup'
              description='Don’t have an account?'
              text='Sign up'
            />

            {loginFormFields.map(({ name, type, label, icon }) => (
              <AuthFormInput
                key={name}
                type={type}
                name={name}
                handleChange={handleChange}
                handleBlur={handleBlur}
                error={errors[name as keyof typeof errors]}
                value={values[name as keyof typeof values]}
                touched={touched[name as keyof typeof touched]}
                label={label}
                icon={icon}
              />
            ))}

            <SubmitButton isSubmitting={isSubmitting} />
          </form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
