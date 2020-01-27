import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RegistrationService } from '../service/registration.service';
import { Event } from '../model/event';
import { Registration } from '../model/registration';
import { ActivatedRoute } from '@angular/router';

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
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    let group = {};

    group['email'] = ['', [Validators.required, Validators.email]];

    this.event.options.forEach(o => {
      switch (o.optionType) {
        case "multiOption":
          for (let str of o.queryString.split(',')) {
            group[o.optionId + str] = [false, []];
          }
          break;
        case "oneOption":  
        case "freeText":
          group[o.optionId] = ['', []];
          break;
      }

    });
    this.regForm = this.formBuilder.group(group);
  }


  onSubmit() {
    this.payLoad = JSON.stringify(this.regForm.value);
    let payLoadObj = JSON.parse(this.payLoad);
    console.error(payLoadObj);
/*
    const registration: Registration = {
      eventId: this.activatedRoute.snapshot.params.eventId,
      participant: {email: this.regForm.get('email').value,
      answers:  [{}]
      }};
      */
  }
}
