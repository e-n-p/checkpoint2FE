import { Injectable } from '@angular/core';
import { AbstractDBAccessor } from '../models/classes/abstract-dbaccessor';
import { Hut } from '../models/types/Hut.type';

@Injectable({
  providedIn: 'root'
})
export class HutAccessorService extends AbstractDBAccessor<Hut>{

  constructor() {
    super("hut");
   }
}
