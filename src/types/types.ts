export type Bill = {
  invoiceID: string;
  DCNo: string;
  _id: string;
  ClientNo: number;
  ClientEmail: string;
  ClientName: string;
  CompanyName: string;
  CompanyTel: number;
  CompanyAddress: string;
  InvoiceDate: string;
  PoNumber: string;
  DCDate: string;
  products: {
    description: string;
    unit: number;
    unitPrice: number;
    total: number;
  }[];
  grandTotal: number;
};

export type Delivery = {
  DCNo: string;
  _id: string;
  ClientNo: number;
  ClientEmail: string;
  ClientName: string;
  CompanyName: string;
  CompanyTel: number;
  CompanyAddress: string;
  InvoiceDate: string;
  PoNumber: string;
  DCDate: string;
  products: {
    description: string;
  }[];
};

export type BillInputs = {
  SerialNo: number;
};

export type BillProducts = {
  description: string;
  unit: number;
  unitPrice: number;
  total: number;
};

export type DeliveryData = {
  _id: string;
  CompanyName: string;
  CompanyAddress: string;
  CompanyTel: number;
  ClientName: string;
  ClientEmail: string;
  ClientNo: number;
  DCDate: string;
  PoNumber: string;
  product: {
    description: string;
  };
};

export type DeliveryInputs = {
  CompanyName: string;
  CompanyTel: number;
  CompanyAddress: string;
  ClientNo: number;
  ClientEmail: string;
  ClientName: string;
  DCDate: string;
  PoNumber: string;
};

export type Company = {
  _id?: string;
  CompanyName?: string;
  CompanyTel?: number;
  CompanyAddress?: string;
  ClientNo?: number;
  ClientEmail?: string;
  ClientName?: string;
};

export type DeliveryProducts = {
  description: string;
};

export type UserInputs = {
  email: string;
  password: string;
  username: string;
};

export type SearchInput = {
  searchQuery: string;
};

export type SearchDelivery = {
  _id: string;
  DCNo: string;
  invoiceId: string;
  ClientNo: number;
  ClientEmail: string;
  ClientName: string;
  CompanyName: string;
  CompanyTel: number;
  CompanyAddress: string;
  InvoiceDate: string;
  PoNumber: string;
  DCDate: string;
  products: {
    description: string;
    unit: number;
    unitPrice: number;
    total: number;
  }[];
  grandTotal: number;
};

export type User = {
  _id: string;
  username: string;
  email: string;
};
