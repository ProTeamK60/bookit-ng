import {Component, OnInit} from '@angular/core';
import {Observable, Subject, throwError} from 'rxjs';
import {EventService} from '../service/event.service';
import {Event} from '../model/event';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  error$: Subject<Error> = new Subject<Error>();
  events$: Observable<Event[]>;

  constructor(private eventService: EventService) {
  }

  ngOnInit() {
    this.events$ = this.eventService.findAllEvents().pipe(
      catchError(err => {
          this.error$.next(err);
          return throwError(err);
        }
      )
    );
  }

}
