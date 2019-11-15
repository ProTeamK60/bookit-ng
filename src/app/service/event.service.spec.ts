import {TestBed} from '@angular/core/testing';

import {EventService} from './event.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Event} from '../model/event';
import { environment } from '../../environments/environment';


describe('EventService', () => {
  const MOCK_EVENT: Event = {
    eventId: '72ab7c8b-c0d5-4ab2-8c63-5cf1ad0b439b',
    name: 'Konferens',
    description: 'Konferens för Knowit 2020',
    eventStart: 90000000,
    eventEnd: 90060000,
    deadlineRVSP: 64800000,
    location: 'Sierra Nevada',
    organizer: 'Susanne'
  };
  let httpMock: HttpTestingController;
  const URL = environment.eventServiceAddress + '/api/v1/events/';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: EventService = TestBed.get(EventService);
    expect(service).toBeTruthy();
  });

  it('should return event with correct id', () => {
    const service: EventService = TestBed.get(EventService);
    service.findById('72ab7c8b-c0d5-4ab2-8c63-5cf1ad0b439b').subscribe(data => {
      expect(data.eventId).toEqual('72ab7c8b-c0d5-4ab2-8c63-5cf1ad0b439b');
    });

    const findEventRequest = httpMock.expectOne(URL + '72ab7c8b-c0d5-4ab2-8c63-5cf1ad0b439b');
    findEventRequest.flush(MOCK_EVENT);

    httpMock.verify();
  });
});
