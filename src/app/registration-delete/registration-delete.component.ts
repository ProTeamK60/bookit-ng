import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationService } from '../service/registration.service';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-registration-delete',
  templateUrl: './registration-delete.component.html',
  styleUrls: ['./registration-delete.component.scss']
})
export class RegistrationDeleteComponent implements OnInit {

  constructor(private registrationService: RegistrationService,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private snackBar: MatSnackBar,
              private router : Router) {
  }

  regForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]]
  });

  ngOnInit() {
  }

  onSubmit() {
    const email: string = this.regForm.get('email').value;
    const eventId: string = this.activatedRoute.snapshot.params.eventId;

    this.registrationService.deleteRegistration(email, eventId, this.onError)
      .then(response => {
        response.subscribe(
          _ => {
            this.snackBar.open('Unregistration successful', 'Ok', {duration: 5000});
          this.router.navigateByUrl('/events/' + this.activatedRoute.snapshot.params.eventId);
          }
        );
      });
  }

  private onError = (error: HttpErrorResponse) => { this.snackBar.open(error.error, 'Dismiss', {duration: 5000}); return new Observable<never>();};

}
