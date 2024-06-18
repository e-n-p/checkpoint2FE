import { Injectable, inject } from '@angular/core';
import { BoatAccessorService } from './boat-accessor.service';
import { BedAccessorService } from './bed-accessor.service';
import { HutAccessorService } from './hut-accessor.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Boat } from '../models/types/Boat.type';
import { CoOrdinate } from '../models/types/co-ordinate.type';
import { Bed } from '../models/types/Bed.type';
import { Hut } from '../models/types/Hut.type';
import { DisplayEntity } from '../models/types/DisplayEntity.type';



@Injectable({
  providedIn: 'root'
})
export class EntitiesService {

  key: Map<string, string> = new Map<string, string>([
    ["+", "Land"],
    [".", "Sea"],
    ["+", "Mountain"],
    ["#", "Forest"],
  ]);

  // private boatService = inject(BoatAccessorService);
  private bedService = inject(BedAccessorService);
  private hutService = inject(HutAccessorService);
  entityLocations: Map<string, any> = new Map<string, any>();
  hoverEntity$: BehaviorSubject<DisplayEntity> = new BehaviorSubject<DisplayEntity>({display: this.key});
  // allBoats$: Observable<Boat[]> = this.boatService.getAll$();

  constructor() { //refactor with pipes // unsubscribing
    this.bedService.getAll$().subscribe(
      beds => {
        for (let bed of beds) {
          this.entityLocations.set(bed.location, bed);
        }
      }
    );
    this.hutService.getAll$().subscribe(
      huts => {
        for (let hut of huts) {
          this.entityLocations.set(hut.location, hut);
        }
      }
    );
  }

  setHoverEntity(coOrds: string): void {
    let newEnt = this.entityLocations.get(coOrds);
    if (newEnt === undefined){
      this.hoverEntity$.next({display: this.key});
    } else {
      this.hoverEntity$.next({display: newEnt});
    }
  }

  getHoverEntity$(): Observable<any> {
    return this.hoverEntity$;
  }

}
