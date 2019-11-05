import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormsModule, NgForm, Validators} from '@angular/forms';
import { EventService } from '../service/event.service';
import { Event } from '../model/event'

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.scss']
})
export class EventCreateComponent implements OnInit {

  /*eventForm = new FormGroup(
    {
      name: new FormControl(''),
      description: new FormControl(''),
      eventStart: new FormControl(''),
      eventEnd: new FormControl(''),
      deadlineRVSP: new FormControl(''),
      location: new FormControl(''),
      organizer: new FormControl('')
    }
  );*/

  eventForm = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    eventStart: ['', Validators.required],
    eventEnd: ['', Validators.required],
    deadlineRVSP: ['',],
    location: [''],
    organizer: ['']
  });

  dateLessThan(from: string, to: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let f = group.controls[from];
      let t = group.controls[to];
      if (f.value > t.value) {
        return {
          dates: "Event start date should be earlier than Event end date"
        };
      }
      return {};
    }
  }

  constructor(private eventService: EventService, private fb: FormBuilder) { }

  ngOnInit() {
  }

  onSubmit() {
    console.warn(this.eventForm.value);
  }

}
