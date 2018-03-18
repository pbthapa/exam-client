import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

    constructor() {}

    login(loginData) {
        console.log(loginData.username + "User Logged In");
    }

}