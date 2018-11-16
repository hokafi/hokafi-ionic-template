import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthServiceProvider } from '../AuthServiceProvider/AuthServiceProvider';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthServiceProvider) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    request = request.clone({
      setHeaders: {
        'Content-Type' : 'application/json; charset=utf-8',
        Accept      : 'application/json',
        Authorization: `Basic ${this.auth.getToken()}`
      }
    });
    return next.handle(request);
  }
}