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
}
