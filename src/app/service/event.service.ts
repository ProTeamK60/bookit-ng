import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../model/event';
import { environment } from '../../environments/environment';
import { Auth } from 'aws-amplify';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class EventService {
  private readonly eventsUrl: string;

  constructor(private client: HttpClient, private authService: AuthService) {
    this.eventsUrl = environment.eventServiceAddress + '/api/v1/events';
  }

  public findById(eventId: string, onErrorCallback: (error: HttpErrorResponse) => Observable<never>): Promise<Observable<Event>> {
    return this.buildHeaders().then(headers => {
      return this.client.get<Event>(this.eventsUrl + '/' + eventId, { headers: headers })
        .pipe(catchError(onErrorCallback));
    });
  }

  public findAllEvents(onErrorCallback: (error: HttpErrorResponse) => Observable<never>): Promise<Observable<Event[]>> {
    return this.buildHeaders()
      .then(headers => {
        return this.client.get<Event[]>(this.eventsUrl, { headers: headers })
          .pipe(catchError(onErrorCallback));
      });
  }

  public createOrUpdate(event: Event, onErrorCallback: (error: HttpErrorResponse) => Observable<never>): Promise<Observable<HttpResponse<Event>>> {
    return this.buildHeaders().then(headers => {
      return this.client.post<any>(this.eventsUrl, event, { headers: headers, observe: 'response' })
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
