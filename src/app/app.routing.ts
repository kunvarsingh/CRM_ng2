import { ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  }
];
export const routing: ModuleWithProviders = RouterModule.forRoot(AppRoutes, {preloadingStrategy: PreloadAllModules });
