import { ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule, PreloadAllModules} from '@angular/router';
import { DotsComponent } from './dots/dots.component';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dots',
    pathMatch: 'full',
  },
  {
    path: 'dots',
    component: DotsComponent
  }
];
export const routing: ModuleWithProviders = RouterModule.forRoot(AppRoutes, {preloadingStrategy: PreloadAllModules });
