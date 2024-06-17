import { Boat } from "./Boat.type";

export type Captain = {
    licence: string;
    name: string;
    experience: number;
    boat: Boat;
}