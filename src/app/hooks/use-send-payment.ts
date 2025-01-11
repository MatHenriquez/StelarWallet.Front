import axiosInstance from '@/utils/axios-instance';
import { toast } from 'sonner';
import { API_ROUTES } from '../constants/routes/api-routes';
import { IPaymentPayload } from '../dashboard/interfaces/payment-payload.interface';
import { IAsset } from '../auth/common/interfaces/asset.interface';
import successToast from './toasts/success-toast';
import errorToast from './toasts/error-toast';

interface IUseSendPaymentProps {
  setIsSendingPayment: (isSendingPayment: boolean) => void;
  paymentPayload: IPaymentPayload;
  paymentAsset: IAsset;
  getBalances: () => void;
}

const useSendPayment = () => {
  const sendPayment = ({
    setIsSendingPayment,
    paymentPayload: values,
    getBalances,
    paymentAsset,
  }: IUseSendPaymentProps) =>
    axiosInstance
      .post(API_ROUTES.TRANSACTION.PAYMENT, values)
      .then(() => {
        toast.dismiss();
        getBalances();
        successToast('Payment sent successfully');
      })
      .catch((error) => {
        toast.dismiss();
        errorToast(error, 'Error sending payment');
      })
      .finally(() => {
        setIsSendingPayment(false);
        const dialog = document?.getElementById(
          `payment-modal-${paymentAsset.code}`,
        ) as HTMLDialogElement | null;
        dialog?.close();
      });

  return sendPayment;
};

export default useSendPayment;
