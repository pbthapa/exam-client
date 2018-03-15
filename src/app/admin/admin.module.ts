import { EditQuestionSetComponent } from './question-set/edit-question-set/edit-question-set.component';
import { AlertComponent } from './../app-utils/alert/alert.component';
import { TreeComponent } from './../app-utils/tree/tree.component';
import { TreeService } from './../app-utils/tree/tree.service';
import { MultiSelectorDropdownComponent } from './../app-utils/multi-selector-dropdown/multi-selector-dropdown.component';
import { MultiChoiceService } from './multi-choice/multi-choice-service';
import { SharedModule } from './../common/shared.module';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { TableComponent } from '../app-utils/xDatatable/table/table.component';
import { DataLoaderService } from '../app-utils/xDatatable/service/dataLoader.service';
import { HtmlBind } from '../app-utils/xDatatable/table/html-bind.directive';
import { TooltipModule } from 'ngx-tooltip';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin.route.module';
import { SubjectAreaComponent } from './subject-area/subject-area.component';
import { SubjectAreaService } from './subject-area/service/subject-area.service';
import { MultiChoiceComponent } from './multi-choice/multi-choice.component';
import { HomeModule } from '../home/home.module';
import { AdminComponent } from './admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionSetComponent } from './question-set/question-set.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { TablePaginationComponent } from '../app-utils/pagination/table-pagination.component';

@NgModule({
  declarations: [
    TableComponent,
    HtmlBind,
    SubjectAreaComponent,
    MultiChoiceComponent,
    AdminComponent,
    QuestionSetComponent,
    MultiSelectorDropdownComponent,
    TreeComponent,
    EditQuestionSetComponent,
    TablePaginationComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    HttpModule,
    TooltipModule,
    AdminRoutingModule,
    HomeModule,
    FormsModule,
    ReactiveFormsModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule
  ],
  providers: [
    MultiChoiceService,
    SubjectAreaService,
    DataLoaderService,
    TreeService,
  ],
  exports: [
    TableComponent
  ]
})
export class AdminModule {}