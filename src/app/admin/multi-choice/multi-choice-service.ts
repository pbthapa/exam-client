import { QuestionSetModel } from './../question-set/question-set.model';
import { Injectable } from '@angular/core';
// import { Headers, Http, RequestOptions } from '@angular/http';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/Rx';
//import { KeycloakHttp } from '../../keycloak/keycloak.http';
import { MultiChoiceModel } from './multi-choice-model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MultiChoiceService {

  private baseUrl = '/api/admin';

  //constructor(private _http: KeycloakHttp) { }
  //constructor(private _http: Http) { }
  constructor(private _httpClient: HttpClient) { }

  create(data: MultiChoiceModel) {
    return this._httpClient.post(this.baseUrl + '/create-question', data)
    .toPromise()
    .catch(this.handleError);
  }

  update(data: MultiChoiceModel) {
    return this._httpClient.put(this.baseUrl + '/update-question' + data.id, JSON.stringify(data))
    .toPromise()
    .catch(this.handleError);
  }

  delete(id: number) {
    return this._httpClient.delete(this.baseUrl + '/question' + id)
    .toPromise()
    .catch(this.handleError);
  }

  getQuestionList(): Promise<any> {
    return this._httpClient.get(this.baseUrl + '/questions')
    .toPromise()
    .catch(this.handleError);
  }

  getQuestionListBySubjectId(subjectId): Promise<any> {
    return this._httpClient.post(this.baseUrl + "/questions-per-subject/", JSON.stringify({'subjectId': subjectId}))
    .toPromise()
    .catch(this.handleError);
  }

  getQuestion(id: number) {
    return this._httpClient.post(this.baseUrl + "/question", JSON.stringify({'id': id}))
    .toPromise()
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

  getQuestionDetailsByCriteria(filterData): Promise<any> {
    return this._httpClient.post(this.baseUrl + "/questions-per-criteria/", filterData)
    .toPromise()
    .catch(this.handleError);
  }

  createQuestionSet(data: QuestionSetModel) {
    return this._httpClient.post(this.baseUrl + '/create-question-set', data)
    .toPromise()
    .catch(this.handleError);
  }

  getAllQuestionSetDetails(): Promise<any> {
    return this._httpClient.get(this.baseUrl + '/all-question-set')
    .toPromise()
    .catch(this.handleError);
  }

  getAllQuestionSetDetailsById(id): Promise<any> {
    return this._httpClient.post(this.baseUrl + "/edit-question-set/", JSON.stringify({'id': id}))
    .toPromise()
    .catch(this.handleError);
  }

  updateQuestionSet(data: QuestionSetModel) {
    return this._httpClient.post(this.baseUrl + '/update-question-set', data)
    .toPromise()
    .catch(this.handleError);
  }

  deleteQuestionSet(setId: number) {
    return this._httpClient.post(this.baseUrl + '/remove-question-set', JSON.stringify({ id: setId }))
    .toPromise()
    .catch(this.handleError);
  }

  getAllPagedQuestionSetDetails(data): Promise<any> {
    return this._httpClient.post(this.baseUrl + '/list-question-set', JSON.stringify(data))
    .toPromise();
  }
}
