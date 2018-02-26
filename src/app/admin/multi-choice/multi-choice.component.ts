import { MultiChoiceService } from './multi-choice-service';
import { Subject } from './../subject-area/model/subject.model';
import { SubjectAreaService } from './../subject-area/service/subject-area.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { TableOptions } from '../../app-utils/xDatatable/table/table.options';
import { ColumnConfig } from './table-column.config';
import { error } from 'util';
import { MultiChoiceModel } from './multi-choice-model';

@Component({
  selector: 'app-multi-choice',
  templateUrl: './multi-choice.component.html'
})
export class MultiChoiceComponent implements OnInit {
  questionForm: FormGroup;
  options: Array<string> = ['Option A', 'Option B', 'Option C', 'Option D'];
  levels: Array<string> = ['Beginner', 'Medium', 'Advanced'];
  subjects: Array<Subject> = [];
  subjectFilter = new FormControl('undefined');
  questions: Array<MultiChoiceModel> = [];
  hideQuestionList: boolean = true;
  correctCss: string = "";
  
  constructor(private _formBuilder: FormBuilder, private _subjectAreaService: SubjectAreaService,
    private _questionService: MultiChoiceService) {
  }

  ngOnInit() {
    this.setFields();
    this.getSubjectAreaList();
  }

  setFields() {
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
      var difficulty:number = 0;
      switch(this.questionForm.value['level']) {
        case 'Beginner': 
          difficulty = 0;
          break;
        case 'Medium': 
          difficulty = 1;
          break;
        case 'Advanced': 
          difficulty = 2;
          break;
      }
      let question = new MultiChoiceModel(null, 
        this.questionForm.value['subject'], 
        this.questionForm.value['questionName'],
        this.questionForm.value['optionA'],
        this.questionForm.value['optionB'],
        this.questionForm.value['optionC'],
        this.questionForm.value['optionD'],
        this.questionForm.value['correctOption'],
        difficulty,
        this.questionForm.value['active']);
      this._questionService.create(question);
      this.subjects = [];
      this.getSubjectAreaList();
      this.setFields();
    }
  }

  getSubjectAreaList() {
    Promise.all([this._subjectAreaService.getSubjectAreaList()])
    .then(response => this.subjects = response[0])
    .catch(error => console.log(error));
  }

  getQuestionList() {
    Promise.all([this._questionService.getQuestionList()])
    .then(response => this.questions = response[0])
    .catch(error => console.log(error));
  }

  getQuestionListBySubjectId(subjectId) {
    Promise.all([this._questionService.getQuestionListBySubjectId(subjectId)])
    .then(response => this.questions = response[0])
    .catch(error => console.log(error));
  }

  onSubjectChangeShowQuestion() {
    if(this.subjectFilter.value == "undefined") {
      //clear everything and hide
      this.hideQuestionList = true;
      this.questions = [];
    } else {
      this.hideQuestionList = false;
      this.getQuestionListBySubjectId(this.subjectFilter.value);
    }
  }
}
