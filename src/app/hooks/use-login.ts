import axiosInstance from '@/utils/axios-instance';
import { ILoginResponse, LoginRequest } from '../auth/login/utils/constants';
import { useRouter } from 'next/navigation';
import { API_ROUTES } from '../constants/routes/api-routes';
import { AUTH } from '../constants/auth/auth';
import { CLIENT_ROUTES } from '../constants/routes/front-routes';
import errorToast from './toasts/error-toast';
import successToast from './toasts/success-toast';

interface IUseLoginProps {
  loginRequest: LoginRequest;
  setSubmitting: (isSubmitting: boolean) => void;
}

const useLogin = () => {
  const router = useRouter();
  const TOAST_MESSAGES = {
    SUCCESS: 'Logged in successfully.',
    ERROR: 'Failed to log in.',
  };

  const login = ({ loginRequest, setSubmitting }: IUseLoginProps) => {
    axiosInstance
      .post<ILoginResponse>(API_ROUTES.AUTH.LOGIN, loginRequest)
      .then((response) => {
        successToast(TOAST_MESSAGES.SUCCESS);

        const responsePayload: ILoginResponse = response.data;

        localStorage.setItem(AUTH.ACCESS_TOKEN, responsePayload?.value?.token ?? '');
        localStorage.setItem(AUTH.PUBLIC_KEY, responsePayload?.value?.publicKey ?? '');

        router.push(CLIENT_ROUTES.DASHBOARD);
      })
      .catch((error) => {
        console.error(error);
        errorToast(error, TOAST_MESSAGES.ERROR);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return login;
};

export default useLogin;
