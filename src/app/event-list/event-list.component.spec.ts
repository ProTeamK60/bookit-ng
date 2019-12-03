import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EventListComponent} from './event-list.component';
import {EventCardComponent} from '../event-card/event-card.component';
import {
  MatButtonToggleModule,
  MatCardModule,
  MatDatepickerModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatTableModule
} from '@angular/material';
import {AppRoutingModule} from '../app-routing.module';
import {EventCreateComponent} from '../event-create/event-create.component';
import {EventViewComponent} from '../event-view/event-view.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RegistrationCreateComponent} from '../registration-create/registration-create.component';
import {LocalDateTimePipe} from '../pipes/local-date-time.pipe';
import {ParticipantListComponent} from '../participant-list/participant-list.component';
import { RegistrationDeleteComponent } from '../registration-delete/registration-delete.component';
import {Component, Input} from '@angular/core';
import {Event} from '../model/event';
import {of} from 'rxjs';

describe('EventListComponent', () => {
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

  let component: EventListComponent;
  let fixture: ComponentFixture<EventListComponent>;
  let mockEventService;

  beforeEach(async(() => {
    mockEventService = jasmine.createSpyObj(['findAllEvents']);

    TestBed.configureTestingModule({
      declarations: [EventListComponent,
        MockEventCardComponent,
        EventCreateComponent,
        EventViewComponent,
        RegistrationCreateComponent,
        LocalDateTimePipe,
        ParticipantListComponent,
        RegistrationDeleteComponent
      ],
      imports: [
        MatProgressSpinnerModule,
        MatCardModule,
        MatIconModule,
        MatDividerModule,
        MatListModule,
        MatFormFieldModule,
        MatButtonToggleModule,
        AppRoutingModule,
        MatDatepickerModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatExpansionModule,
        MatTableModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventListComponent);
    component = fixture.componentInstance;
    mockEventService.findAllEvents.and.returnValue(of([MOCK_EVENT, MOCK_EVENT]));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  @Component({
    selector: 'app-event-card',
    template: '<p>This is a mock</p>'
  })
  class MockEventCardComponent {
    @Input() event: Event;
  }
});
