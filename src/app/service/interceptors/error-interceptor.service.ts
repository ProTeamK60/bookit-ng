import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError = (error: HttpErrorResponse) => {
    if(error.status === 401) {
      //redirect to login page.
      window.location.href = environment.cognitoLoginAddress + (window.location.href.startsWith("http://") ? window.location.href.replace("http://", "https://") : window.location.href);
      return;
    }
    if(error.error instanceof ErrorEvent) {
      console.error('Error occurred when trying to fetch events: ', error.error.message);
      return throwError(new Error('There was a temporary error trying to fetch the events, please try again later..'));
    } else {
      console.error(`Backend returned HTTP Status Code ${error.status} and HTTP Response Body ${error.error}`);
      return throwError(error.error);
    }
  }
}
