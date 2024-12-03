export enum AccountType {
  COURANT = 'COURANT',
  EPARGNE = 'EPARGNE'
}

export interface Account {
  id: string;
  solde: number;
  dateCreation: string;
  type: AccountType;
}

export interface AccountPage {
  content: Account[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

export interface SoldeStats {
  count: number;
  sum: number;
  average: number;
}