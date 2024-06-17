import { Boat } from "./Boat.type";

export type Hut = {
    name: string;
    price: number;
    location:string;
    boats: Boat[];
}