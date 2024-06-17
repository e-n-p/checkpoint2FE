import { Component, inject } from '@angular/core';
import { MapService } from '../../../services/map.service';
import { Observable } from 'rxjs';
import { EntitiesService } from '../../../../shared/services/entities.service';
import { CoOrdinate } from '../../../../shared/models/types/co-ordinate.type';

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

  hover(i: number, j: number){
    let coOrds: CoOrdinate = [i,j];
    this.entityService.setHoverEntity(coOrds);
  }
}
