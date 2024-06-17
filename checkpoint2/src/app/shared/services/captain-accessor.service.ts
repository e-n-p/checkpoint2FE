import { Injectable } from '@angular/core';
import { AbstractDBAccessor } from '../models/classes/abstract-dbaccessor';
import { Captain } from '../models/types/Captain.type';

@Injectable({
  providedIn: 'root'
})
export class CaptainAccessorService extends AbstractDBAccessor<Captain>{

  constructor() {
    super("captain");
  }
}
