import {TestBed} from '@angular/core/testing';

import {EventService} from './event.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {htmlAstToRender3Ast} from '@angular/compiler/src/render3/r3_template_transform';
import {Event} from '../model/event';
import {of} from 'rxjs';
import { environment } from '../../environments/environment';


describe('EventService', () => {
  const MOCK_EVENT: Event = {
    id: 55,
    eventId: '72ab7c8b-c0d5-4ab2-8c63-5cf1ad0b439b',
    name: 'Konferens',
    description: 'Konferens för Knowit 2020',
    eventStart: new Date(2020, 3, 20),
    eventEnd: new Date(2020, 3, 23),
    deadlineRVSP: new Date(2020, 2, 1),
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
    service.findById('72ab7c8b-c0d5-4ab2-8c63-5cf1ad0b439b', false).subscribe(data => {
      expect(data.eventId).toEqual('72ab7c8b-c0d5-4ab2-8c63-5cf1ad0b439b');
    });
  });

  it('should do the real shit', () => {
    const service: EventService = TestBed.get(EventService);
    service.findById('72ab7c8b-c0d5-4ab2-8c63-5cf1ad0b439b', true).subscribe(data => {
      expect(data.eventId).toEqual('72ab7c8b-c0d5-4ab2-8c63-5cf1ad0b439b');
    });

    const findEventRequest = httpMock.expectOne(URL + '72ab7c8b-c0d5-4ab2-8c63-5cf1ad0b439b');
    findEventRequest.flush(MOCK_EVENT);

    httpMock.verify();
  });
});
