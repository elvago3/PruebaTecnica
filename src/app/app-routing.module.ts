import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DynamicPageComponent } from './frontend/pages/dynamic-page/dynamic-page.component';
import { LoginComponent } from './frontend/pages/login/login.component';
import { DashboardComponent } from './frontend/pages/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'dashboard', component: DashboardComponent
  },
  {
    path: 'dashboard/:id', component: DynamicPageComponent
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
