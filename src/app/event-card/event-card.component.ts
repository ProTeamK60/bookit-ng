import {Component, Input, OnInit} from '@angular/core';
import { Event } from '../model/event';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {
  @Input() event: Event;
  baseUrl : string = window.location.origin + "/events/";
  constructor(private router: Router) { }

  ngOnInit() {
  }

  copyToClipboard(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

  goToPath(pagename:string, parameter: string) {
    this.router.navigate([pagename, parameter]);
  }

}
