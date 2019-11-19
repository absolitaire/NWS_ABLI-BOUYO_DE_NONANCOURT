import { PersonAddressEntity } from './person-address.entity';
export declare class PersonEntity {
    id: string;
    photo: string;
    firstname: string;
    lastname: string;
    entity: string;
    birthDate: number;
    email: string;
    phone: string;
    address: PersonAddressEntity;
    isManager: boolean;
    manager: string;
    managerId: string;
    constructor(partial: Partial<PersonEntity>);
}
