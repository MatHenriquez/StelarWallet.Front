import { EmailIcon } from '../../common/components/icons/email';
import { KeyIcon } from '../../common/components/icons/key';

const EMAIL = 'Email';
const PASSWORD = 'Password';

export const loginFormFields = [
  {
    name: 'email',
    type: EMAIL.toLowerCase(),
    label: EMAIL,
    icon: EmailIcon,
  },
  {
    name: PASSWORD.toLocaleLowerCase(),
    type: PASSWORD.toLocaleLowerCase(),
    label: PASSWORD,
    icon: KeyIcon,
  },
];
