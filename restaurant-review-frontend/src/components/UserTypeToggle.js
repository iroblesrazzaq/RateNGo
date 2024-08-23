import React from 'react';
import { UserIcon, Store } from 'lucide-react';

const UserTypeToggle = ({ userType, setUserType }) => {
  return (
    <div className="flex justify-center space-x-4 mb-6">
      <button
        onClick={() => setUserType('customer')}
        className={`flex items-center px-4 py-2 rounded-lg ${
          userType === 'customer'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-700'
        }`}
      >
        <UserIcon className="w-5 h-5 mr-2" />
        Customer
      </button>
      <button
        onClick={() => setUserType('restaurant')}
        className={`flex items-center px-4 py-2 rounded-lg ${
          userType === 'restaurant'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-700'
        }`}
      >
        <Store className="w-5 h-5 mr-2" />
        Restaurant
      </button>
    </div>
  );
};

export default UserTypeToggle;