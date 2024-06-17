import { Bed } from "./Bed.type";
import { Captain } from "./Captain.type";
import { Hut } from "./Hut.type";

export type Boat = {
    name: string;
    model: string;
    capacity: number;
    speed: number;
    captain: Captain;
    hut: Hut;
    beds: Bed[];
}