import { QuestionSetModel } from './../question-set.model';
import { MultiChoiceService } from './../../multi-choice/multi-choice-service';
import { Component, OnInit } from '@angular/core';
import { MultiChoiceModel } from '../../multi-choice/multi-choice-model';
import { ExamConstants } from '../../../common/constants';
import { DataService } from '../../../common/data.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { SubjectAreaService } from '../../subject-area/service/subject-area.service';
import { AlertService } from '../../../app-utils/alert/alert.service';

@Component({
  selector: 'app-edit-question-set',
  templateUrl: './edit-question-set.component.html',
  styleUrls: ['./edit-question-set.component.css']
})
export class EditQuestionSetComponent implements OnInit {

  private subscriber: any;
  qSetDetail: QuestionSetModel;
  questions: any[] = [];
  levels: any[] = [];
  subjectList: any[] = [];
  questionSelectList: Array<MultiChoiceModel> = [];
  data1: any;

  constructor(private _questionService: MultiChoiceService, private _subjectAreaService: SubjectAreaService,
    private data: DataService, private router: Router, private _alertService: AlertService) { }

  ngOnInit() {
    this.levels = ExamConstants.levels;
    this.getSubjectAreaList();
    this.subscriber = this.data.currentMessage.subscribe(id => {
      if (id > 0) {
        this.getQuestionSetDetailsById(id);
      } else {
        this.router.navigate(['/admin/prepare-question-set']);
      }
    });
  }

  getQuestionSetDetailsById(id) {
    this._questionService.getAllQuestionSetDetailsById(id)
      .then(x => {
        this.qSetDetail = x[0];
        this.questions = x[1];
      })
      .catch(error => console.log(error._body));
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }

  onBackClickBtn() {
    this.router.navigate(['/admin/prepare-question-set']);
  }

  onSubjectChangeShowQuestion(ev) {
    this._alertService.clear();
    if (ev.target.value == "undefined") {
      this.questionSelectList = [];
    } else {
      this.getQuestionListBySubjectId(ev.target.value);
    }
  }

  getQuestionListBySubjectId(subjectId) {
    this._questionService.getQuestionListBySubjectId(subjectId)
      .then(response => {
        this._alertService.clear();
        if (response.length > 0) {
          this.questionSelectList = response;
        } else {
          this._alertService.info("No question list available for selected subject");
        }
      })
      .catch(error => {
        this._alertService.error("Unable to show Question List");
        console.log(error._body)
      });
  }

  getSubjectAreaList() {
    this._subjectAreaService.getSubjectAreaSelectList()
      .then(response => { this.subjectList = response; })
      .catch(error => {
        this._alertService.error("Unable to show the subject list");
        console.log(error._body);
      });
  }

  onQuestionChange(ev) {
    this._alertService.clear();
    if (ev.target.value == "undefined") {

    } else {
      const index = this.questions.findIndex(x => x.id == ev.target.value);
      if (index == -1) {
        //add question to questions array
        this._questionService.getQuestion(ev.target.value).then(x => {
          this.questions.push({ id: x.id, question: x.question, level: x.level,
            option_a: x.option_a, option_b: x.option_b, option_c: x.option_c, 
            option_d: x.option_d, correct_option: x.correct_option });  
        });
      } else {
        this._alertService.warn("Selected Question aleady exists");
      }
    }
  }

  tableOnRemoveQuestion(questionId) {
    const index = this.questions.findIndex(x => x.id == questionId);
    this.questions.splice(index, 1);
  }
}
