import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Event} from '../model/event';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EventService {

  private eventsUrl: string;

  constructor(private client: HttpClient) {
    this.eventsUrl = 'http://localhost:8080/api/v1/events/';
  }

  public findById(id: number, realShit: boolean): Observable<Event> {
    if (realShit) {
      return this.client.get<Event>(this.eventsUrl + id);
    } else {
      const event: Event = {
        id: id,
        name: 'Konferens 2020',
        description: 'VA',
        eventStart: new Date('2020-03-20'),
        eventEnd: new Date('2020-03-21'),
        deadlineRSVP: new Date('2020-03-10'),
        location: 'Sierra Nevada motherfucker',
        organizer: 'Knowit'
      };
      return of(event);
    }
  }
}
