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
  today = new Date();

  eventForm = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    eventStart: ['', Validators.required],
    eventEnd: ['', Validators.required],
    deadlineRVSP: [''],
    location: [''],
    organizer: ['']
  });

  constructor(private eventService: EventService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.eventForm.controls['eventEnd'].disable();
    this.eventForm.controls['deadlineRVSP'].disable();
  }

  OnEventStartChange() {
    let endDate = this.eventForm.controls['eventEnd'];
    let deadline = this.eventForm.controls['deadlineRVSP'];
    if(this.eventForm.controls['eventStart'].valid)
    {
      endDate.enable();
      deadline.enable();
    }
    else
    {
      endDate.disable();
      deadline.disable();
    }
    endDate.setValue('');
    deadline.setValue('');
    endDate.markAsPristine();
    deadline.markAsPristine();
    endDate.markAsUntouched();
    deadline.markAsUntouched();
  }

  onSubmit() {
    console.warn(this.eventForm.value);

    this.eventService.createOrUpdate({
      eventId: '',
      name: this.eventForm.get('name').value,
      description: this.eventForm.get('description').value,
      eventStart: this.eventForm.get('eventStart').value,
      eventEnd: this.eventForm.get('eventEnd').value,
      deadlineRVSP: this.eventForm.get('deadlineRVSP').value,
      location: this.eventForm.get('location').value,
      organizer: this.eventForm.get('organizer').value
    }).subscribe((data) => {  let s = data.headers.get('location').split("/"); this.router.navigateByUrl('/events/' + s[s.length-1]) });
  }

}