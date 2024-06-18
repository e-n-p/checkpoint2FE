import { Bed } from "./Bed.type";
import { Boat } from "./Boat.type";
import { Hut } from "./Hut.type";

export type DisplayEntity = {
    display: Bed | Boat | Hut | Map<string, string>;
}
