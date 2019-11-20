import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Event} from '../model/event';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class EventService {
  private readonly eventsUrl: string;

  constructor(private client: HttpClient) {
    this.eventsUrl = environment.eventServiceAddress + '/api/v1/events';
  }

  public findById(eventId: string): Observable<Event> {
    return this.client.get<Event>(this.eventsUrl + '/' + eventId);
  }

  public findAllEvents(): Observable<Event[]> {
    return this.client.get<Event[]>(this.eventsUrl);
  }

  public createOrUpdate(event: Event): Observable<HttpResponse<Event>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    console.log(this.eventsUrl, event, httpOptions);
    return this.client.post<any>(this.eventsUrl, event, {observe: 'response'});
  }
}
