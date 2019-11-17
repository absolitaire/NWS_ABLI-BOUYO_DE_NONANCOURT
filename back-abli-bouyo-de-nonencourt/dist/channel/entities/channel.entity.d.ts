import { UserDto } from '../dto/user.dto';
export declare class ChannelEntity {
    _id: string;
    idChannel: string;
    name: string;
    description: string;
    usersSubscribed: UserDto[];
    constructor(partial: Partial<ChannelEntity>);
}
