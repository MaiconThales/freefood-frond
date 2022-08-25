import { User } from "../user/user";

export interface Restaurant {
    id?: number;
    name: string;
    address?: string;
    users?: User[];
}