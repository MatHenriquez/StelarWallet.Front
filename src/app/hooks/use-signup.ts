import { useRouter } from 'next/navigation';
import { CreateUserRequest } from '../auth/signup/utils/create-user-request';
import axiosInstance from '@/utils/axios-instance';
import { API_ROUTES } from '../constants/routes/api-routes';
import successToast from './toasts/success-toast';
import errorToast from './toasts/error-toast';
import { CLIENT_ROUTES } from '../constants/routes/front-routes';

interface IUseSignUpProps {
  userSignupRequest: CreateUserRequest;
  setSubmitting: (isSubmitting: boolean) => void;
}

const useSignup = () => {
  const router = useRouter();
  const TOAST_MESSAGES = {
    SUCCESS: 'Account created successfully!',
    ERROR: 'Error creating account.',
  };
  const DELAY = 1500;

  const signup = ({ userSignupRequest: signupRequest, setSubmitting }: IUseSignUpProps) => {
    axiosInstance
      .post(API_ROUTES.USER, signupRequest)
      .then(() => {
        successToast(TOAST_MESSAGES.SUCCESS);
      })
      .catch((error) => {
        console.error(error);
        errorToast(error, TOAST_MESSAGES.ERROR);
        setTimeout(() => {
          router.push(CLIENT_ROUTES.AUTH.LOGIN);
        }, DELAY);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return signup;
};

export default useSignup;
