export declare class ChannelEntity {
    _id: string;
    idChannel: string;
    name: string;
    description: string;
    usersSubscribed: String[];
    constructor(partial: Partial<ChannelEntity>);
}
