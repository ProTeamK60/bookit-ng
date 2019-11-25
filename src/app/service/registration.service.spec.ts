import { TestBed } from '@angular/core/testing';

import { RegistrationService } from './registration.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Registration } from '../model/registration';
import { environment } from '../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';

describe('RegistrationService', () => {
  const REGISTRATION: Registration = {
    eventId: '72ab7c8b-c0d5-4ab2-8c63-5cf1ad0b439b',
    participant: {
      email: 'kalle@ankeborg.se'
    }
  };

  const REGISTRATION_URL = environment.registrationServiceAddress + '/api/v1/registrations';
  const PARTICIPANT_URL = environment.registrationServiceAddress + '/api/v1/participants';

  let httpMock: HttpTestingController;

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

  describe('method addRegistration', () => {
    it('should return 201 created when posting correct registration', () => {
      const service: RegistrationService = TestBed.get(RegistrationService);
      service.addRegistration(REGISTRATION).subscribe(response => {
        expect(response.status).toEqual(201);
      });

      const addRegistrationRequest = httpMock.expectOne(REGISTRATION_URL);
      addRegistrationRequest.flush(null, { status: 201, statusText: 'Created' });
      httpMock.verify();
    });

    it('should return 409 Conflict if registration already exists', () => {
      const service: RegistrationService = TestBed.get(RegistrationService);
      const responseMessage = `The participant is already registered for this event.`;

      service.addRegistration(REGISTRATION).subscribe(
        _ => fail(),
        (err: HttpErrorResponse) => {
          expect(err.status).toEqual(409);
          expect(err.error).toEqual(responseMessage);
        }
      );

      const request = httpMock.expectOne(REGISTRATION_URL);
      request.flush(responseMessage, { status: 409, statusText: 'Conflict' });
      httpMock.verify();
    });

    it('should return 400 Bad Request in case of invalid registration', () => {
      const service: RegistrationService = TestBed.get(RegistrationService);
      const invalidRegistration: Registration = {
        eventId: REGISTRATION.eventId,
        participant: { email: 'kalleatankeborg.se' }
      };

      service.addRegistration(invalidRegistration).subscribe(
        _ => fail(),
        (err: HttpErrorResponse) => {
          expect(err.status).toEqual(400);
        }
      );

      const request = httpMock.expectOne(REGISTRATION_URL);
      request.flush('', { status: 400, statusText: 'Bad Request' });
      httpMock.verify();
    });
  });

  describe('method findParticipantsByEventId', () => {
    it('should return correct number of Participants if participants is found', () => {
      const service: RegistrationService = TestBed.get(RegistrationService);
      const eventId = REGISTRATION.eventId;
      service.findParticipantsByEventId(eventId).subscribe(participants => {
        expect(participants.length).toEqual(2);
      });

      const addRegistrationRequest = httpMock.expectOne(PARTICIPANT_URL + '/event/' + eventId);
      addRegistrationRequest.flush([{ email: 'kalle@ankeborg.se' }, { email: 'kajsa@ankeborg.se' }], { status: 200, statusText: 'Ok' });
      httpMock.verify();
    });

    it('should return 404 Not Found if no participants is found', () => {
      const service: RegistrationService = TestBed.get(RegistrationService);
      const eventId = REGISTRATION.eventId;
      const responseMessage = `Participants for eventID ${eventId} not found!`;

      service.findParticipantsByEventId(eventId).subscribe(
        _ => fail(),
        (err: HttpErrorResponse) => {
          expect(err.status).toEqual(404);
          expect(err.error).toEqual(responseMessage);
        }
      );

      const request = httpMock.expectOne(PARTICIPANT_URL + '/event/' + eventId);
      request.flush(responseMessage, { status: 404, statusText: 'Not Found' });
      httpMock.verify();
    });
  });

  describe('method deleteRegistration', () => {
    it('should return 204 No Content when delete registartion', () => {
      const service: RegistrationService = TestBed.get(RegistrationService);
      const email = REGISTRATION.participant.email;
      const eventId = REGISTRATION.eventId;
      service.deleteRegistration(email, eventId).subscribe(response => {
        expect(response.status).toEqual(204);
      });

      const deleteRegistrationRequest = httpMock.expectOne(REGISTRATION_URL +'/' + email + '/' +eventId);
      deleteRegistrationRequest.flush(null, { status: 204, statusText: 'No Content' });
      httpMock.verify();
    });
  });

});
