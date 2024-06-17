import { Component, inject } from '@angular/core';
import { MapService } from '../../../services/map.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {

  private mapService = inject(MapService);
  mapName$: Observable<string> = this.mapService.getMapName();
  mapRepresentation$: Observable<string[][]> = this.mapService.getWorldMap$();

  //mouse over events
}
