import { Injectable } from '@angular/core';
import { Subject } from '../model/subject.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SubjectAreaService {

  public baseUrl = '/api/admin';

  constructor(private _httpClient: HttpClient) { }

  create(subject: Subject) {
    return this._httpClient.post(this.baseUrl + '/create-subject-area', subject)
    .toPromise();
  }

  update(subject: Subject) {
    return this._httpClient.put(this.baseUrl + '/update-subject-area', JSON.stringify(subject))
    .toPromise();
  }

  delete(id: number) {
    return this._httpClient.put(this.baseUrl + '/remove-subject-area', JSON.stringify({"id": id}))
    .toPromise();
  }

  getSubjectAreaList(): Promise<any> {
    return this._httpClient.get(this.baseUrl + '/all-subject-area')
    .toPromise();
  }

  getSubjectArea(id: number) {
    return this._httpClient.get(this.baseUrl + '/subject-area' + id)
    .toPromise();
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

  getSubjectAreaSelectList(): Promise<any> {
    return this._httpClient.get(this.baseUrl + '/select-subjects')
    .toPromise();
  }

  getSubjectAreaActiveList(): Promise<any> {
    return this._httpClient.get(this.baseUrl + '/select-subjects')
    .toPromise();
  }

  getSubjectAreaPagedList(data): Promise<any> {
    return this._httpClient.post(this.baseUrl + '/list-subject-area', JSON.stringify(data))
    .toPromise();
  }

  /**
   * TODO: Need to move this after actual implementation
   */
  prepareExam() {
    // return this._httpClient.post(this.baseUrl + '/start-exam', null)
    // .toPromise();
    return null;
  }
}
