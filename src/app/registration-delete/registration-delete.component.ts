import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { RegistrationService } from '../service/registration.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-registration-delete',
  templateUrl: './registration-delete.component.html',
  styleUrls: ['./registration-delete.component.scss']
})
export class RegistrationDeleteComponent implements OnInit {

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
    const email: string = this.regForm.get('email').value;
    const eventId: string = this.activatedRoute.snapshot.params.eventId;

    this.registrationService.deleteRegistration(email, eventId)
      .pipe(
        catchError(err => {
          this.snackBar.open(err, 'Dismiss', {duration: 5000});
          return throwError(err);
        })).subscribe(
      _ => {
        console.log('Successfully removed registration in backend');
        this.snackBar.open('Unregistration successful', 'Ok', {duration: 5000});
      }
    );
  }

}
