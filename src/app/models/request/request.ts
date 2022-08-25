import { Address } from "../address/Address";
import { Menu } from "../menu/menu";

export interface Request {
    idRequest?: number;
    amount: number;
    observation: string;
    menu: Menu;
    address: Address;
}