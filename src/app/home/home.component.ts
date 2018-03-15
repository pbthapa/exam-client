import { Component, OnInit } from '@angular/core';
import { AlertService } from '../app-utils/alert/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
constructor(private _alertService: AlertService) { }
  
ngOnInit() {
}

}
