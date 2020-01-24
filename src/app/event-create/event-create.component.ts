import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EventService} from '../service/event.service';
import {Router} from '@angular/router';
import {Option} from '../model/option';
import {Options} from '../model/options';

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

  constructor(private eventService: EventService, private fb: FormBuilder, private router: Router) {
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

  onSubmit() {
    console.warn(this.eventForm.value);
    console.warn(this.displayData);
    //let optionArray: Option[] = this.displayData.options;
    //console.warn('length:' +optionArray.length);
    
    const event = {
      eventId: '',
      name: this.eventForm.get('name').value,
      description: this.eventForm.get('description').value,
      eventStart: this.dateToMilliseconds(this.eventForm.get('eventStart').value),
      eventEnd: this.dateToMilliseconds(this.eventForm.get('eventEnd').value),
      deadlineRVSP: this.dateToMilliseconds(this.eventForm.get('deadlineRVSP').value),
      location: this.eventForm.get('location').value,
      organizer: this.eventForm.get('organizer').value,
      options: this.displayData.options
    };
    
    console.warn(event);
    
    this.eventService.createOrUpdate(event).subscribe((data) => {
      let s = data.headers.get('location').split('/');
      this.router.navigateByUrl('/events/' + s[s.length - 1]);
    });
  }

  private dateToMilliseconds(date: Date): number {
    return date.getTime();
  }
  
  
exampleSchema = {
  "type" : "object",
  
  "properties" : {
    /*
    "eventId" : {
      "type" : "integer"
    },*/
    "options" : {
      "type" : "array",
      "expandable": true,
      "expanded": false,
      "items" : {
        "$ref" : "#/definitions/option"
      }
    }
  },
  "definitions" : {
    "option" : {
      "type" : "object",
      "required" : [ "optionType", "optionId", "title", "queryString" ],
     
      "properties" : {
        "optionType" : {
          "type" : "string",
          "enum" : [ "oneOption", "multiOption", "freeText" ]
        },
        "optionId" : {
          "type" : "integer"
        },
        "title" : {
          "type" : "string"
        },
        "queryString" : {
          "type" : "string"
        }
      },
      "if" : {
        "properties" : {
          "optionType" : {
            "const" : "multiOption"
          }
        }
      },
      "then" : {
        "properties" : {
          "value" : {
            "type" : "array",
            "items" : {
              "type" : "string"
            }
          }
        }
      },
      "else" : {
        "properties" : {
          "value" : {
            "type" : "string"
          }
        }
      }
    }
  },
  "required" : ["options" ]

  };
  
  exampleData = {
    //'eventId': 1,
    //'option': {"optionType": "oneOption", "optionId":2, "queryString": "hejhopp"},
    };
    
  displayData: Options = null;

  exampleOnSubmitFn(formData) {
    this.displayData = formData;
  }
}
