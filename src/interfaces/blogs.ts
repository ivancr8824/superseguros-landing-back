import { STATUS_RECORD } from "../enums";

export interface Blog {
    id: number;
    title: string;
    description: string;
    content: string;
    imageUrl1: string;
    imageUrl2: string;
    status: STATUS_RECORD;
}