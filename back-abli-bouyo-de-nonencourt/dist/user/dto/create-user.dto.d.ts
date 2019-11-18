import { AddressDto } from './address.dto';
export declare class CreateUserDto {
    login: string;
    password: string;
    email: string;
    firstname: string;
    lastname: string;
    address: AddressDto;
    phone: string;
}
