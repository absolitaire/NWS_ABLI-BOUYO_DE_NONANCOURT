export declare class RichMessageEntity {
    content: string;
    date: number;
    login: String;
    picture: String;
    constructor(partial: Partial<RichMessageEntity>);
    fillData(content: string, date: number, login: string, picture: string): void;
}
