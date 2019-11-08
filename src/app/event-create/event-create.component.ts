import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormsModule, NgForm, Validators } from '@angular/forms';
import { EventService } from '../service/event.service';
import { Event } from '../model/event'
import { group } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.scss']
})
export class EventCreateComponent implements OnInit {
  minEventStart = Date.now();
  eventEndFilter = (d: Date): boolean => { return this.eventForm.controls['eventStart'].value <= d; };

  eventForm = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    eventStart: ['', Validators.required],
    eventEnd: ['', Validators.required],
    deadlineRVSP: ['',],
    location: [''],
    organizer: ['']
  });

  constructor(private eventService: EventService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
  }

  OnEventStartChange() {
    this.eventForm.controls['eventEnd'].setValue('');
  }

  onSubmit() {
    console.warn(this.eventForm.value);

    let event = {
      eventId: '',
      name: this.eventForm.get('name').value,
      description: this.eventForm.get('description').value,
      eventStart:  (this.eventForm.get('eventStart').value as Date).getTime(),
      eventEnd: (this.eventForm.get('eventEnd').value as Date).getTime(),
      deadlineRVSP: (this.eventForm.get('deadlineRVSP').value as Date).getTime(),
      location: this.eventForm.get('location').value,
      organizer: this.eventForm.get('organizer').value
    };

    console.log(event);

    this.eventService.createOrUpdate(event).subscribe((data) => {  
      
      let s = data.headers.get('location').split("/"); this.router.navigateByUrl('/events/' + s[s.length-1]) });
  }

}
