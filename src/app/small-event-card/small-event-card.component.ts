import { Component, OnInit, Input } from '@angular/core';
import { Event } from '../model/event';
import { Router } from '@angular/router';

@Component({
  selector: 'small-event-card',
  templateUrl: './small-event-card.component.html',
  styleUrls: ['./small-event-card.component.scss']
})
export class SmallEventCardComponent implements OnInit {
 @Input() event : Event;
  constructor(private router : Router) { }

  ngOnInit() {
  }

  goToPath(pagename: string, parameter: string) {
    this.router.navigate([pagename, parameter]);
  }

  now() : number {
    return new Date().getTime();
  }

}
