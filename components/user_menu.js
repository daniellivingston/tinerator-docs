import React, { useState } from 'react';
import { logout } from '../utils/auth';

function UserMenu({ viewer }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button className="mx-4" onClick={toggleMenu}>
        <img
          src={viewer.avatarUrl}
          className="w-8 h-8 rounded-full shadow-md"
        />
      </button>
      <div
        className={`mt-2 mr-4 py-2 bg-white absolute right-0 w-32 rounded-lg shadow-menu ${
          isOpen ? '' : 'hidden'
        }`}
      >
        <ul className="text-gray-700">
          <li key="logout">
            <button
              className="px-4 py-2 w-full hover:bg-gray-100 text-left font-semibold"
              onClick={logout}
            >
              Log out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default UserMenu;
