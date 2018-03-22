import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthService {

    constructor(private _httpClient: HttpClient) {}

    login(loginData) {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this._httpClient.post('/api/login', JSON.stringify(loginData), { headers })
        .toPromise()
        .then(response => {
            localStorage.setItem('jwt_token', response['token'])
        })
        .catch(err => console.log(err));
    }

    getToken() {
        return localStorage.getItem('jwt_token');
    }

}