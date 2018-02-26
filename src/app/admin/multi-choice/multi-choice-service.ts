import { SearchCriteria } from './../../common/search-criteria';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { KeycloakHttp } from '../../keycloak/keycloak.http';
import { MultiChoiceModel } from './multi-choice-model';

@Injectable()
export class MultiChoiceService {

  private baseUrl = '/api/admin';

  constructor(private _http: KeycloakHttp) { }

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
    return this._http.get(this.baseUrl + "/questions-per-subject/" + subjectId)
    .map(response => response.json())
    .toPromise()
    .catch(this.handleError);
  }

  getQuestion(id: number) {
    return this._http.get(this.baseUrl + '/question' + id)
    .map(response => response.json())
    .toPromise()
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  getQuestionDetailsByCriteria(searchCriteria: SearchCriteria) {
    return this._http.post(this.baseUrl + "/questions-per-criteria/", searchCriteria)
    .map(response => response.json())
    .toPromise()
    .catch(this.handleError);
  }
}
