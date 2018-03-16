import { OnInit, OnDestroy, Component } from "@angular/core";
import { Subscription } from "rxjs";
import { ClockService } from "./clock.service";

@Component({
    selector: 'clock',
    templateUrl: './clock.component.html',
    styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit, OnDestroy {

    private _clockSubscription: Subscription;
    private _countDownSubscription: Subscription;
    time: Date;
    countDown: number;

    constructor(private _clockService: ClockService) { }

    ngOnInit(): void {
        this._clockSubscription = this._clockService.getClock().subscribe(time => {
            this.time = time;
        });
        this._countDownSubscription = this._clockService.getCountDown().subscribe(countDown => {
            this.countDown = countDown;
        });
    }

    ngOnDestroy(): void {
        console.log("------Destroyed---------");
        this._clockSubscription.unsubscribe();
        this._countDownSubscription.unsubscribe();
    }
}