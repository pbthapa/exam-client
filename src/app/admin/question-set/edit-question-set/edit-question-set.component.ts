import { QuestionSetModel } from './../question-set.model';
import { MultiChoiceService } from './../../multi-choice/multi-choice-service';
import { Component, OnInit } from '@angular/core';
import { MultiChoiceModel } from '../../multi-choice/multi-choice-model';
import { ExamConstants } from '../../../common/constants';
import { DataService } from '../../../common/data.service';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
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
  form: FormGroup;

  constructor(private _questionService: MultiChoiceService, private _subjectAreaService: SubjectAreaService,
    private data: DataService, private router: Router, private _alertService: AlertService) { }

  ngOnInit() {
    this.form = new FormGroup({
      'totalTime': new FormControl(null, Validators.required),
      'totalMark': new FormControl(null, Validators.required),
      'questionSetName': new FormControl(null, Validators.required),
      'active': new FormControl(null, Validators.required),
      'activeOn': new FormControl(null, Validators.required)
    });
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
        this.form.setValue({
          totalTime: this.qSetDetail.total_time,
          totalMark: this.qSetDetail.total_mark,
          questionSetName: this.qSetDetail.question_set_name,
          active: this.qSetDetail.active,
          activeOn: this.qSetDetail.active_on
        });
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

  onSubmit() {
    if (this.form.valid && this.questions.length > 0) {
      this.copyFields(this.form.value);
      this.qSetDetail.selectedQuestionIds = [];
      this.questions.map(data => {
        this.qSetDetail.selectedQuestionIds.push(data.id);
      });
      //console.log(this.qSetDetail);
      //push data to edit
      this._questionService.updateQuestionSet(this.qSetDetail)
      .then(x => {
        this._alertService.success("Question set updated successfully");
        // this._alertService.success(alert.message);
        this.router.navigate(['/admin/prepare-question-set']);
      })
      .catch(error => { console.log(error); });
    } else {
      this._alertService.warn("Please fill all the fields");
    }
  }

  copyFields(data) {
    this.qSetDetail.total_time = data.totalTime;
    this.qSetDetail.total_mark = data.totalMark;
    this.qSetDetail.active = data.active;
    this.qSetDetail.active_on = data.activeOn;
    this.qSetDetail.question_set_name = data.questionSetName;
  }

  toggleQuestionOption(ev) {
    if (ev.target['nextElementSibling']['className'] == 'collapse') {
      ev.target['nextElementSibling']['className'] = '';
    } else {
      ev.target['nextElementSibling']['className'] = 'collapse';
    }
  }
}
