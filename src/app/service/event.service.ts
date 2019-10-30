import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Event} from '../model/event';
import {of} from 'rxjs';
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
}
