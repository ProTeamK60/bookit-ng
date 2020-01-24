import {Component, OnInit, Input} from '@angular/core';
import {Validators, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {RegistrationService} from '../service/registration.service';
import {Registration} from '../model/registration';
import {ActivatedRoute} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {catchError} from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { EventService } from '../service/event.service';
import { Event } from '../model/event';
import { Answer } from '../model/answer';

import {Subject, throwError} from 'rxjs';
import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { Option } from '../model/option';
import { TextareaComponent } from 'angular2-json-schema-form';


@Component({
  selector: 'app-registration-create',
  templateUrl: './registration-create.component.html',
  styleUrls: ['./registration-create.component.scss'],
})
export class RegistrationCreateComponent implements OnInit {
  
  //@Input() questions: QuestionBase<any>[] = [];
  
  constructor(private activatedRoute: ActivatedRoute,
              private eventService: EventService) {
  }
  
  error$: Subject<Error> = new Subject<Error>();
  event$: Observable<Event>;
  
  ngOnInit() {
    const eventId = this.activatedRoute.snapshot.params.eventId;
    console.error("eventId: " +eventId);
  
    this.event$ = this.eventService.findById(eventId).pipe(
      catchError(err => {
          this.error$.next(err);
          return throwError(err);
        }
      )
    );
  
  }
/*
  printOption(o: Option) {
      switch (o.optionType) {
        case 'freeText':
          console.error("freeText " + o.optionId, o.queryString);
          let  aQ = this.questionService.getRadioButtonQuestion(o.queryString);
          this.regForm.addControl("freeText", new FormControl(aQ));
          
          break;
        case 'oneOption':
        case 'multiOption':
          for(let str of o.queryString.split(",")) {
            console.error("one or multiOption " + o.optionId, o.queryString);
            
            let  aQ = this.questionService.getRadioButtonQuestion(o.queryString);
            this.regForm.addControl("oneOption", new FormControl(aQ));
          
          }
          break;      
    };
    
  }

  onSubmit() {
    var idx=0;
    
    for (let value of Object.values(this.regForm.controls)) {
      
      console.error(value.enabled);
      idx++;  
    }

    console.error("idx: " +idx);

    const registration: Registration = {
      eventId: this.activatedRoute.snapshot.params.eventId,
      participant: {email: this.regForm.get('email').value,
      answers:  [{optionId: 1, value: "hejhopp"}]
      }};

    this.registrationService.addRegistration(registration)
      .pipe(
        catchError(err => {
          this.snackBar.open(err, 'Dismiss', {duration: 5000});
          return throwError(err);
        })).subscribe(
      _ => {
        console.log('Registration successfully created in backend');
        this.snackBar.open('Registration successful', 'Ok', {duration: 5000});
      }
    );
  }
*/
}
