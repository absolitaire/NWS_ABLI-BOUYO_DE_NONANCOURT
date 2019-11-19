import { AddressEntity } from './address.entity';
export declare class UserEntity {
    _id: string;
    login: string;
    password: string;
    email: string;
    firstname: string;
    lastname: string;
    address: AddressEntity;
    phone: string;
    picture: string;
    constructor(partial: Partial<UserEntity>);
}
