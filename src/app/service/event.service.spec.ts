import { TestBed } from '@angular/core/testing';

import { EventService } from './event.service';
import {HttpClientModule} from '@angular/common/http';

describe('EventService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

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
});
