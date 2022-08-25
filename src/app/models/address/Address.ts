import { User } from "../user/user";

export interface Address {
	id: number;
    street: string;
    district: string;
    number: number;
	complement: string;
	user: User;
    isDefault: boolean;
}