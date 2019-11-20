export declare class RichMessageEntity {
    idMessage: string;
    idUser: string;
    content: string;
    date: number;
    login: String;
    picture: String;
    constructor(partial: Partial<RichMessageEntity>);
    fillData(id: string, idUser: string, content: string, date: number, login: string, picture: string): void;
}
