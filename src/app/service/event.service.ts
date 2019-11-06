import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError  } from 'rxjs';
import { Event } from '../model/event';
import { catchError, retry } from 'rxjs/operators'
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class EventService {
  private eventsUrl: string;

  constructor(private client: HttpClient) {
    this.eventsUrl = environment.eventServiceAddress + '/api/v1/events/';
  }

  public findById(eventId: string): Observable<Event> {
    return this.client.get<Event>(this.eventsUrl + eventId);
  }

  public createOrUpdate(event: Event): Observable<Event> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    console.log(this.eventsUrl, event, httpOptions);
    return this.client.post<Event>(this.eventsUrl, event, httpOptions);
  }
}
