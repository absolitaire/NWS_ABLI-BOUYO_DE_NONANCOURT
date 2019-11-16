import { PersonAddressDto } from './person-address.dto';
export declare class UpdatePersonDto {
    firstname?: string;
    lastname?: string;
    entity?: string;
    email?: string;
    phone?: string;
    address?: PersonAddressDto;
    isManager?: boolean;
    manager?: string;
    managerId?: string;
}
