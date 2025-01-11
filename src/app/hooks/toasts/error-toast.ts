import { AxiosError } from 'axios';
import { toast } from 'sonner';

const errorToast = (error: AxiosError, defaultMessage: string) =>
  toast.error(
    (error?.response?.data as { error: { message: string } })?.error?.message ?? defaultMessage,
    {
      style: {
        background: 'red',
        color: 'white',
      },
    },
  );

export default errorToast;
