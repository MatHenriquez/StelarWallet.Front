import { EmailIcon } from '../../common/components/icons/email';
import { KeyIcon } from '../../common/components/icons/key';
import { NameIcon } from '../../common/components/icons/names';

export const signupFormFields = [
  {
    name: 'name',
    type: 'text',
    label: 'Name',
    icon: NameIcon,
  },
  {
    name: 'lastName',
    type: 'text',
    label: 'Surname',
    icon: NameIcon,
  },
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    icon: EmailIcon,
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password',
    icon: KeyIcon,
  },
  {
    name: 'confirmPassword',
    type: 'password',
    label: 'Confirm Password',
    icon: KeyIcon,
  },
  {
    name: 'publicKey',
    type: 'text',
    label: 'Public Key',
    icon: KeyIcon,
  },
  {
    name: 'secretKey',
    type: 'password',
    label: 'Secret Key',
    icon: KeyIcon,
  },
];
