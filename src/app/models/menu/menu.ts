import { Restaurant } from "../restaurant/restaurant";

export interface Menu {
    idMenu?: number;
    restaurant: Restaurant;
    name: string;
    description?: string;
    picByte?: any;
}