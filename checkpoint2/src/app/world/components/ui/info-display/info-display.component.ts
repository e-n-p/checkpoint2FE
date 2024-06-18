import { Component, inject } from '@angular/core';
import { EntitiesService } from '../../../../shared/services/entities.service';
import { DisplayEntity } from '../../../../shared/models/types/DisplayEntity.type';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-info-display',
  templateUrl: './info-display.component.html',
  styleUrl: './info-display.component.css'
})
export class InfoDisplayComponent {
  private service = inject(EntitiesService);

  tileInfo$: Observable<DisplayEntity> = this.service.getHoverEntity$();

  transformDisplayEntity(entity: DisplayEntity): { key: string, value: any }[] {
    if (!entity.display) {
      return [];
    }

    if (entity.display instanceof Map) {
      return Array.from(entity.display.entries()).map(([key, value]) => ({ key, value }));
    } else {
      return Object.entries(entity.display).map(([key, value]) => ({ key, value }));
    }
  }
}

