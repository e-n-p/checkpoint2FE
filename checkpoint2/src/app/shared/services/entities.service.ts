import { Injectable, OnDestroy, inject } from '@angular/core';
import { BoatAccessorService } from './boat-accessor.service';
import { BedAccessorService } from './bed-accessor.service';
import { HutAccessorService } from './hut-accessor.service';
import { BehaviorSubject, Observable, Subscription, forkJoin, tap } from 'rxjs';
import { DisplayEntity } from '../models/types/DisplayEntity.type';
import { Captain } from '../models/types/Captain.type';
import { Boat } from '../models/types/Boat.type';
import { CaptainAccessorService } from './captain-accessor.service';

@Injectable({
  providedIn: 'root'
})
export class EntitiesService implements OnDestroy{

  key: DisplayEntity = {
    "+": "Land",
    ".": "Sea",
    "^": "Mountain",
    "#": "Forest",
    "C": "City",
  }
  ignoreElements: string[] = ['id', 'location'];

  private boatService = inject(BoatAccessorService);
  private captainService = inject(CaptainAccessorService);
  private bedService = inject(BedAccessorService);
  private hutService = inject(HutAccessorService);
  entityLocations: Map<string, any> = new Map<string, any>();
  hoverEntity$: BehaviorSubject<DisplayEntity> = new BehaviorSubject<DisplayEntity>({});
  captains$: BehaviorSubject<Captain[]> = new BehaviorSubject<Captain[]>([]);
  boats$: BehaviorSubject<Boat[]> = new BehaviorSubject<Boat[]>([]);
  sub!:Subscription;


  constructor() {
    this.sub = forkJoin({
      beds: this.bedService.getAll$(),
      huts: this.hutService.getAll$(),
      captains: this.captainService.getAll$(),
      boats: this.boatService.getAll$()
    }).pipe(
      tap(({ beds, huts, captains, boats }) => {
        for (let bed of beds) {
          this.entityLocations.set(bed.location, bed);
        }
        for (let hut of huts) {
          this.entityLocations.set(hut.location, hut);
        }
        console.log(captains);
        
        this.captains$.next(captains);
        this.boats$.next(boats);
      })
    ).subscribe();
  }

  setHoverEntity(coOrds: string): void {
    let newEnt = this.entityLocations.get(coOrds);
    if (newEnt === undefined) {
      this.hoverEntity$.next(this.key);
    } else {
      let displayObj: DisplayEntity = {};
      Object.entries(newEnt).map(([key, value]) => {
        key = String(key);
        if (!this.ignoreElements.includes(key)) {
          displayObj[key] = String(value)
        }
      })
      this.hoverEntity$.next(displayObj);
    }
  }

  getHoverEntity$(): Observable<any> {
    return this.hoverEntity$;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
