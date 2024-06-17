import { Injectable, inject } from '@angular/core';
import { BoatAccessorService } from './boat-accessor.service';
import { BedAccessorService } from './bed-accessor.service';
import { HutAccessorService } from './hut-accessor.service';
import { Observable } from 'rxjs';
import { Boat } from '../models/types/Boat.type';
import { Bed } from '../models/types/Bed.type';
import { Hut } from '../models/types/Hut.type';

@Injectable({
  providedIn: 'root'
})
export class EntitiesService {

  constructor() { }
  private boatService = inject(BoatAccessorService);
  private bedService = inject(BedAccessorService);
  private hutService = inject(HutAccessorService);

  allBoats$: Observable<Boat[]> = this.boatService.getAll$();
  allBeds$: Observable<Bed[]> = this.bedService.getAll$();
  allHuts$: Observable<Hut[]> = this.hutService.getAll$();

}
