import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { RegistrationService } from '../service/registration.service';
import { Registration } from '../model/registration';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { EventService } from '../service/event.service';
import { Event } from '../model/event';
import { Answer } from '../model/answer';

import { Subject, throwError } from 'rxjs';
import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { Option } from '../model/option';
import { TextareaComponent } from 'angular2-json-schema-form';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  @Input() event: Event;
  regForm: FormGroup;
  payLoad = '';

  constructor(private registrationService: RegistrationService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private eventService: EventService) { }

  ngOnInit() {
    let group = {};

    group['email'] = ['', [Validators.required, Validators.email]];

    this.event.options.forEach(o => {
      switch (o.optionType) {
        case "multiOption":
          for (let str of o.queryString.split(',')) {
            group[o.optionId + str] = ['', []];
          }
          break;
        case "oneOption":  
        case "freeText":
          group[o.optionId] = ['', []];
          break;
      }

    });
    this.regForm = this.formBuilder.group(group);
    console.error("Group: " +JSON.stringify(group));
  }


  onSubmit() {
    this.payLoad = JSON.stringify(this.regForm.value);
    console.error(this.payLoad);
  }
}
