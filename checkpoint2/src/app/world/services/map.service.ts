import { Injectable, OnDestroy, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MapAccessorService } from '../../shared/services/map-accessor.service';
import { Map } from '../../shared/models/types/Map.type';
import { EntitiesService } from '../../shared/services/entities.service';

@Injectable({
  providedIn: 'root'
})
export class MapService implements OnDestroy{
  
  private mapService = inject(MapAccessorService);
  private entityService = inject(EntitiesService);

  private height!: number;
  private width!: number;
  private worldMap!: string[][]; //make an extra dimension to store objects to pass to hover?
  private worldView$: BehaviorSubject<string[][]> = new BehaviorSubject<string[][]>([]);
  private mapName$: BehaviorSubject<string> = new BehaviorSubject<string>("");

  constructor() {
    this.readMapFile$().subscribe(
      mapObj => {
        this.height = mapObj.height;
        this.width = mapObj.width;
        this.mapName$.next(mapObj.name);
        this.worldMap = this.createMap();
        let map = mapObj.map;
        this.drawMap(map);
        this.populateMap();
        this.updateMapView(this.worldMap);
      }
    );
  }

  private createMap(): string[][] {
    return Array(this.height).fill(false).map(() => new Array(this.width).fill(""));
  }

  private readMapFile$(): Observable<Map> {
    return this.mapService.getById$(1);
  }

  private drawMap(map: string): void {
    let mapCounter: number = 0;
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        this.worldMap[i][j] = map[mapCounter++];
      }
    }
  }

  private populateMap(): void{
    this.entityService.allBeds$.subscribe(
      beds => {
        for (let bed of beds){
          let coOrds = bed.location.split(",");
          this.worldMap[Number(coOrds[0])][Number(coOrds[1])] = "~"
        }
      }
    );
    this.entityService.allHuts$.subscribe(
      huts => {
        for(let hut of huts){
          let coOrds = hut.location.split(",");
          this.worldMap[Number(coOrds[0])][Number(coOrds[1])] = "H"
        }
      }
    );
  }

  private updateMapView(newMap: string[][]): void {
    this.worldView$.next(newMap);
  }

  public getWorldMap$(): Observable<string[][]> {
    return this.worldView$;
  }

  public getMapName(): Observable<string> {
    return this.mapName$;
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

}
