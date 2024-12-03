import React, { useState } from 'react';
import { AccountType } from '../types/account';

interface CreateAccountFormProps {
  onSubmit: (data: { solde: number; type: AccountType }) => void;
}

export const CreateAccountForm: React.FC<CreateAccountFormProps> = ({ onSubmit }) => {
  const [solde, setSolde] = useState('');
  const [type, setType] = useState<AccountType>(AccountType.COURANT);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      solde: parseFloat(solde),
      type,
    });
    setSolde('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Create New Account</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Initial Balance
          </label>
          <input
            type="number"
            value={solde}
            onChange={(e) => setSolde(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
            min="0"
            step="0.01"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Account Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as AccountType)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value={AccountType.COURANT}>Current Account</option>
            <option value={AccountType.EPARGNE}>Savings Account</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
      >
        Create Account
      </button>
    </form>
  );
};