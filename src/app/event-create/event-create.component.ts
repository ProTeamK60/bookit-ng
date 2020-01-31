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
  eventForm = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    eventStart: ['', Validators.required],
    eventEnd: ['', Validators.required],
    deadlineRVSP: [''],
    location: [''],
    organizer: ['']
  });
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
            "enum": ["oneOption", "multiOption", "freeText"]
          },
          "title": {
            "type": "string"
          },
          "queryString": {
            "type": "string"
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
    this.eventForm.controls['eventEnd'].disable();
    this.eventForm.controls['deadlineRVSP'].disable();
  }

  OnEventStartChange() {
    let endDate = this.eventForm.controls['eventEnd'];
    let deadline = this.eventForm.controls['deadlineRVSP'];
    if (this.eventForm.controls['eventStart'].valid) {
      endDate.enable();
      deadline.enable();
    } else {
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
    let eventEnd: string = this.eventForm.get('eventEnd').value;
    let deadlineRVSP: string = this.eventForm.get('deadlineRVSP').value;

    let options: Option[] = [];
    for(let option of this.optionsForm) {
       options[options.length] = {
         optionId: options.length,
         title: option.title,
        optionType: option.optionType,
        queryString: option.queryString
      };
    }

    return {
      eventId: '',
      name: this.eventForm.get('name').value,
      description: this.eventForm.get('description').value,
      eventStart: (eventStart !== '' ? this.dateToMilliseconds(eventStart) : undefined),
      eventEnd: (eventEnd !== '' ? this.dateToMilliseconds(eventEnd) : undefined),
      deadlineRVSP: (deadlineRVSP !== '' ? this.dateToMilliseconds(deadlineRVSP) : undefined),
      location: this.eventForm.get('location').value,
      organizer: this.eventForm.get('organizer').value,
      options: options
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
  
  private dateToMilliseconds(date: string): number {
    return new Date(date).getTime();
  }
}
