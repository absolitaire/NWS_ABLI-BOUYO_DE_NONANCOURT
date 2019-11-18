import { AddressDto } from './address.dto';
export declare class UpdateUserDto {
    login: string;
    password: string;
    email: string;
    firstname: string;
    lastname: string;
    address: AddressDto;
    phone: string;
    picture: string;
}
