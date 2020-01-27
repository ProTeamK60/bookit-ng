import {Component, OnInit} from '@angular/core';;
import {ActivatedRoute} from '@angular/router';
import {catchError} from 'rxjs/operators';
import { Observable} from 'rxjs';
import { EventService } from '../service/event.service';
import { Event } from '../model/event';
import {Subject, throwError} from 'rxjs';


@Component({
  selector: 'app-registration-create',
  templateUrl: './registration-create.component.html',
  styleUrls: ['./registration-create.component.scss'],
})
export class RegistrationCreateComponent implements OnInit {

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
