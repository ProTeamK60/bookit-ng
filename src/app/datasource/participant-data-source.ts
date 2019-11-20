
import { Participant } from '../model/participant';
import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { Observable, BehaviorSubject } from 'rxjs';
import { RegistrationService } from '../service/registration.service';


export class ParticipantDataSource implements DataSource<Participant> {


	private participantSubject = new BehaviorSubject<Participant[]>([]);

	constructor(private registrationService: RegistrationService) {
	}

	disconnect(collectionViewer: CollectionViewer): void {
		this.participantSubject.complete();

	}

	connect(collectionViewer: CollectionViewer): Observable<Participant[] | readonly Participant[]> {
		return this.participantSubject.asObservable();
		//throw new Error("Method not implemented.");
	}

	loadParicipants(eventId: string) {
		this.registrationService.findParticipantsByEventId(eventId).
			subscribe(participants => this.participantSubject.next(participants));
	}


}
