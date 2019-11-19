export declare class MessageEntity {
    _id: string;
    content: string;
    idUser: String;
    date: number;
    constructor(partial: Partial<MessageEntity>);
    fillData(id: string, content: string, idUser: string, date: number): void;
}
