import { Component, inject } from '@angular/core';
import { EntitiesService } from '../../../../shared/services/entities.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrl: './controls.component.css'
})
export class ControlsComponent {

  private entityService = inject(EntitiesService);

  captains$ = this.entityService.captains$;
  boats$ = this.entityService.boats$;


}
