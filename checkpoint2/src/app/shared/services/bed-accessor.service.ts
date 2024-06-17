import { Injectable } from '@angular/core';
import { Bed } from '../models/types/Bed.type';
import { AbstractDBAccessor } from '../models/classes/abstract-dbaccessor';

@Injectable({
  providedIn: 'root'
})
export class BedAccessorService extends AbstractDBAccessor<Bed>{

  constructor() {
    super("bed");
   }
}
