import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EventCardComponent} from './event-card.component';
import {
  MatButtonToggleModule,
  MatCardModule,
  MatDividerModule, MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule, MatTableModule, MatDatepickerModule, MatProgressSpinnerModule
} from '@angular/material';
import {Component, ViewChild} from '@angular/core';
import {Event} from '../model/event';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ParticipantListComponent} from '../participant-list/participant-list.component';
import {LocalDateTimePipe} from '../pipes/local-date-time.pipe';
import {AppRoutingModule} from '../app-routing.module';
import {EventCreateComponent} from '../event-create/event-create.component';
import {EventRegComponent} from '../event-reg/event-reg.component';
import {EventListComponent} from '../event-list/event-list.component';
import {EventViewComponent} from '../event-view/event-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

describe('EventCardComponent', () => {
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

  let parentComponent: MockParentComponent;
  let parentFixture: ComponentFixture<MockParentComponent>;

  let eventCardComponent: EventCardComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EventCardComponent,
        MockParentComponent,
        ParticipantListComponent,
        LocalDateTimePipe,
        EventCreateComponent,
        EventRegComponent,
        EventListComponent,
        EventViewComponent
      ],
      imports: [
        MatCardModule,
        MatDividerModule,
        MatIconModule,
        MatListModule,
        MatFormFieldModule,
        MatButtonToggleModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatExpansionModule,
        MatTableModule,
        AppRoutingModule,
		ReactiveFormsModule,
		MatDatepickerModule,
		MatProgressSpinnerModule,
		HttpClientModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    parentFixture = TestBed.createComponent(MockParentComponent);
    parentComponent = parentFixture.componentInstance;

    eventCardComponent = parentComponent.eventCardComponent;
    eventCardComponent.event = MOCK_EVENT;

    parentFixture.detectChanges();
  });

  it('should create', () => {
    expect(eventCardComponent).toBeTruthy();
  });


  @Component({
    selector: `app-mock-parent`,
    template: `<app-event-card></app-event-card>`
  })
  class MockParentComponent {
    @ViewChild(EventCardComponent, {static: true})
    public eventCardComponent: EventCardComponent;
  }
});
