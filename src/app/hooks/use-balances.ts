import axiosInstance from '@/utils/axios-instance';
import { API_ROUTES } from '../constants/routes/api-routes';
import { IBalance, IBalancesResponse } from '../dashboard/interfaces/balances-response.interface';
import errorToast from './toasts/error-toast';
import { toast } from 'sonner';

interface IUseBalancesProps {
  publicKey: string;
  filterBalancesInZero: boolean;
  page: number;
  setBalances: (balances: IBalance[]) => void;
  setTotalPages: (totalPages: number) => void;
  setIsLoading: (isLoading: boolean) => void;
}

const useBalances = () => {
  const FIXED_PAGE_SIZE = 4;

  const getBalances = ({
    publicKey,
    filterBalancesInZero,
    page,
    setBalances,
    setTotalPages,
    setIsLoading,
  }: IUseBalancesProps) =>
    axiosInstance
      .get<IBalancesResponse>(
        `${API_ROUTES.TRANSACTION.BALANCE}?PublicKey=${publicKey}&FilterZeroBalances=${filterBalancesInZero}&PageNumber=${page}&PageSize=${FIXED_PAGE_SIZE}`,
      )
      .then((response) => {
        toast.dismiss();
        setBalances(response.data.value?.balances ?? []);
        setTotalPages(response.data.value?.totalPages ?? 1);
      })
      .catch((error) => {
        toast.dismiss();
        console.error(error);
        errorToast(error, 'An error occurred while fetching your balances.');
      })
      .finally(() => {
        setIsLoading(false);
      });

  return getBalances;
};

export default useBalances;
