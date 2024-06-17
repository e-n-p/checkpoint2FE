import { Injectable } from '@angular/core';
import { AbstractDBAccessor } from '../models/classes/abstract-dbaccessor';
import { Boat } from '../models/types/Boat.type';

@Injectable({
  providedIn: 'root'
})
export class BoatAccessorService extends AbstractDBAccessor<Boat>{

  constructor() {
    super("boat");
  }
}
