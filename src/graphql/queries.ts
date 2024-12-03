import { gql } from '@apollo/client';

export const GET_ALL_ACCOUNTS = gql`
  query GetAllAccounts {
    allComptes {
      id
      solde
      dateCreation
      type
    }
  }
`;

export const GET_PAGINATED_ACCOUNTS = gql`
  query GetPaginatedAccounts($type: TypeCompte, $minSolde: Float, $first: Int!, $offset: Int!) {
    getallComptesPagination(type: $type, minSolde: $minSolde, first: $first, offset: $offset) {
      content {
        id
        solde
        dateCreation
        type
      }
      totalPages
      totalElements
      size
      number
    }
  }
`;

export const GET_TOTAL_STATS = gql`
  query GetTotalStats {
    totalSolde {
      count
      sum
      average
    }
  }
`;

export const GET_ACCOUNTS_BY_TYPE = gql`
  query GetAccountsByType($type: TypeCompte) {
    compteType(type: $type) {
      id
      solde
      dateCreation
      type
    }
  }
`;