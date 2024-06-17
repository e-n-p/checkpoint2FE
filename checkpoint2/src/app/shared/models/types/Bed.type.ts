import { Boat } from "./Boat.type";

export type Bed = {
    location: string;
    age: number;
    basketCount: number;
    boats: Boat[];
}