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
    return this.client.get<Event>(this.eventsUrl + '/' + eventId, {headers: this.buildHeaders()});
  }

  public findAllEvents(): Observable<Event[]> {
    return this.client.get<Event[]>(this.eventsUrl, {headers: this.buildHeaders()});
  }

  public createOrUpdate(event: Event): Observable<HttpResponse<Event>> {
    return this.client.post<any>(this.eventsUrl, event, {observe: 'response'});
  }

  private buildHeaders() {
    const idToken = localStorage.getItem('id_token');
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json");
    if(idToken !== null) {
      headers = headers.set("Authorization", idToken);
    }
    return headers;
  }

}
