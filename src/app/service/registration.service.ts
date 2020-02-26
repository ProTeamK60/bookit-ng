import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, of} from 'rxjs';
import {Registration} from '../model/registration';
import {Participant} from '../model/participant';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class RegistrationService {

  registrationUrl: string;
  participantsUrl: string;

  constructor(private client: HttpClient, private authService: AuthService) {
    this.registrationUrl = environment.registrationServiceAddress + '/api/v1/registrations';
    this.participantsUrl = environment.registrationServiceAddress + '/api/v1/participants';
  }

  public addRegistration(registration: Registration, onErrorCallback: (error: HttpErrorResponse) => Observable<never>): Promise<Observable<HttpResponse<string>>> {
    return this.buildHeaders().then(headers => {
      return this.client.post<string>(this.registrationUrl, registration, {headers: headers, observe: 'response'})
        .pipe(catchError(onErrorCallback));
    });
  }

  public findParticipantsByEventId(eventId: string, onErrorCallback: (error: HttpErrorResponse) => Observable<never>): Promise<Observable<Participant[]>> {
    return this.buildHeaders().then(headers => {
      return this.client.get<Participant[]>(this.participantsUrl + '/event/' + eventId, {headers: headers})
        .pipe(catchError(onErrorCallback));
    });
  }

  public deleteRegistration(email: string, eventId: string, onErrorCallback: (error: HttpErrorResponse) => Observable<never>): Promise<Observable<HttpResponse<string>>> {
    return this.buildHeaders().then(headers => {
      return this.client.delete<string>(this.registrationUrl + '/' + email + '/' +eventId, {headers: headers, observe: 'response'})
        .pipe(catchError(onErrorCallback));
    });
  }


  private async buildHeaders(): Promise<HttpHeaders> {
    let headers = new HttpHeaders();
    return this.authService.getAuthToken().then(token => {
      if(token !== '') headers = headers.set('Authorization', token);
    }).then(() => {
      return headers.set("Content-Type", "application/json");
    });
  }

}

