import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Event} from '../model/event';
import {environment} from '../../environments/environment';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class EventService {
  private readonly eventsUrl: string;

  constructor(private client: HttpClient, private router: ActivatedRoute) {
    this.eventsUrl = environment.eventServiceAddress + '/api/v1/events';
  }

  public findById(eventId: string): Observable<Event> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization' : localStorage.getItem('id_token')
      })
    };
    return this.client.get<Event>(this.eventsUrl + '/' + eventId, httpOptions);
  }

  public findAllEvents(): Observable<Event[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization' : localStorage.getItem('id_token')
      })
    };
    return this.client.get<Event[]>(this.eventsUrl, httpOptions);
  }

  public createOrUpdate(event: Event): Observable<HttpResponse<Event>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization' : localStorage.getItem('id_token')
      })
    };

    console.log(this.eventsUrl, event, httpOptions);
    return this.client.post<any>(this.eventsUrl, event, {observe: 'response'});
  }

  private buildHeaders(): HttpHeaders {
    return new HttpHeaders();
  }
}
