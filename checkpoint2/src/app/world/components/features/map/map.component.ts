import { Component, inject } from '@angular/core';
import { MapService } from '../../../services/map.service';
import { Observable } from 'rxjs';
import { EntitiesService } from '../../../../shared/services/entities.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {

  private mapService = inject(MapService);
  private entityService = inject(EntitiesService);
  mapName$: Observable<string> = this.mapService.getMapName();
  mapRepresentation$: Observable<string[][]> = this.mapService.getWorldMap$();

  hover(i: number, j: number) {
    let coOrds: string = i + "," + j;
    this.entityService.setHoverEntity(coOrds);
  }

  colorPicker(char: string): string {
    let def = "tile";
    switch (char) {
      case '+':
        return def + ' land';
      case '.':
        return def + ' sea';
      case '^':
        return def + ' mountain';
      case '#':
        return def + ' forest';
      case '~':
        return def + ' bed';
      case 'C':
        return def + ' city';
      case 'H':
        return def + ' hut';
    }
    return def;
  }
}
