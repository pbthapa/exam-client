import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    form: FormGroup;

    constructor(private _router: Router, private _authService: AuthService) {}

    ngOnInit() {
        this.form = new FormGroup({
            'username': new FormControl(null, Validators.required),
            'password': new FormControl(null, Validators.required)
        });
    }

    onLogin() {
        this._authService.login(this.form.value)
        .then(data => {
            this._router.navigate(['dashboard']);
        })
        .catch(error => { console.log("Error has occured" + error)});
    }
}