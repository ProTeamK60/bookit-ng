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

  public findById(eventId: string, realShit: boolean): Observable<Event> {
    if (realShit) {
      return this.client.get<Event>(this.eventsUrl + eventId);
    } else {
      const event: Event = {
        id: 1,
        eventId: '72ab7c8b-c0d5-4ab2-8c63-5cf1ad0b439b',
        name: 'Konferens 2020',
        description: 'VA',
        eventStart: new Date('2020-03-20'),
        eventEnd: new Date('2020-03-21'),
        deadlineRVSP: new Date('2020-03-10'),
        location: 'Sierra Nevada motherfucker',
        organizer: 'Knowit'
      };
      return of(event);
    }
  }
}
