export interface Expenditure {
  id?: string;
  name: string;
  category: ExpenditureCategory;
  price: number;
  uid: string;
  createDate: string;
  updateDate: string;
  expendDate: string;
}

export interface ExpenditureCategory {
  id?: string;
  name: string;
  isBanned: boolean;
  description: string;
}
