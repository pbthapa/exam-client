import { AuthInterceptor } from './login/auth.interceptor';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpModule, XHRBackend, RequestOptions } from '@angular/http'

import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { AppRoutingModule } from './app.route.module';
// import { KeycloakHttp, keycloakHttpFactory } from './keycloak/keycloak.http';
// import { KeycloakService } from './keycloak/keycloak.service';
import { DataService } from './common/data.service';
import { AlertService } from './app-utils/alert/alert.service';
import { ClockService } from './app-utils/clock/clock.service';
import { AuthService } from './login/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
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
    /** NOTE: Keycloak implementation is commented */
  //   {
  //     provide: KeycloakHttp,
  //     useFactory: keycloakHttpFactory,
  //     deps: [XHRBackend, RequestOptions, KeycloakService],
  //  },
  //  KeycloakService,
  /** NOTE: Keycloak implementation is commented */
   DataService,
   AlertService,
   ClockService,
   AuthService,
   {
     provide: HTTP_INTERCEPTORS,
     useClass: AuthInterceptor,
     multi: true
   }
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
