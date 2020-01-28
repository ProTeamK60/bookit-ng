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

  constructor(private registrationService: RegistrationService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.regForm = new FormGroup({});
    this.regForm.addControl("email", new FormControl("", [Validators.required, Validators.email]));

    this.event.options.forEach(o => {
      let optionForm = {};
      if(o.optionType === "multiOption") {
          o.queryString.split(",").forEach(query => optionForm[query] = [false, []]);
      } else {
          optionForm["value"] = ['', []];
      }
      let optionDefGroup: FormGroup = new FormGroup({});
      optionDefGroup.addControl("values", this.formBuilder.group(optionForm));
      optionDefGroup.addControl("optionType", new FormControl(o.optionType,[]));
      this.regForm.addControl(String(o.optionId), optionDefGroup);
    });
  }


  onSubmit() {
    let formValues = this.regForm.value;
    let keys = Object.keys(formValues);
    let registration: Registration = {
      eventId: this.activatedRoute.snapshot.params.eventId,
      participant: {email: formValues["email"],
      answers: []},
    };
    
    keys.forEach(key => {
      if(key != "email") {
        let choice = formValues[key];
        let values = choice["values"];
        let answerValue: string;
        if(choice["optionType"] === "multiOption") {
          answerValue = Object.keys(values).filter(v => values[v]).join(",");
        }else {
          answerValue = values["value"];
        }
        registration.participant.answers[registration.participant.answers.length] = {optionId: Number(key), value: answerValue};
      }
    });
    console.error(registration);
  }
}
