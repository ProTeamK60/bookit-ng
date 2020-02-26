import { TestBed, async } from '@angular/core/testing';

import { EventService } from './event.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Event } from '../model/event';
import { environment } from '../../environments/environment';
import { MatFormFieldModule } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';


describe('EventService', () => {
  const MOCK_EVENT: Event = {
    eventId: '72ab7c8b-c0d5-4ab2-8c63-5cf1ad0b439b',
    name: 'Konferens',
    description: 'Konferens för Knowit 2020',
    eventStart: 90000000,
    eventEnd: 90060000,
    deadlineRVSP: 64800000,
    location: 'Sierra Nevada',
    organizer: 'Susanne',
    options: [],
    maxNumberOfApplicants: 1
  };
  let httpMock: HttpTestingController;
  const URL = environment.eventServiceAddress + '/api/v1/events/';

  let authServiceMock = jasmine.createSpyObj(['getAuthToken']);
  authServiceMock.getAuthToken.and.returnValue(Promise.resolve("abc123"));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
        MatFormFieldModule],
      providers: [
        EventService,
        {
          provide: ActivatedRoute, useValue: {
            snapshot: of({ params: of({ id: 'test', eventId: 'eventId' }) })
          }
        },
        {
          provide: AuthService, 
          useValue: authServiceMock
        },
      ]
    });

    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: EventService = TestBed.get(EventService);
    expect(service).toBeTruthy();
  });

  it('should return event with correct id', async () => {
    const service: EventService = TestBed.get(EventService);
    const request = service.findById('72ab7c8b-c0d5-4ab2-8c63-5cf1ad0b439b', (error: HttpErrorResponse) => {return null;})
      .then(response => response.subscribe(event => expect(event.eventId).toEqual('72ab7c8b-c0d5-4ab2-8c63-5cf1ad0b439b')));  
    
    await request;

    const findEventRequest = httpMock.expectOne(URL + '72ab7c8b-c0d5-4ab2-8c63-5cf1ad0b439b');
    findEventRequest.flush(MOCK_EVENT);
    
    httpMock.verify();
  });


  it('should throw error with error message from backend when event is not found', async() => {
    const service: EventService = TestBed.get(EventService);
    const eventId = '72ab7c8b-c0d5-4ab2-8c63-5cf1ad011111';
    const request = service.findById(eventId, 
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404);
        expect(error.error).toEqual('entity is not found');
        return new Observable<never>();
      }
    )
    .then(response => { response.subscribe(_ => {fail(); })});

    await request;
    
    const findEventRequest = httpMock.expectOne(URL + eventId);
    findEventRequest.flush('entity is not found', { status: 404, statusText: 'Not Found' });
    httpMock.verify();
  });

  it('should throw error with error message from backend when there is an internal error in backend', async () => {
    const service: EventService = TestBed.get(EventService);
    const eventId = '72ab7c8b-c0d5-4ab2-8c63-5cf1ad011111';
    const request = service.findById(eventId, (error: HttpErrorResponse) => {
      expect(error.status).toEqual(500);
      expect(error.error).toEqual('a user friendly error message');
      return new Observable<never>();
    })
    .then(response => response.subscribe(_ => { fail();}));
    
    await request;
    
    const findEventRequest = httpMock.expectOne(URL + eventId);
    findEventRequest.flush('a user friendly error message', { status: 500, statusText: 'Internal Server Error' });
    httpMock.verify();
  });
});
