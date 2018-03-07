import { EditQuestionSetComponent } from './question-set/edit-question-set/edit-question-set.component';
import { QuestionSetComponent } from './question-set/question-set.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SubjectAreaComponent } from './subject-area/subject-area.component';
import { MultiChoiceComponent } from './multi-choice/multi-choice.component';
import { AdminComponent } from './admin.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '', component: AdminComponent, children: [
                        { path: 'subject', component: SubjectAreaComponent },
                        { path: 'multi-choice', component: MultiChoiceComponent },
                        { path: 'prepare-question-set', component: QuestionSetComponent },
                        { path: 'edit-question-set', component: EditQuestionSetComponent }
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class AdminRoutingModule { }