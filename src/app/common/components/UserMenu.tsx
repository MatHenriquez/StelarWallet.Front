import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

type UserMenuProps = {
  handleLogout: VoidFunction;
};

const UserMenu: React.FC<UserMenuProps> = ({ handleLogout }) => (
  <div className='dropdown dropdown-end'>
    <div
      tabIndex={0}
      role='button'
      className='avatar btn btn-circle btn-ghost hover:bg-main-blue-400'
      data-cy='avatar-button'
    >
      <div className='flex w-10 place-content-center rounded-full border-2 border-main-blue-900'>
        <FontAwesomeIcon className='' icon={faUser} />
      </div>
    </div>
    <ul className='menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 bg-main-blue-200 shadow'>
      <li>
        <a href='/settings' className='hover:bg-main-blue-500'>
          Settings
        </a>
      </li>
      <li>
        <button className='hover:bg-main-blue-500' onClick={handleLogout} data-cy='logout-button'>
          Logout
        </button>
      </li>
    </ul>
  </div>
);

export default UserMenu;
