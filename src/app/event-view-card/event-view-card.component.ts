import { Component, OnInit, Input } from '@angular/core';
import { Event } from '../model/event';
import { Router } from '@angular/router';

@Component({
  selector: 'event-view-card',
  templateUrl: './event-view-card.component.html',
  styleUrls: ['./event-view-card.component.scss']
})
export class EventViewCardComponent implements OnInit {

  @Input() event: Event;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToPath(pagename: string, parameter: string) {
    this.router.navigate([pagename, parameter]);
  }  

}
