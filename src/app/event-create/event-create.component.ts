import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EventService } from '../service/event.service';
import { Router } from '@angular/router';
import { Option } from '../model/option';
import { NoneComponent} from 'angular2-json-schema-form';
import { Event } from '../model/event';
import { Storage } from 'aws-amplify';
import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, never } from 'rxjs';
@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.scss']
})
export class EventCreateComponent implements OnInit {
  eventStartMinute: string;
  eventEndMinute: string;
  eventStartHour: string;
  eventEndHour: string;
  eventEndHourMin: string;
  today = new Date();

  eventForm = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    eventStart: ['', Validators.required],
    eventStartHour: ['', Validators.required],
    eventStartMinute: [''],
    eventEndHour: ['', Validators.required],
    eventEndMinute: [''],
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
              private router: Router,
              private snackBar: MatSnackBar) {
  }
  /**
   * Photo processing starts here
   */

  showPhoto: boolean;
  userCreated: boolean;
  imageUrl: string;

  async onImageUploaded(e) {
    // save image id or path to the event detailes
    console.log('Image saved with url ' + e.key)
    this.imageUrl = e.key
  }
  onImagePicked(e) {
    // save image id or path to the event detailes
    console.log('Image picked ' + e.key)
    var fileExtension = '.' + e.target.files[0].name.split('.').pop();
    let key = Math.random().toString(36).substring(7) + new Date().getTime() + fileExtension;
   return Storage.put(key, e.target.files[0], {ContentType:'image/png', level:'public'})
     .then(result => {
       this.showPhoto =true;
       this.imageUrl = key;
       // get the image
       /*
       console.log ('' + Storage.get(key, {level:'public'})
         .then(result => {console.log('resutlt: ' + result); return true})
         .catch(error => {console.log(error.toString())}))

        */
       return true;
     })
     .catch(e =>{return false} )

 }


  editPhoto() {
    this.showPhoto = false;
  }

  getType(): string {
    return this.userCreated ? 'UpdateUser' : 'CreateUser';
  }

  async updateProfile() {
    console.log('in updateProfile.')
  }


  /**
   * Photo processign ends here
   */
  ngOnInit() {
    this.eventForm.get('eventStartMinute').setValue('00');
    this.eventForm.get('eventEndMinute').setValue('00');
    let h = (new Date()).getHours();
    this.eventForm.get('eventStartHour').setValue(h);
    this.eventForm.get('eventEndHour').setValue(h+1);
    for(let control of ['eventEnd', 'deadlineRVSP', 'deadlineRVSPHour',
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
    for(let control of ['eventEnd', 'deadlineRVSP',
    'deadlineRVSPHour', 'deadlineRVSPMinute']) {
      this.enableDisable(control);
    }

  }

  public createList(step: number, max: number): number[] {
    let l = [];
    let j = 0;
    for (let i = 0; i <= max; i = i + step) {
      if (i <10)
        l[j++] = '0'+i;
      else
        l[j++] = i;
    }
    return l;
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
    let hours: number[] = this.createList(1, 23);
    let minutes: number[] = this.createList(5,55);
    let submittedEvent = this.submitEventForm();
    this.eventService.createOrUpdate(submittedEvent, this.onError).then(response => {
      response.subscribe((data) => {
        let s = data.headers.get('location').split('/');
        this.router.navigateByUrl('/events/' + s[s.length - 1]);
      });
    });
  }

  private onError = (error: HttpErrorResponse) => {
    this.snackBar.open("Failed to create event. " + (error.error !== undefined ? error.error : ''), "Dismiss", {duration: 5000});
    return new Observable<never>();
  };

  private submitEventForm(): Event {
    let eventStart: string = this.eventForm.get('eventStart').value;
    let eventStartHour: number = this.eventForm.get('eventStartHour').value;
    let eventStartMin: number = this.eventForm.get('eventStartMinute').value == '' ? 0 : this.eventForm.get('eventStartMinute').value;
    let eventEnd: string = this.eventForm.get('eventEnd').value;
    let eventEndHour: number = this.eventForm.get('eventEndHour').value;
    let eventEndMin: number = this.eventForm.get('eventEndMinute').value == '' ? 0 : this.eventForm.get('eventEndMinute').value;
    let deadlineRVSP: string = this.eventForm.get('deadlineRVSP').value;
    let deadlineRVSPHour: number = this.eventForm.get('deadlineRVSPHour').value;
    let deadlineRVSPMin: number = this.eventForm.get('deadlineRVSPMinute').value;

    if(deadlineRVSP === '') {
      deadlineRVSP = eventStart;
      deadlineRVSPHour = eventStartHour;
      deadlineRVSPMin = eventStartMin;
    }
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
