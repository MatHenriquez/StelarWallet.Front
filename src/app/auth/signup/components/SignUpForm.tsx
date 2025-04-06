'use client';
import React from 'react';
import { Formik } from 'formik';
import styles from '../styles/SignUpForm.module.css';
import AuthFormInput from '../../common/components/AuthFormInput';
import { NewUserSchema } from '../utils/NewUserSchema';
import { Toaster, toast } from 'sonner';
import { CreateUserRequest } from '../utils/create-user-request';
import { initialValues } from '../utils/constants';
import SubmitButton from '../../common/components/SubmitButton';
import SwapAuthLink from '../../common/components/SwapAuthLink';
import { CLIENT_ROUTES } from '@/app/constants/routes/front-routes';
import useSignup from '@/app/hooks/use-signup';
import { signupFormFields } from '../utils/signup-form-fields';
import OptionalKeysMessage from './OptionalKeysMessage';
import { IUser } from '@/models/user';

const SignUpForm = () => {
  const signUp = useSignup();
  const LOADING_DELAY = 500;

  const handleSubmit = (values: IUser, setSubmitting: (isSubmitting: boolean) => void) => {
    setSubmitting(true);
    toast.promise(
      new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, LOADING_DELAY);
      }),
      {
        loading: 'Creating account...',
      },
    );

    const requestValues: CreateUserRequest = {
      name: values.name,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
    };

    if (values.publicKey && values.secretKey) {
      requestValues.publicKey = values.publicKey;
      requestValues.secretKey = values.secretKey;
    }

    const requestPayload = new CreateUserRequest(requestValues);

    signUp({ userSignupRequest: requestPayload, setSubmitting });
  };

  return (
    <>
      <Toaster position='top-right' data-cy='toast' />
      <Formik
        initialValues={initialValues}
        validationSchema={NewUserSchema}
        onSubmit={(values, { setSubmitting }) => handleSubmit(values, setSubmitting)}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form className={styles.form} onSubmit={handleSubmit} data-cy='signup-form'>
            <p className={styles.signUptitle} data-cy='title'>
              Register
            </p>
            <SwapAuthLink
              name='login'
              link={CLIENT_ROUTES.AUTH.LOGIN}
              description='Already have an account?'
              text='Login'
            />

            {signupFormFields.slice(0, 5).map(({ name, type, label, icon }) => (
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

            <OptionalKeysMessage />

            {signupFormFields.slice(5).map(({ name, type, label, icon }) => (
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

export default SignUpForm;
