import { Injectable } from '@angular/core';
import { AbstractDBAccessor } from '../models/classes/abstract-dbaccessor';
import { Map } from '../models/types/Map.type';

@Injectable({
  providedIn: 'root'
})
export class MapAccessorService extends AbstractDBAccessor<Map>{

  constructor() {
    super("map");
   }
}
