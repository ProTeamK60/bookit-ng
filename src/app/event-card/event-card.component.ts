import { Component, Input, OnInit } from '@angular/core';
import { Event } from '../model/event';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {
  @Input() event: Event;
  baseUrl: string = window.location.origin + '/events/';
  expand: boolean = false;
  descOverflow: boolean = null;

  constructor(private router: Router) {
  }


  ngOnInit() {
  }

  copyToClipboard(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

  goToPath(pagename: string, parameter: string) {
    this.router.navigate([pagename, parameter]);
  }

  applyCss() {
    if (this.descOverflow === null) {
      let div = document.getElementById(this.event.eventId);
      if (div !== null && div.innerText !== null && div.innerText !== '') {
        this.descOverflow = div.offsetHeight < div.scrollHeight;
      }
    }
    return {fadeOut: !this.expand && this.descOverflow, containerExpand: this.expand }
  }

}
