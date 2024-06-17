import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./splash/splash.module').then((m) => m.SplashModule),
  },
  {
    path: 'world',
    loadChildren: () => import('./world/world-routing.module').then((m) => m.WorldRoutingModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
