import { Component, OnInit } from '@angular/core';
import { EventService } from '../service/event.service';
import { Event } from '../model/event';
import {Observable, Subject, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.css']
})
export class EventViewComponent implements OnInit {
  error$: Subject<Error> = new Subject<Error>();
  event$: Observable<Event>;

  constructor(private eventService: EventService, private activatedRoute: ActivatedRoute ) { }

  ngOnInit() {
    const eventId = this.activatedRoute.snapshot.params.id;
    this.eventService.findById(eventId, this.onError)
      .then(response => {
         this.event$ = response;
      });
  }

  private onError = (err) => { 
    this.error$.next(err);
    return throwError(err);
  }

}
