import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {

  private messageSource = new BehaviorSubject<number>(0);
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  queryParam(id: number) {
    this.messageSource.next(id);
  }

}