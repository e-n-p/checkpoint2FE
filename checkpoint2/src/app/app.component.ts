import { Component, inject } from '@angular/core';
import { EntitiesService } from './shared/services/entities.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'OysterGame';

  private entityService = inject(EntitiesService); //replace with guard

}
