import React from 'react';
import { AccountType } from '../types/account';

interface AccountFiltersProps {
  type: AccountType | null;
  minSolde: string;
  onTypeChange: (type: AccountType | null) => void;
  onMinSoldeChange: (value: string) => void;
}

export const AccountFilters: React.FC<AccountFiltersProps> = ({
  type,
  minSolde,
  onTypeChange,
  onMinSoldeChange,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Filters</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Account Type
          </label>
          <select
            value={type || ''}
            onChange={(e) => onTypeChange(e.target.value ? e.target.value as AccountType : null)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Types</option>
            <option value={AccountType.COURANT}>Current Account</option>
            <option value={AccountType.EPARGNE}>Savings Account</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Minimum Balance
          </label>
          <input
            type="number"
            value={minSolde}
            onChange={(e) => onMinSoldeChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter minimum balance"
            min="0"
            step="0.01"
          />
        </div>
      </div>
    </div>
  );
};