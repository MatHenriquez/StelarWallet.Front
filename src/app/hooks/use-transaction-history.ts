import axiosInstance from '@/utils/axios-instance';
import { toast } from 'sonner';
import { API_ROUTES } from '../constants/routes/api-routes';
import { ITransactionResponse } from '../transactions/interfaces/transaction-response.interface';
import { ITransaction } from '../transactions/interfaces/transaction.interface';
import errorToast from './toasts/error-toast';

interface IUseTransactionHistoryProps {
  setTransactions: (transactions: ITransaction[]) => void;
  setTotalPages: (totalPages: number) => void;
  setIsLoading: (isLoading: boolean) => void;
  pageNumber: number;
}

const useTransactionHistory = () => {
  const getTransactionHistory = ({
    setTransactions,
    setTotalPages,
    setIsLoading,
    pageNumber,
  }: IUseTransactionHistoryProps) => {
    axiosInstance
      .get<ITransactionResponse>(
        `${API_ROUTES.TRANSACTION.PAYMENT}?pageNumber=${pageNumber}&pageSize=5`,
      )
      .then((response) => {
        setTransactions(response.data.value.payments);
        setTotalPages(response.data.value.totalPages);
      })
      .catch((error) => {
        console.error(error);
        errorToast(error, 'Failed to get transactions.');
      })
      .finally(() => {
        toast.dismiss();
        setIsLoading(false);
      });
  };

  return getTransactionHistory;
};

export default useTransactionHistory;
