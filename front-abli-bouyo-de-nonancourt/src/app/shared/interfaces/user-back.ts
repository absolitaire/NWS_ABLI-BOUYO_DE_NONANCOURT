export interface UserBack{
  _id: string;
  login: string;
  password: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  address: Address;
  picture: string;
}

export interface Address {
  street: string;
  postalCode: string;
  city: string;
}
