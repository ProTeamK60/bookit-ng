import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, of} from 'rxjs';
import {Registration} from '../model/registration';
import {Participant} from '../model/participant';

@Injectable({
  providedIn: 'root'
})

export class RegistrationService {

  registrationUrl: string;
  participantsUrl: string;

  constructor(private client: HttpClient) {
    this.registrationUrl = environment.registrationServiceAddress + '/api/v1/registrations';
    this.participantsUrl = environment.registrationServiceAddress + '/api/v1/participants';
  }

  public addRegistration(registration: Registration): Observable<HttpResponse<string>> {
    console.log(this.registrationUrl, registration);
    return this.client.post<any>(this.registrationUrl, registration, {observe: 'response'});
  }

  public findParticipantsByEventId(eventId: string): Observable<Participant[]> {
    const url = this.participantsUrl + '/event/' + eventId;
    return this.client.get<Participant[]>(url);
  }

  public deleteRegistration(email: string, eventId: string): Observable<HttpResponse<string>> {
    const url = this.registrationUrl + '/' + email + '/' +eventId;
    return this.client.delete<string>(url, {observe: 'response'});
  }
}

