import React from 'react';
import { BarChart3, Calculator, CreditCard } from 'lucide-react';
import { SoldeStats } from '../types/account';

interface StatsCardProps {
  stats: SoldeStats;
}

export const StatsCard: React.FC<StatsCardProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Accounts</p>
            <p className="text-2xl font-bold text-gray-900">{stats.count}</p>
          </div>
          <CreditCard className="w-8 h-8 text-indigo-600" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Balance</p>
            <p className="text-2xl font-bold text-gray-900">
              €{stats.sum.toLocaleString()}
            </p>
          </div>
          <BarChart3 className="w-8 h-8 text-indigo-600" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Average Balance</p>
            <p className="text-2xl font-bold text-gray-900">
              €{stats.average.toLocaleString()}
            </p>
          </div>
          <Calculator className="w-8 h-8 text-indigo-600" />
        </div>
      </div>
    </div>
  );
};