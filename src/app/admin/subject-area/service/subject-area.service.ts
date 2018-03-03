import { Injectable } from '@angular/core';
import { Subject } from '../model/subject.model';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { KeycloakHttp } from '../../../keycloak/keycloak.http';

@Injectable()
export class SubjectAreaService {

  public baseUrl = '/api/admin';

  //constructor(private _http: KeycloakHttp) { }
  constructor(private _http: Http) { }

  create(subject: Subject) {
    return this._http.post(this.baseUrl + '/create-subject-area', subject)
    // .map(data => {
    //   alert(data);
    //   data.json();
    // })
    .toPromise();
  }

  update(subject: Subject) {
    return this._http.put(this.baseUrl + '/update-subject-area' + subject.id, JSON.stringify(subject))
    // .map(data => {
    //   alert(data);
    //   data.json();
    // })
    .toPromise()
    .catch(this.handleError);
  }

  delete(id: number) {
    return this._http.delete(this.baseUrl + '/subject-area' + id)
    .map(data => data.json())
    .toPromise();
  }

  getSubjectAreaList() {
    return this._http.get(this.baseUrl + '/all-subject-area')
    .map(data => data.json())
    .toPromise();
  }

  getSubjectArea(id: number) {
    return this._http.get(this.baseUrl + '/subject-area' + id)
    .map(data => data.json())
    .toPromise();
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  getSubjectAreaSelectList() {
    return this._http.get(this.baseUrl + '/select-subjects')
    .map(data => data.json())
    .toPromise();
  }

  getSubjectAreaActiveList() {
    return this._http.get(this.baseUrl + '/select-subjects')
    .map(data => data.json())
    .toPromise();
  }
}
