import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Wallet } from 'lucide-react';
import toast from 'react-hot-toast';
import { AccountCard } from './components/AccountCard';
import { StatsCard } from './components/StatsCard';
import { CreateAccountForm } from './components/CreateAccountForm';
import { Pagination } from './components/Pagination';
import { AccountFilters } from './components/AccountFilters';
import { Account, AccountType } from './types/account';
import { GET_PAGINATED_ACCOUNTS, GET_TOTAL_STATS } from './graphql/queries';
import { CREATE_ACCOUNT, DELETE_ACCOUNT } from './graphql/mutations';

function App() {
  const [page, setPage] = useState(0);
  const [type, setType] = useState<AccountType | null>(null);
  const [minSolde, setMinSolde] = useState('');
  const pageSize = 6;

  const { data: accountsData, loading: accountsLoading } = useQuery(GET_PAGINATED_ACCOUNTS, {
    variables: {
      first: page,
      offset: pageSize,
      type: type,
      minSolde: minSolde ? parseFloat(minSolde) : null,
    },
  });

  const { data: statsData, loading: statsLoading } = useQuery(GET_TOTAL_STATS);

  const [createAccount] = useMutation(CREATE_ACCOUNT, {
    refetchQueries: [GET_PAGINATED_ACCOUNTS, GET_TOTAL_STATS],
    onError: (error) => {
      toast.error(`Failed to create account: ${error.message}`);
    }
  });

  const [deleteAccount] = useMutation(DELETE_ACCOUNT, {
    refetchQueries: [GET_PAGINATED_ACCOUNTS, GET_TOTAL_STATS],
    onError: (error) => {
      toast.error(`Failed to delete account: ${error.message}`);
    }
  });

  const handleCreateAccount = async (data: { solde: number; type: AccountType }) => {
    try {
      await createAccount({
        variables: {
          compte: {
            solde: data.solde,
            type: data.type,
            dateCreation: new Date().toISOString().split('T')[0] // Format as YYYY-MM-DD
          }
        }
      });
      toast.success('Account created successfully');
    } catch (error) {
      console.error('Error creating account:', error);
    }
  };

  const handleDeleteAccount = async (id: string) => {
    try {
      await deleteAccount({
        variables: { id }
      });
      toast.success('Account deleted successfully');
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (accountsLoading || statsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <Wallet className="w-8 h-8 text-indigo-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">Bank Account Manager</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {statsData?.totalSolde && <StatsCard stats={statsData.totalSolde} />}
        <CreateAccountForm onSubmit={handleCreateAccount} />
        
        <AccountFilters
          type={type}
          minSolde={minSolde}
          onTypeChange={setType}
          onMinSoldeChange={setMinSolde}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accountsData?.getallComptesPagination.content.map((account: Account) => (
            <AccountCard
              key={account.id}
              account={account}
              onDelete={handleDeleteAccount}
            />
          ))}
        </div>

        {accountsData?.getallComptesPagination.totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={accountsData.getallComptesPagination.totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </main>
    </div>
  );
}

export default App;