import { Injectable } from "@angular/core";
import { Observable } from 'rxjs'

@Injectable()
export class ClockService {

    private clock: Observable<Date>;
    private countDown: Observable<number>;

    constructor() {
        this.clock = Observable.interval(1).map(tick => new Date()).share();
        this.countDown = Observable.timer(0, 1000).map(tick => 40 - tick).takeWhile(tick => tick > 0);
    }

    getClock(): Observable<Date> {
        return this.clock;
    }

    getCountDown(): Observable<number> {
        return this.countDown;
    }
}