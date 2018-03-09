import { AlertService } from './../../app-utils/alert/alert.service';
import { ExamConstants } from './../../common/constants';
import { MultiChoiceService } from './multi-choice-service';
import { Subject } from './../subject-area/model/subject.model';
import { SubjectAreaService } from './../subject-area/service/subject-area.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { TableOptions } from '../../app-utils/xDatatable/table/table.options';
import { ColumnConfig } from './table-column.config';
import { MultiChoiceModel } from './multi-choice-model';

@Component({
  selector: 'app-multi-choice',
  templateUrl: './multi-choice.component.html'
})
export class MultiChoiceComponent implements OnInit {
  questionForm: FormGroup;
  options: any[] = [];
  levels: any[] = [];
  list: any[] = [];
  subjectFilter = new FormControl('undefined');
  questions: Array<MultiChoiceModel> = [];
  hideQuestionList: boolean = true;
  correctCss: string = "";
  
  constructor(private _formBuilder: FormBuilder, private _subjectAreaService: SubjectAreaService,
    private _questionService: MultiChoiceService, private _alertService: AlertService) {
  }

  ngOnInit() {
    this.setFields();
    this.getSubjectAreaList();
  }

  setFields() {
    this.options = ExamConstants.options;
    this.levels = ExamConstants.levels;
    this.questionForm = new FormGroup({
      'subject': new FormControl('undefined', Validators.required),
      'questionName': new FormControl(null, Validators.required),
      'optionA': new FormControl(null, Validators.required),
      'optionB': new FormControl(null, Validators.required),
      'optionC': new FormControl(null, Validators.required),
      'optionD': new FormControl(null, Validators.required),
      'correctOption': new FormControl('undefined', Validators.required),
      'level': new FormControl('undefined', Validators.required),
      'active': new FormControl(true, Validators.required)
    });
  }

  onSubjectChange(ev) {
    this.questionForm.setValue({
      'subject': ev.target.value,
      'questionName': null,
      'optionA': null,
      'optionB': null,
      'optionC': null,
      'optionD': null,
      'correctOption': 'undefined',
      'level': 'undefined',
      'active': true
    });
  }

  onSubmit(){
    if (this.questionForm.valid) {
      let question = new MultiChoiceModel(null, 
        this.questionForm.value['subject'], 
        this.questionForm.value['questionName'],
        this.questionForm.value['optionA'],
        this.questionForm.value['optionB'],
        this.questionForm.value['optionC'],
        this.questionForm.value['optionD'],
        this.questionForm.value['correctOption'],
        this.questionForm.value['level'],
        this.questionForm.value['active']);
      this._questionService.create(question)
        .then(response => {
          this._alertService.success("Question saved successfully");
          this.getSubjectAreaList();
          this.setFields();
        })
        .catch(error => {
          this._alertService.error("Unable to save Question");
          console.log(error._body);
        });
    }
  }

  getSubjectAreaList() {
   this._subjectAreaService.getSubjectAreaSelectList()
    .then(response => this.list = response)
    .catch(error => {
      this._alertService.error("Unable to show the subject list");
      console.log(error._body);
    });
  }

  getQuestionList() {
    this._questionService.getQuestionList()
    .then(response => this.questions = response)
    .catch(error => {
      this._alertService.error("Unable to show the question list");
      console.log(error._body);
    });
  }

  getQuestionListBySubjectId(subjectId) {
    this._questionService.getQuestionListBySubjectId(subjectId)
    .then(response => {
      this._alertService.clear();
      if (response.length > 0) {
        this.questions = response;
      } else {
        this.hideQuestionList = true;
        this._alertService.info("No question list available for selected subject");
      }
    })
    .catch(error => {
      this._alertService.error("Unable to show Question List");
      console.log(error._body)
    });
  }

  onSubjectChangeShowQuestion(ev) {
    this.questions = [];
    this._alertService.clear();
    if(this.subjectFilter.value == "undefined") {
      //clear everything and hide
      this.hideQuestionList = true;
    } else {
      this.hideQuestionList = false;
      this.getQuestionListBySubjectId(this.subjectFilter.value);
    }
  }
}
