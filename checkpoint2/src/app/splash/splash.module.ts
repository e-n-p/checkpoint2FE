import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SplashRoutingModule } from './splash-routing.module';
import { SplashIconComponent } from './pages/splash-icon/splash-icon.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    SplashIconComponent
  ],
  imports: [
    CommonModule,
    SplashRoutingModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [
    SplashIconComponent,
  ]
})
export class SplashModule { }
