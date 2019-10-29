import {TestBed} from '@angular/core/testing';

import {EventService} from './event.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {htmlAstToRender3Ast} from '@angular/compiler/src/render3/r3_template_transform';
import {Event} from '../model/event';
import {of} from 'rxjs';

describe('EventService', () => {
  const MOCK_EVENT: Event = {
    id: 55,
    name: 'Konferens',
    description: 'Konferens för Knowit 2020',
    eventStart: new Date(2020, 3, 20),
    eventEnd: new Date(2020, 3, 23),
    deadlineRSVP: new Date(2020, 2, 1),
    location: 'Sierra Nevada',
    organizer: 'Susanne'
  };
  let httpMock: HttpTestingController;
  const URL = 'http://localhost:8080/api/v1/events/';

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
    service.findById(55, false).subscribe(data => {
      expect(data.id).toEqual(55);
    });
  });

  it('should do the real shit', () => {
    const service: EventService = TestBed.get(EventService);
    service.findById(55, true).subscribe(data => {
      expect(data.id).toEqual(55);
    });

    const findEventRequest = httpMock.expectOne(URL + 55);
    findEventRequest.flush(MOCK_EVENT);

    httpMock.verify();
  });
});
