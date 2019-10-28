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
    let event = {id:id, name: 'Konferens 2020'};
    return of(event);
    }
}
