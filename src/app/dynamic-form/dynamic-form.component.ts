import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { RegistrationService } from '../service/registration.service';
import { Event } from '../model/event';
import { Registration } from '../model/registration';
import { ActivatedRoute } from '@angular/router';
import { Answer } from '../model/answer';

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
    console.error(this.event);
    this.regForm = new FormGroup({});
    this.regForm.addControl("email", new FormControl("", [Validators.required, Validators.email]));

    this.event.options.forEach(o => {
      let optionForm = {};
      switch (o.optionType) {
        case "multiOption":
          for (let str of o.queryString.split(',')) {
            optionForm[str] = [false, []];
          }
          break;
        case "oneOption":  
        case "freeText":
          optionForm["value"] = ['', []];
          break;
      }
      let optionValuesGroup: FormGroup = this.formBuilder.group(optionForm);
      let optionDefGroup: FormGroup = new FormGroup({});
      optionDefGroup.addControl("values", optionValuesGroup);
      optionDefGroup.addControl("optionType", new FormControl(o.optionType,[]));
      //optionForm["optionType"] = [o.optionType,[]];
      this.regForm.addControl(String(o.optionId), optionDefGroup);
    });
    //this.regForm = this.formBuilder.group(group);
  }


  onSubmit() {
    this.payLoad = JSON.stringify(this.regForm.value);
    let payLoadObj = JSON.parse(this.payLoad);
    console.error(payLoadObj);
    let keys = Object.keys(payLoadObj);
    let registration: Registration = {
      eventId: this.activatedRoute.snapshot.params.eventId,
      participant: {email: payLoadObj["email"],
      answers: []},
    };
    
    keys.forEach(key => {
      if(key != "email") {
        let choice = payLoadObj[key];
        let optionType = choice["optionType"];
        let values = choice["values"];
        let answer: Answer;
        switch(optionType) {
          case "oneOption":
          case "freeText":
            answer = { optionId: Number(key),
            value: values["value"]
            };
            break;
          case "multiOption":
            let vals = Object.keys(values);
            let str = "";
            vals.forEach(v => {
              if(values[v]){
                if(str != "") str += ",";
                str += v;
              }
            });
            answer = { optionId: Number(key),
              value: str
              };
            break;
        }
        registration.participant.answers[registration.participant.answers.length] = answer;
      }
    });
    console.error(registration);
/*
    const registration: Registration = {
      eventId: this.activatedRoute.snapshot.params.eventId,
      participant: {email: this.regForm.get('email').value,
      answers:  [{}]
      }};
      */
  }
}
