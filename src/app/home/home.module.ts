import { SharedModule } from './../common/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home.route.module';
import { AlertComponent } from '../app-utils/alert/alert.component';
import { AlertService } from '../app-utils/alert/alert.service';
import { ClockComponent } from '../app-utils/clock/clock.component';
import { ExamComponent } from '../admin/exam/exam.component';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    ReactiveFormsModule, 
    FormsModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    AlertComponent,
    ClockComponent,
    ExamComponent
   ],
  //  providers:[AlertService]
})
export class HomeModule { }
