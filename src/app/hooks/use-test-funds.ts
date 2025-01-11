import axiosInstance from '@/utils/axios-instance';
import { toast } from 'sonner';
import { API_ROUTES } from '../constants/routes/api-routes';
import { IBalancesResponse } from '../dashboard/interfaces/balances-response.interface';
import errorToast from './toasts/error-toast';
import successToast from './toasts/success-toast';

interface IUseFetchProps {
  setIsGettingTestBalances: (isGettingTestBalances: boolean) => void;
  getBalances: () => void;
  publicKey: string;
}

const useTestFunds = () => {
  const getTestFunds = ({ setIsGettingTestBalances, getBalances, publicKey }: IUseFetchProps) =>
    axiosInstance
      .post<IBalancesResponse>(
        API_ROUTES.TRANSACTION.TEST_FUND,
        { PublicKey: publicKey },
        { headers: { 'Content-Type': 'application/json' } },
      )
      .then(() => {
        toast.dismiss();
        successToast('Test balances successfully added.');
        getBalances();
      })
      .catch((error) => {
        toast.dismiss();
        errorToast(error, 'Error adding test balances.');
      })
      .finally(() => {
        setIsGettingTestBalances(false);
      });

  return getTestFunds;
};

export default useTestFunds;
