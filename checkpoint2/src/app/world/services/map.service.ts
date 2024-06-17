import { Injectable, OnDestroy, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MapAccessorService } from '../../shared/services/map-accessor.service';
import { Map } from '../../shared/models/types/Map.type';
import { EntitiesService } from '../../shared/services/entities.service';

@Injectable({
  providedIn: 'root'
})
export class MapService implements OnDestroy {

  private mapService = inject(MapAccessorService);
  private entityService = inject(EntitiesService);

  private height!: number;
  private width!: number;
  private worldMap!: string[][];
  private worldView$: BehaviorSubject<string[][]> = new BehaviorSubject<string[][]>([]);
  private mapName$: BehaviorSubject<string> = new BehaviorSubject<string>("");

  constructor() {
    this.readMapFile$().subscribe(
      mapObj => {
        this.height = mapObj.height;
        this.width = mapObj.width;
        this.mapName$.next(mapObj.name);
        this.worldMap = this.createMap();
        this.drawMap(mapObj.map);
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

  private populateMap(): void {
    for (let [k, v] of this.entityService.entityLocations) {
      let representation: string = '';
      if (v.hasOwnProperty('age')) {
        representation = '~';
      } else if (v.hasOwnProperty('price')) {
        representation = 'H';
      }
      this.worldMap[k[0]][k[1]] = representation;
    }
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
