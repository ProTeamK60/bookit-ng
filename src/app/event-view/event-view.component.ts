import { Component, OnInit } from '@angular/core';
import { EventService } from '../service/event.service';
import { Event } from '../model/event'

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.css']
})
export class EventViewComponent implements OnInit {

  event: Event;

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventService.findById(1).subscribe(data => {
      this.event = data;
    });
  }

}
