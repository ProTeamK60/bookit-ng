import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EventListComponent} from './event-list.component';
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
  MatTableModule,
  MatCheckboxModule,
  MatRadioModule,
  MatSelectModule,
  MatOptionModule,
  MatInputModule
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
import { JsonSchemaFormModule, JsonSchemaFormService, FrameworkLibraryService, WidgetLibraryService, Framework, MaterialDesignFramework } from 'angular2-json-schema-form';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { ActivatedRouteSnapshot } from '@angular/router';
import { SmallEventCardComponent } from '../small-event-card/small-event-card.component';

describe('EventListComponent', () => {
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

  let component: EventListComponent;
  let fixture: ComponentFixture<EventListComponent>;
  let mockEventService;

  beforeEach(async(() => {
    mockEventService = jasmine.createSpyObj(['findAllEvents']);

    TestBed.configureTestingModule({
      declarations: [EventListComponent,
        DynamicFormComponent,
        MockEventCardComponent,
        EventCreateComponent,
        EventViewComponent,
        RegistrationCreateComponent,
        SmallEventCardComponent,
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
        MatTableModule,
        MatCheckboxModule,
        MatSelectModule,
        MatOptionModule,
        MatRadioModule,
        MatInputModule,
        {
          ngModule: JsonSchemaFormModule,
          providers: [
              JsonSchemaFormService,
              FrameworkLibraryService,
              WidgetLibraryService,
              {provide: Framework, useClass: MaterialDesignFramework, multi: true}
          ]
        }
      ],
      providers: [
        { provide: ActivatedRouteSnapshot, useValue: {
          snapshot: of({params: of({ id: 'test', eventId: 'eventId' })})
        }}]
      
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventListComponent);
    component = fixture.componentInstance;
    mockEventService.findAllEvents.and.returnValue(of([MOCK_EVENT, MOCK_EVENT]));

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
