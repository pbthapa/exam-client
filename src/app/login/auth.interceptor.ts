import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    public constructor(private injector: Injector) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Get the auth header from the service.
        const auth = this.injector.get(AuthService);
        const idToken = auth.getToken();
        if (idToken) {
            const headers = new HttpHeaders({
                'Authorization': 'Bearer ' + idToken,
                'Content-Type': 'application/json'
              });
          
            const cloneReq = req.clone({headers});
            return next.handle(cloneReq);
        } else {
            return next.handle(req);
        }
    }
}