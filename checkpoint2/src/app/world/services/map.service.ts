import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private height: number = 100;
  private width: number = 100;
  constructor() { }

  private createMap(): number[][] {
    return Array(this.height).fill(false).map(() => new Array(this.width).fill(0));
  }

}
