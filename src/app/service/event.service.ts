import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../model/event'
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EventService {

  constructor() { }

  public findById(id: number): Observable<Event> {
      //return this.http.get<User[]>(this.usersUrl);
    let event:Event = {
      id:id, 
      name: 'Konferens 2020',
      description: 'VA',
      eventStart: new Date('2020-03-20'),
      eventEnd: new Date('2020-03-21'),
      deadlineRSVP: new Date('2020-03-10'),
      location: "Sierra Nevada motherfucker",
      organizer: "Knowit" 
    };
    
    return of(event);
    
  }
}
