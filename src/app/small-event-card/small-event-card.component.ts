import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Event } from '../model/event';
import { Router } from '@angular/router';

@Component({
  selector: 'small-event-card',
  templateUrl: './small-event-card.component.html',
  styleUrls: ['./small-event-card.component.scss']
})
export class SmallEventCardComponent implements OnInit {
  @Input() event: Event;
  constructor(private router: Router) { }

  DAY_IN_MILLIS: number = 86400000;
  HOUR_IN_MILLIS: number = 3600000;
  MIN_IN_MILLIS: number = 60000;
  statusText: string;
  
  ngOnInit() {
    setInterval(() => {this.setStatusText()}, 1000);
  }


  goToPath(pagename: string, parameter: string) {
    this.router.navigate([pagename, parameter]);
  }

  now(): number {
    return new Date().getTime();
  }

  setStatusText(): void {
    if (this.now() < this.event.deadlineRVSP && this.event.deadlineRVSP - this.now() >= this.DAY_IN_MILLIS) {
      this.statusText = ((this.event.deadlineRVSP - this.now()) / this.DAY_IN_MILLIS).toFixed(0) + " days left"
    }
    else if (this.now() < this.event.deadlineRVSP && this.event.deadlineRVSP - this.now() >= this.HOUR_IN_MILLIS && this.event.deadlineRVSP - this.now() < this.DAY_IN_MILLIS) {
      this.statusText = ((this.event.deadlineRVSP - this.now()) / this.HOUR_IN_MILLIS).toFixed(0) + " hours left";
    }
    else if (this.now() < this.event.deadlineRVSP && this.event.deadlineRVSP - this.now() < this.HOUR_IN_MILLIS) {
      this.statusText = ((this.event.deadlineRVSP - this.now()) / this.MIN_IN_MILLIS).toFixed(0) + " minutes left";
    } else{
      this.statusText = "Registration closed";
    }
  }

}
