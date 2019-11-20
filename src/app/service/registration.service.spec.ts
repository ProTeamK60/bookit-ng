import { TestBed } from '@angular/core/testing';


import { RegistrationService } from './registration.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Registration } from '../model/registration';
import { environment } from '../../environments/environment';

describe('RegistrationService', () => {
	const registration: Registration = {
		eventId: '72ab7c8b-c0d5-4ab2-8c63-5cf1ad0b439b',
		participant: {
			email: 'kalle@ankeborg.se'
			} 
	};

	let httpMock: HttpTestingController;
	const REGISTRATION_URL = environment.registrationServiceAddress + '/api/v1/registrations';
	const PARTICIPANT_URL = environment.registrationServiceAddress + '/api/v1/participants';

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [RegistrationService]
		});
		httpMock = TestBed.get(HttpTestingController);
	}
	);

	it('should be created', () => {
		const service: RegistrationService = TestBed.get(RegistrationService);
		expect(service).toBeTruthy();
	});

	it('should return 201 created when posting correct registartion', () => {
		const service: RegistrationService = TestBed.get(RegistrationService);
		service.addRegistration(registration).subscribe(response => {
			expect(response.status).toEqual(201);
		});

		const addRegistrationRequest = httpMock.expectOne(REGISTRATION_URL);
		addRegistrationRequest.flush(null, { status: 201, statusText: 'Created' });
		httpMock.verify();
	});
	
	it('should return correct number of Participants when fetching participants for given event', () => {
		const service: RegistrationService = TestBed.get(RegistrationService);
		const eventId = registration.eventId;
		service.findParticipantsByEventId(eventId).subscribe(participants => {
			expect(participants.length).toEqual(2);
		});

		const addRegistrationRequest = httpMock.expectOne(PARTICIPANT_URL+'/event/'+eventId);
		addRegistrationRequest.flush( [{email: 'kalle@ankeborg.se'}, {email: 'kajsa@@ankeborg.se'}], { status: 200, statusText: 'Ok' });
		httpMock.verify();
	});
});
