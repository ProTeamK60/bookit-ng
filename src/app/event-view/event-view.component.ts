import { Component, OnInit } from '@angular/core';
import { EventService } from '../service/event.service';
import { Event } from '../model/event'
import {Observable} from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.css']
})
export class EventViewComponent implements OnInit {
  event$: Observable<Event>;

  constructor(private eventService: EventService, private activatedRoute: ActivatedRoute ) { }

  ngOnInit() {
    const eventId = this.activatedRoute.snapshot.params['id'];
    this.event$ = this.eventService.findById(eventId);
  }

}
