import { QuestionSetModel } from './../question-set.model';
import { MultiChoiceService } from './../../multi-choice/multi-choice-service';
import { Component, OnInit } from '@angular/core';
import { MultiChoiceModel } from '../../multi-choice/multi-choice-model';
import { ExamConstants } from '../../../common/constants';
import { DataService } from '../../../common/data.service';

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

  constructor(private _questionService: MultiChoiceService,
    private data: DataService) { }

  ngOnInit() {
    this.levels = ExamConstants.levels;
    this.subscriber = this.data.currentMessage.subscribe(id => {
      this.getQuestionSetDetailsById(id);
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
}
