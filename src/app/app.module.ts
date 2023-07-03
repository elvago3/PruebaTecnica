import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './frontend/pages/login/login.component';
import { DashboardComponent } from './frontend/pages/dashboard/dashboard.component';
import { DataComponent } from './frontend/pages/components/data/data.component';
import { DynamicPageComponent } from './frontend/pages/dynamic-page/dynamic-page.component';
import { SensorsComponent } from './frontend/pages/sensors/sensors.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    DataComponent,
    DynamicPageComponent,
    SensorsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
