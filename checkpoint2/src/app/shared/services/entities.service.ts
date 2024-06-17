import { Injectable, inject } from '@angular/core';
import { BoatAccessorService } from './boat-accessor.service';
import { BedAccessorService } from './bed-accessor.service';
import { HutAccessorService } from './hut-accessor.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Boat } from '../models/types/Boat.type';
import { CoOrdinate } from '../models/types/co-ordinate.type';

@Injectable({
  providedIn: 'root'
})
export class EntitiesService {

// type MapEntity = { Bed | Hut | Boat }

  private boatService = inject(BoatAccessorService);
  private bedService = inject(BedAccessorService);
  private hutService = inject(HutAccessorService);
  entityLocations: Map<CoOrdinate, any> = new Map<CoOrdinate, any>();
  hoverEntity$: BehaviorSubject<any> = new BehaviorSubject<any>({});
  allBoats$: Observable<Boat[]> = this.boatService.getAll$();

  constructor() { //refactor with pipes
    this.bedService.getAll$().subscribe(
      beds => {
        for (let bed of beds) {
          let coOrds: CoOrdinate = bed.location.split(",").map(Number);
          this.entityLocations.set(coOrds, bed);
        }
      }
    );
    this.hutService.getAll$().subscribe(
      huts => {
        for (let hut of huts) {
          let coOrds: CoOrdinate = hut.location.split(",").map(Number);
          this.entityLocations.set(coOrds, hut);
        }
      }
    );
  }

  setHoverEntity(coOrds: CoOrdinate) {
    this.hoverEntity$.next(this.entityLocations.get(coOrds));
  }

  getHoverEntity(): Observable<any> {
    return this.hoverEntity$;
  }

}
