import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventViewComponent } from './event-view.component';
import {EventService} from '../service/event.service';
import { Event } from '../model/event';
import {of} from 'rxjs';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

describe('EventViewComponent', () => {
  const MOCK_EVENT: Event = {
    eventId: '72ab7c8b-c0d5-4ab2-8c63-5cf1ad0b439b',
    name: 'Konferens',
    description: 'Konferens för Knowit 2020',
    eventStart: new Date(2020, 3, 20),
    eventEnd: new Date(2020, 3, 23),
    deadlineRVSP: new Date(2020, 2, 1),
    location: 'Sierra Nevada',
    organizer: 'Susanne'
  };

  let component: EventViewComponent;
  let fixture: ComponentFixture<EventViewComponent>;
  let mockEventService;

  beforeEach(async(() => {
    mockEventService = jasmine.createSpyObj(['findById']);

    TestBed.configureTestingModule({
      declarations: [ EventViewComponent ],
      providers: [{provide: EventService, useValue: mockEventService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventViewComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should store an event in event variable after initialization', () => {
    mockEventService.findById.and.returnValue(of(MOCK_EVENT));

    fixture.detectChanges();

    expect(component.event$).toEqual(MOCK_EVENT);
  });

  it('should display the event name in the second paragraph', () => {
    mockEventService.findById.and.returnValue(of(MOCK_EVENT));
    const eventName: string = MOCK_EVENT.name;

    fixture.detectChanges();

    const thirdParagraph: DebugElement = fixture.debugElement.queryAll(By.css('p'))[2];
    expect(thirdParagraph.nativeElement.textContent).toContain('Konferens');
  });
});
