export declare class RichMessageEntity {
    idMessage: string;
    content: string;
    date: number;
    login: String;
    picture: String;
    constructor(partial: Partial<RichMessageEntity>);
    fillData(id: string, content: string, date: number, login: string, picture: string): void;
}
