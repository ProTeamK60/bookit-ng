import { TestBed } from '@angular/core/testing';

import { RegistrationService } from './registration.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Registration } from '../model/registration';
import { environment } from '../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

describe('RegistrationService', () => {
  const REGISTRATION: Registration = {
    eventId: '72ab7c8b-c0d5-4ab2-8c63-5cf1ad0b439b',
    participant: {
      email: 'kalle@ankeborg.se',
      answers: []
    }
  };

  const REGISTRATION_URL = environment.registrationServiceAddress + '/api/v1/registrations';
  const PARTICIPANT_URL = environment.registrationServiceAddress + '/api/v1/participants';

  let httpMock: HttpTestingController;
  let authServiceMock = jasmine.createSpyObj(['getAuthToken']);
  authServiceMock.getAuthToken.and.returnValue(Promise.resolve("test_token"));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        RegistrationService,
        {
          provide: AuthService,
          useValue: authServiceMock
        }
      ]
    });
    httpMock = TestBed.get(HttpTestingController);
  }
  );

  it('should be created', () => {
    const service: RegistrationService = TestBed.get(RegistrationService);
    expect(service).toBeTruthy();
  });

  describe('method addRegistration', async () => {
    it('should return 201 created when posting correct registration', async () => {
      const service: RegistrationService = TestBed.get(RegistrationService);
      const request = service.addRegistration(REGISTRATION, _ => { fail(); return new Observable<never>() })
        .then(res => res.subscribe(response => expect(response.status).toEqual(201)));

      await request;
      const addRegistrationRequest = httpMock.expectOne(REGISTRATION_URL);
      addRegistrationRequest.flush(null, { status: 201, statusText: 'Created' });
      httpMock.verify();
    });


    it('should return 409 Conflict if registration already exists', async () => {
      const service: RegistrationService = TestBed.get(RegistrationService);
      const responseMessage = `The participant is already registered for this event.`;

      const request = service.addRegistration(REGISTRATION, (error: HttpErrorResponse) => {
        expect(error.status).toEqual(409);
        expect(error.error).toEqual(responseMessage);
        return new Observable<never>();
      }).then(response => { response.subscribe(_ => fail()) });

      await request;
      const failedRequest = httpMock.expectOne(REGISTRATION_URL);
      failedRequest.flush(responseMessage, { status: 409, statusText: 'Conflict' });
      httpMock.verify();
    });

    it('should return 400 Bad Request in case of invalid registration', async () => {
      const service: RegistrationService = TestBed.get(RegistrationService);
      const invalidRegistration: Registration = {
        eventId: REGISTRATION.eventId,
        participant: { email: 'kalleatankeborg.se', answers: [] }
      };

      const request = service.addRegistration(invalidRegistration, (err: HttpErrorResponse) => {
        expect(err.status).toEqual(400);
        return new Observable<never>();
      })
      .then(response => response.subscribe(_ => fail() ));

      await request;
      const failedRequest = httpMock.expectOne(REGISTRATION_URL);
      failedRequest.flush('', { status: 400, statusText: 'Bad Request' });
      httpMock.verify();
    });
  });

  describe('method findParticipantsByEventId', () => {
    it('should return correct number of Participants if participants is found', async () => {
      const service: RegistrationService = TestBed.get(RegistrationService);
      const eventId = REGISTRATION.eventId;

      const request = service.findParticipantsByEventId(eventId, _ => {fail(); return null})
        .then(response => response.subscribe(participants => expect(participants.length).toEqual(2)));

      await request;

      const addRegistrationRequest = httpMock.expectOne(PARTICIPANT_URL + '/event/' + eventId);
      addRegistrationRequest.flush([{ email: 'kalle@ankeborg.se' }, { email: 'kajsa@ankeborg.se' }], { status: 200, statusText: 'Ok' });
      httpMock.verify();
    });

    it('should return 404 Not Found if no participants is found', async () => {
      const service: RegistrationService = TestBed.get(RegistrationService);
      const eventId = REGISTRATION.eventId;
      const responseMessage = `Participants for eventID ${eventId} not found!`;

      const request = service.findParticipantsByEventId(eventId, (err: HttpErrorResponse) => {
        expect(err.status).toEqual(404);
        expect(err.error).toEqual(responseMessage);
        return new Observable<never>();
      }).then(response => response.subscribe(_ => fail()));

      await request;

      const failedRequest = httpMock.expectOne(PARTICIPANT_URL + '/event/' + eventId);
      failedRequest.flush(responseMessage, { status: 404, statusText: 'Not Found' });
      httpMock.verify();
    });
  });

  describe('method deleteRegistration', () => {
    it('should return 204 No Content when delete registartion', async () => {
      const service: RegistrationService = TestBed.get(RegistrationService);
      const email = REGISTRATION.participant.email;
      const eventId = REGISTRATION.eventId;

      const request = service.deleteRegistration(email, eventId, _ => {fail();return null;})
      .then(response => response.subscribe(response => expect(response.status).toEqual(204)));

      await request;

      const deleteRegistrationRequest = httpMock.expectOne(REGISTRATION_URL + '/' + email + '/' + eventId);
      deleteRegistrationRequest.flush(null, { status: 204, statusText: 'No Content' });
      httpMock.verify();
    });
  });

});