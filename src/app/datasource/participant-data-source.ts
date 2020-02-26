import {Participant} from '../model/participant';
import {DataSource, CollectionViewer} from '@angular/cdk/collections';
import {Observable, BehaviorSubject} from 'rxjs';
import {RegistrationService} from '../service/registration.service';
import { HttpErrorResponse } from '@angular/common/http';

export class ParticipantDataSource implements DataSource<Participant> {
  private participantSubject = new BehaviorSubject<Participant[]>([]);

  constructor(private registrationService: RegistrationService) {
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.participantSubject.complete();
  }

  connect(collectionViewer: CollectionViewer): Observable<Participant[] | readonly Participant[]> {
    return this.participantSubject.asObservable();
  }

  loadParticipants(eventId: string) {
    this.registrationService.findParticipantsByEventId(eventId, this.onError)
    .then(response => response.subscribe(participants => this.participantSubject.next(participants)));
  }

  private onError = (error: HttpErrorResponse) => {
    console.error(error.error);
    return new Observable<never>();
  };

}
