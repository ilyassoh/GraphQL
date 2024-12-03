import React from 'react';
import { Calendar, CreditCard, Trash2 } from 'lucide-react';
import { Account } from '../types/account';

interface AccountCardProps {
  account: Account;
  onDelete: (id: string) => void;
}

export const AccountCard: React.FC<AccountCardProps> = ({ account, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <CreditCard className="w-6 h-6 text-indigo-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800">
            Account {account.id}
          </h3>
        </div>
        <button
          onClick={() => onDelete(account.id)}
          className="text-red-500 hover:text-red-700 transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          <span className="text-sm">
            Created: {new Date(account.dateCreation).toLocaleDateString()}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-600">
            Type: {account.type.toLowerCase()}
          </span>
          <span className="text-lg font-bold text-indigo-600">
            €{account.solde.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};