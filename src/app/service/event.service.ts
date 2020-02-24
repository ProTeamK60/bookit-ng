import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Event} from '../model/event';
import {environment} from '../../environments/environment';
import { Auth } from 'aws-amplify';
import { ExpectedConditions } from 'protractor';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class EventService {
  private readonly eventsUrl: string;

  constructor(private client: HttpClient) {
    this.eventsUrl = environment.eventServiceAddress + '/api/v1/events';
  }

  public findById(eventId: string): Observable<Event> {
    return this.client.get<Event>(this.eventsUrl + '/' + eventId, {headers: null});
  }

  public findAllEvents(onErrorCallback): Promise<Observable<Event[]>> {
    return this.buildHeaders()
      .then(headers => {
        return this.client.get<Event[]>(this.eventsUrl, {headers: headers}).pipe(catchError(onErrorCallback));
      });
  }

  public createOrUpdate(event: Event): Observable<HttpResponse<Event>> {
    return this.client.post<any>(this.eventsUrl, event, {observe: 'response'});
  }

  private async buildHeaders(): Promise<HttpHeaders> {
    let headers = new HttpHeaders();

    return Auth.currentSession().then(res => {
      let token = res.getIdToken().getJwtToken();
      headers = headers.set('Authorization', token);
    }).then(() => {
      headers = headers.set("Content-Type", "application/json");   
      return headers;
    });
  }

}
