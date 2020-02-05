import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EventService } from '../service/event.service';
import { Router } from '@angular/router';
import { Option } from '../model/option';
import { NoneComponent} from 'angular2-json-schema-form';
import { Event } from '../model/event';
@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.scss']
})
export class EventCreateComponent implements OnInit {
  today = new Date();
  hours: number[] = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
  minutes: number[] = [0,5,10,15,20,25,30,35,40,45,50,55];
  eventForm = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    eventStart: ['', Validators.required],
    eventStartHour: ['', Validators.required],
    eventStartMinute: ['', Validators.required],
    eventEndHour: ['', Validators.required],
    eventEndMinute: ['', Validators.required],
    deadlineRVSPHour: [''],
    deadlineRVSPMinute: [''],
    eventEnd: ['', Validators.required],
    deadlineRVSP: [''],
    location: [''],
    organizer: [''],
    maxNumberOfApplicants: ['']
  });
  public breakpoint: number;
  widget = {
    submit: NoneComponent
  }
  optionsForm;
  optionsSchema = {
    "type": "object",

    "properties": {
      "options": {
        "type": "array",
        "expandable": true,
        "expanded": false,
        "items": {
          "$ref": "#/definitions/option"
        }
      }
    },
    "definitions": {
      "option": {
        "type": "object",

        "properties": {
          "optionType": {
            "type": "string",
            "enum": ["oneOption", "multiOption", "freeText", "singleLine"]
          },
          "title": {
            "type": "string"
          },
          "queryString": {
            "type": "string"
          },
          "required": {
            "type": "boolean"
          }
        },
        "if": {
          "properties": {
            "optionType": {
              "const": "multiOption"
            }
          }
        },
        "then": {
          "properties": {
            "value": {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          },
          "required": ["optionType", "title", "queryString"]
        },
        "else": {
          "properties": {
            "value": {
              "type": "string"
            }
          },
          "required": ["optionType", "title"]
        }
      }
    },
    "required": ["options"]

  };

  constructor(private eventService: EventService,
              private fb: FormBuilder,
              private router: Router) {
  }


  ngOnInit() {
    for(let control of ['eventEnd', 'eventEndHour', 
    'eventEndMinute', 'deadlineRVSP', 'deadlineRVSPHour', 
    'deadlineRVSPMinute']) {
      this.eventForm.controls[control].disable();
    }
    // split the grid depending on the screen width
    this.breakpoint = (window.innerWidth <= 500) ? 1 : 3;
  }
  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 500) ? 1 : 3;
  }

  OnEventStartChange() {
    for(let control of ['eventEnd', 'eventEndHour', 
    'eventEndMinute', 'deadlineRVSP', 'deadlineRVSPHour', 
    'deadlineRVSPMinute']) {
      this.enableDisable(control);
    }
    
  }

  private enableDisable(controlName: string) {
    let control = this.eventForm.controls[controlName];
    if(this.eventForm.controls['eventStart'].valid) {
      control.enable();
    }
    else{
      control.disable();
    }
    control.setValue('');
    control.markAsPristine();
    control.markAsUntouched();
  } 

  onOptionsChange(optionsForm) {
    this.optionsForm = optionsForm.options;
  }

  onSubmit() {
    let submittedEvent = this.submitEventForm();
    this.eventService.createOrUpdate(submittedEvent).subscribe((data) => {
      let s = data.headers.get('location').split('/');
      this.router.navigateByUrl('/events/' + s[s.length - 1]);
    });
  }

  private submitEventForm(): Event {
    let eventStart: string = this.eventForm.get('eventStart').value;
    let eventStartHour: number = this.eventForm.get('eventStartHour').value;
    let eventStartMin: number = this.eventForm.get('eventStartMinute').value;
    let eventEndHour: number = this.eventForm.get('eventEndHour').value;
    let eventEndMin: number = this.eventForm.get('eventEndMinute').value;
    let deadlineRVSPHour: number = this.eventForm.get('deadlineRVSPHour').value;
    let deadlineRVSPMin: number = this.eventForm.get('deadlineRVSPMinute').value;
    
    let eventEnd: string = this.eventForm.get('eventEnd').value;
    let deadlineRVSP: string = this.eventForm.get('deadlineRVSP').value;
    if(deadlineRVSP === '') deadlineRVSP = eventStart;

    let options: Option[] = [];
    for(let option of this.optionsForm) {
      options[options.length] = {
        optionId: options.length,
        title: option.title,
        optionType: option.optionType,
        queryString: option.queryString,
        required: option.required
      };
    }

    return {
      eventId: '',
      name: this.eventForm.get('name').value,
      description: this.eventForm.get('description').value,
      eventStart: (eventStart !== '' ? this.dateToMilliseconds(eventStart, eventStartHour, eventStartMin) : undefined),
      eventEnd: (eventEnd !== '' ? this.dateToMilliseconds(eventEnd, eventEndHour, eventEndMin) : undefined),
      deadlineRVSP: (deadlineRVSP !== '' ? this.dateToMilliseconds(deadlineRVSP, deadlineRVSPHour, deadlineRVSPMin) : undefined),
      location: this.eventForm.get('location').value,
      organizer: this.eventForm.get('organizer').value,
      options: options,
      maxNumberOfApplicants: this.eventForm.get('maxNumberOfApplicants').value
    };

  }

  isValid(): boolean {
    if (!this.eventForm.valid) return false;
    for (let option of this.optionsForm) {
      if (!this.validateOption(option)) return false;
    }
    return true;
  }

  private validateOption(option: Option): boolean {
    if (option.title !== undefined && option.title.trim() === '') {
      return false;
    }
    if (option.optionType === 'oneOption' || option.optionType === 'multiOption') {
      if (option.queryString === undefined) return false;
      let entries: String[] = option.queryString.split(",");
      for (let entry of entries) {
        if (this.countEntries(entries, entry) > 1) {
          return false;
        }
      }
    }
    return true;
  }

  private countEntries(list: String[], entry: String): number {
    let count: number = 0;
    list.forEach(item => {
      if (item.toLowerCase() === entry.toLowerCase()) {
        count++;
      }
    });
    return count;
  }

  private dateToMilliseconds(date: string, hour: number, min: number): number {
    let dateTime: Date = new Date(date);
    dateTime.setHours(hour);
    dateTime.setMinutes(min);
    return dateTime.getTime();
  }

}
