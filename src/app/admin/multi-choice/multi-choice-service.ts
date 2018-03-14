import { QuestionSetModel } from './../question-set/question-set.model';
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { KeycloakHttp } from '../../keycloak/keycloak.http';
import { MultiChoiceModel } from './multi-choice-model';

@Injectable()
export class MultiChoiceService {

  private baseUrl = '/api/admin';

  //constructor(private _http: KeycloakHttp) { }
  constructor(private _http: Http) { }

  create(data: MultiChoiceModel) {
    return this._http.post(this.baseUrl + '/create-question', data)
    .toPromise()
    .catch(this.handleError);
  }

  update(data: MultiChoiceModel) {
    return this._http.put(this.baseUrl + '/update-question' + data.id, JSON.stringify(data))
    .toPromise()
    .catch(this.handleError);
  }

  delete(id: number) {
    return this._http.delete(this.baseUrl + '/question' + id)
    .map(response => response.json())
    .toPromise()
    .catch(this.handleError);
  }

  getQuestionList() {
    return this._http.get(this.baseUrl + '/questions')
    .map(response => response.json())
    .toPromise()
    .catch(this.handleError);
  }

  getQuestionListBySubjectId(subjectId) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.baseUrl + "/questions-per-subject/", JSON.stringify({'subjectId': subjectId}), options)
    .map(response => response.json())
    .toPromise()
    .catch(this.handleError);
  }

  getQuestion(id: number) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.baseUrl + "/question", JSON.stringify({'id': id}), options)
    .map(response => response.json())
    .toPromise()
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    //console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  getQuestionDetailsByCriteria(filterData) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.baseUrl + "/questions-per-criteria/", filterData, options)
    .map(response => response.json())
    .toPromise()
    .catch(this.handleError);
  }

  createQuestionSet(data: QuestionSetModel) {
    return this._http.post(this.baseUrl + '/create-question-set', data)
    .toPromise()
    .catch(this.handleError);
  }

  getAllQuestionSetDetails() {
    return this._http.get(this.baseUrl + '/list-question-set')
    .map(response => response.json())
    .toPromise()
    .catch(this.handleError);
  }

  getAllQuestionSetDetailsById(id) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.baseUrl + "/edit-question-set/", JSON.stringify({'id': id}), options)
    .map(response => response.json())
    .toPromise()
    .catch(this.handleError);
  }

  updateQuestionSet(data: QuestionSetModel) {
    return this._http.post(this.baseUrl + '/update-question-set', data)
    .toPromise()
    .catch(this.handleError);
  }

  deleteQuestionSet(setId: number) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.baseUrl + '/remove-question-set', JSON.stringify({ id: setId }), options)
    .map(response => response.json())
    .toPromise()
    .catch(this.handleError);
  }
}
