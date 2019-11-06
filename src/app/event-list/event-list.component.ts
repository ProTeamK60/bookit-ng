import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EventService } from '../service/event.service';
import {Event} from '../model/event';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  events$: Observable<Event[]>;

  constructor(private eventService: EventService ) { }

  ngOnInit() {
    this.events$ = this.eventService.findAllEvents();
  }

}
