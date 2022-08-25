import { Restaurant } from "../index";

export interface User {
    id: string;
    username?: string;
    password?: string;
    email?: string;
    phone?: string;
    name?: string;
    language?: String;
    roles?: string[];
    restaurants?: Restaurant[];
    picByte?: any;
}