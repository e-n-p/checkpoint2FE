import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorldRoutingModule } from './world-routing.module';
import { WorldComponent } from './pages/world/world.component';
import { RouterModule } from '@angular/router';
import { ControlsComponent } from './components/ui/controls/controls.component';
import { InfoDisplayComponent } from './components/ui/info-display/info-display.component';
import { MapComponent } from './components/features/map/map.component';


@NgModule({
  declarations: [
    WorldComponent,
    ControlsComponent,
    InfoDisplayComponent,
    MapComponent
  ],
  imports: [
    CommonModule,
    WorldRoutingModule,
    RouterModule
  ]
})
export class WorldModule { }
