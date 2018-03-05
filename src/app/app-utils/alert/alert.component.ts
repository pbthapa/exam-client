import { Component, OnInit, OnDestroy } from '@angular/core';

import { Alert, AlertType } from './alert';
import { AlertService } from './alert.service';
import { Subscriber } from 'rxjs';

@Component({
    moduleId: module.id,
    selector: 'alert',
    templateUrl: 'alert.component.html'
})

export class AlertComponent implements OnInit, OnDestroy {
    alerts: Alert[] = [];
    data:Array<any> = [];

    constructor(private alertService: AlertService) { }

    ngOnInit() {
       this.data.push(this.alertService.getAlert().subscribe((alert: Alert) => {
            if (!alert) {
                // clear alerts when an empty alert is received
                this.alerts = [];
                return;
            }

            // add alert to array
            this.alerts.push(alert);
        }));
    }

    removeAlert(alert: Alert) {
        this.alerts = this.alerts.filter(x => x !== alert);
    }

    cssClass(alert: Alert) {
        if (!alert) {
            return;
        }

        // return css class based on alert type
        switch (alert.type) {
            case AlertType.Success:
                return 'alert alert-success';
            case AlertType.Error:
                return 'alert alert-danger';
            case AlertType.Info:
                return 'alert alert-info';
            case AlertType.Warning:
                return 'alert alert-warning';
        }
    }

    ngOnDestroy () {
        this.data.forEach(o=>o.unsubscribe());
    }
}