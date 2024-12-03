import { gql } from '@apollo/client';

export const CREATE_ACCOUNT = gql`
  mutation CreateAccount($compte: CompteRequest!) {
    createCompte(compte: $compte) {
      id
      solde
      dateCreation
      type
    }
  }
`;

export const DELETE_ACCOUNT = gql`
  mutation DeleteAccount($id: ID!) {
    deleteCompte(id: $id)
  }
`;