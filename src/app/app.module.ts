import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpModule, XHRBackend, RequestOptions } from '@angular/http'

import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { AppRoutingModule } from './app.route.module';
import { KeycloakHttp, keycloakHttpFactory } from './keycloak/keycloak.http';
import { KeycloakService } from './keycloak/keycloak.service';
import { DataService } from './common/data.service';
import { AlertService } from './app-utils/alert/alert.service';

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule ,
    ReactiveFormsModule, 
    HttpModule, 
    FormsModule, 
    HomeModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: KeycloakHttp,
      useFactory: keycloakHttpFactory,
      deps: [XHRBackend, RequestOptions, KeycloakService],
   },
   KeycloakService,
   DataService,
   AlertService
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
