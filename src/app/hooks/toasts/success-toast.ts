import { toast } from 'sonner';

const successToast = (defaultMessage: string) =>
  toast.success(defaultMessage, {
    style: {
      background: 'green',
      color: 'white',
    },
  });

export default successToast;
