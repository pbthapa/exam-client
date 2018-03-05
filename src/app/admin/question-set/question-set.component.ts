import { AlertService } from './../../app-utils/alert/alert.service';
import { ExamConstants } from './../../common/constants';
import { MultiSelectorDropdownComponent } from './../../app-utils/multi-selector-dropdown/multi-selector-dropdown.component';
import { MultiChoiceModel } from './../multi-choice/multi-choice-model';
import { MultiChoiceService } from './../multi-choice/multi-choice-service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { Subject } from '../subject-area/model/subject.model';
import { SubjectAreaService } from '../subject-area/service/subject-area.service';
import { QuestionSetModel } from './question-set.model';

@Component({
  selector: 'app-question-set',
  templateUrl: './question-set.component.html'
})
export class QuestionSetComponent implements OnInit {
  questionSetForm: FormGroup;
  levels: any[] = [];
  list: any[];
  selectedSubjectIds: number[] = [];
  questions: MultiChoiceModel[] = [];
  selectedQuestions: number[] = [];
  showContainer: boolean = false;
  @ViewChild(MultiSelectorDropdownComponent) multiSelect: MultiSelectorDropdownComponent;
  qsetModels: QuestionSetModel[] = [];

  constructor(private _fb: FormBuilder, private _subjectAreaService: SubjectAreaService,
    private _questionService: MultiChoiceService, private _alertService: AlertService) {
  }

  ngOnInit() {
    this.setFields();
    this.getAllQuestionSetDetails();
  }

  setFields() {
    this.levels = ExamConstants.levels;
    this.questionSetForm = new FormGroup({
      'difficultyLevels': new FormGroup({}),
      'totalTime': new FormControl(null, Validators.required),
      'totalMark': new FormControl(null, Validators.required),
      'questionSetName': new FormControl(null, Validators.required)
    });

    this.levels.forEach(item => {
      (<FormGroup>this.questionSetForm.get('difficultyLevels')).addControl(item.key, new FormControl(true));
    });

    this.selectedQuestions = [];
    this.showContainer = false;
    this.getSubjectAreaSelectList();
  }

  /*
   * submit question set
   */
  onSubmit() {
    if(this.questionSetForm.valid && this.selectedQuestions.length > 0) {
      this._alertService.clear();
      //set model to create question set
      const model = new QuestionSetModel(
        this.questionSetForm.value['questionSetName'],
        this.questionSetForm.value['totalTime'],
        this.questionSetForm.value['totalMark'],
        this.selectedQuestions
      );
      this._questionService.createQuestionSet(model)
        .then(response => {
          this._alertService.success("Question Set " + model.question_set_name + " saved successfully")
          this.onReset();
        })
        .catch(error => {
          this._alertService.error("Unable to save " + model.question_set_name);
          console.log(error._body);
        }); 
    } else {
      console.log("Try submitting form with correct details");
    }
  }

  getSubjectAreaSelectList() {
    this._subjectAreaService.getSubjectAreaSelectList()
      .then(response => this.list = response)
      .catch(error => console.log(error._body));
  }

  shareSelectedData(ev) {
    if (ev == null) {
      this.selectedSubjectIds = [];
    } else {
      this.selectedSubjectIds = ev.map(element => {
        return element.id;
      });
    }
  }

  onFilter() {
    if (this.selectedSubjectIds.length > 0) {
      this._alertService.clear();
      let difficulty = this.questionSetForm.get('difficultyLevels').value;
      let selectedLevels: number[] = [];

      for (let index = 0; index < 3; index++) {
        if (difficulty[index]) {
          selectedLevels.push(index);
        }
      }

      this._questionService.getQuestionDetailsByCriteria(JSON.stringify({ "subjectIds": 
        this.selectedSubjectIds, "levels": selectedLevels }))
        .then(response => this.setQuestions(response))
        .catch(error => console.log(error._body));

    } else {
      this.showContainer = false;
    }
  }

  setQuestions(questions) {
    if(questions.length > 0) {
      this.showContainer = true;
      this.questions = questions;
    } else {
      this._alertService.info("No question data found for selected criteria");
      this.questions = [];
      this.showContainer = false;
    }
  }

  setCheckedQuestion(ev, questionId) {
    if (ev.target.checked) {
      this.selectedQuestions.push(questionId);
    } else {
      const index = this.selectedQuestions.findIndex(x => x == questionId);
      this.selectedQuestions.splice(index, 1);
    }
  }

  onReset() {
    this.setFields();
    this.multiSelect._selectedDataList = [];
  }

  getAllQuestionSetDetails() {
    this._questionService.getAllQuestionSetDetails()
      .then(response => { this.qsetModels = response; })
      .catch(error => console.log(error._body));
  }
}
