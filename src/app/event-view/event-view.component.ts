import { Component, OnInit } from '@angular/core';
import { EventService } from '../service/event.service';
import { Event } from '../model/event'
import {Observable} from 'rxjs';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.css']
})
export class EventViewComponent implements OnInit {
  event$: Observable<Event>;

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.event$ = this.eventService.findById('72ab7c8b-c0d5-4ab2-8c63-5cf1ad0b439b');
  }

}
