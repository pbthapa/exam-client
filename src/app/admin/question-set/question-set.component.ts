import { MultiSelectorDropdownComponent } from './../../app-utils/multi-selector-dropdown/multi-selector-dropdown.component';
import { DifficultyLevel } from './../../common/difficulty-level';
import { MultiChoiceModel } from './../multi-choice/multi-choice-model';
import { SearchCriteria } from './../../common/search-criteria';
import { MultiChoiceService } from './../multi-choice/multi-choice-service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { Subject } from '../subject-area/model/subject.model';
import { SubjectAreaService } from '../subject-area/service/subject-area.service';

@Component({
  selector: 'app-question-set',
  templateUrl: './question-set.component.html'
})
export class QuestionSetComponent implements OnInit {
  questionSetForm: FormGroup;
  levels: string[] = [];
  list: any[];
  selectedSubjectIds: string = '';
  questions: MultiChoiceModel[] = [];
  selectedQuestions: number[] = [];
  showContainer: boolean = false;
  @ViewChild(MultiSelectorDropdownComponent) multiSelect: MultiSelectorDropdownComponent;

  constructor(private _fb: FormBuilder, private _subjectAreaService: SubjectAreaService,
    private _questionService: MultiChoiceService) {
  }

  ngOnInit() {
    this.setFields();
  }

  setFields() {
    this.levels = this.getLevels();
    this.questionSetForm = new FormGroup({
      'difficultyLevels': new FormGroup({})
    });

    this.levels.forEach(item => {
      (<FormGroup>this.questionSetForm.get('difficultyLevels')).addControl(item, new FormControl(true));
    });
    
    this.selectedQuestions = [];
    this.showContainer = false;
    this.getSubjectAreaSelectList();
  }

  getLevels() {
    const data = Object.keys(DifficultyLevel);
    return data.slice(data.length / 2);
  }

  /*
   * submit question set
   */
  onSubmit() {
  }

  getSubjectAreaSelectList() {
    Promise.all([this._subjectAreaService.getSubjectAreaSelectList()])
      .then(response => this.list = response[0])
      .catch(error => console.log(error));
  }

  shareSelectedData(ev) {
    if(ev == null) {
      this.selectedSubjectIds = '';
    } else {
      this.selectedSubjectIds = ev.map(element => {
        return element.id;
      }).join(', ');
    }
  }

  onFilter() {
    if (this.selectedSubjectIds.length > 0) {
      this.showContainer = true;
      var criteria = new SearchCriteria();
      criteria.ids = this.selectedSubjectIds;
      if (this.questionSetForm.get('difficultyLevels').value['Beginner']) {
        criteria.difficultyLevels.push(DifficultyLevel.Beginner);
      }

      if (this.questionSetForm.get('difficultyLevels').value['Medium']) {
        criteria.difficultyLevels.push(DifficultyLevel.Medium);
      }

      if (this.questionSetForm.get('difficultyLevels').value['Advanced']) {
        criteria.difficultyLevels.push(DifficultyLevel.Advanced);
      }

      Promise.all([this._questionService.getQuestionDetailsByCriteria(criteria)])
        .then(response => this.setQuestions(response[0]))
        .catch(error => console.log(error));
    } else {
      this.showContainer = false;
    }
  }

  setQuestions(questions) {
    this.questions = questions;
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
}
