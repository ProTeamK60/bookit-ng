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
  expand: boolean = false;
  descriptionOverflow: boolean = null;
  
  constructor(private router: Router) { }

  ngOnInit() {
  }

  applyCss() {
    if (this.descriptionOverflow === null) {
      let div = document.getElementById("description");
      if (div !== null && div.innerText !== null && div.innerText !== '') {
        this.descriptionOverflow = div.offsetHeight < div.scrollHeight;
      }
    }
    return {fadeOut: !this.expand && (this.descriptionOverflow === null ? true : this.descriptionOverflow), descriptionExpand: this.expand }
  }

  goToPath(pagename: string, parameter: string) {
    this.router.navigate([pagename, parameter]);
  }  

}
