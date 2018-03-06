import { QuestionSetModel } from './../question-set.model';
import { MultiChoiceService } from './../../multi-choice/multi-choice-service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-question-set',
  templateUrl: './edit-question-set.component.html',
  styleUrls: ['./edit-question-set.component.css']
})
export class EditQuestionSetComponent implements OnInit {

  private subscriber: any;
  data: any;

  constructor(private route: ActivatedRoute, private _questionService: MultiChoiceService) { }

  ngOnInit() {
    this.subscriber = this.route.params.subscribe(params => {
      const id = +params['id']; // (+) converts string 'id' to a number
      this.getQuestionSetDetailsById(id);
    });
  }

  getQuestionSetDetailsById(id) {
    this._questionService.getAllQuestionSetDetailsById(id)
      .then(x => {
        this.data = x;
        console.log(this.data);
      })
      .catch(error => console.log(error._body));
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }
}
