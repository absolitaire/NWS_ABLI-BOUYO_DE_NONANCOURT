export interface User {
  id?: string;
  login: string;
  photo?: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  address: Address;
}

export interface Address {
  street: string;
  postalCode: string;
  city: string;
}
