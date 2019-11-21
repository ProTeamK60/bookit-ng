import {Component, OnInit} from '@angular/core';
import {Validators, FormBuilder} from '@angular/forms';
import {RegistrationService} from '../service/registration.service';
import {Registration} from '../model/registration';
import {ActivatedRoute} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-event-reg',
  templateUrl: './event-reg.component.html',
  styleUrls: ['./event-reg.component.scss']
})
export class EventRegComponent implements OnInit {

  constructor(private registrationService: RegistrationService,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private snackBar: MatSnackBar) {
  }

  regForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]]
  });

  ngOnInit() {
  }

  onSubmit() {
    const registration: Registration = {
      eventId: this.activatedRoute.snapshot.params.eventId,
      participant: {email: this.regForm.get('email').value},
    };

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

}
