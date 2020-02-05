import {async, ComponentFixture, TestBed} from '@angular/core/testing';


import {EventViewComponent} from './event-view.component';
import {EventService} from '../service/event.service';
import {Event} from '../model/event';
import {of} from 'rxjs';
import {By} from '@angular/platform-browser';
import {Component, DebugElement, Input} from '@angular/core';
import {EventCardComponent} from '../event-card/event-card.component';
import {EventCreateComponent} from '../event-create/event-create.component';
import {EventListComponent} from '../event-list/event-list.component';
import {
  MatCardModule,
  MatIconModule,
  MatDividerModule,
  MatListModule,
  MatButtonToggleModule,
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatInputModule,
  MatExpansionModule, MatTableModule, MatRadioModule, MatCheckboxModule, MatSelectModule, MatOptionModule
} from '@angular/material';
import {AppRoutingModule} from '../app-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RegistrationCreateComponent} from '../registration-create/registration-create.component';
import {LocalDateTimePipe} from '../pipes/local-date-time.pipe';
import {ParticipantListComponent} from '../participant-list/participant-list.component';
import {HttpClientModule} from '@angular/common/http';
import { RegistrationDeleteComponent } from '../registration-delete/registration-delete.component';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { JsonSchemaFormModule, JsonSchemaFormService, FrameworkLibraryService, WidgetLibraryService, Framework, MaterialDesignFramework } from 'angular2-json-schema-form';

describe('EventViewComponent', () => {
  const MOCK_EVENT: Event = {
    eventId: '72ab7c8b-c0d5-4ab2-8c63-5cf1ad0b439b',
    name: 'Konferens',
    description: 'Konferens för Knowit 2020',
    eventStart: 90000000,
    eventEnd: 90060000,
    deadlineRVSP: 64800000,
    location: 'Sierra Nevada',
    organizer: 'Susanne',
    options: []
  };

  let component: EventViewComponent;
  let fixture: ComponentFixture<EventViewComponent>;
  let mockEventService;

  beforeEach(async(() => {
    mockEventService = jasmine.createSpyObj(['findById']);

    TestBed.configureTestingModule({
      declarations: [EventViewComponent,
        MockEventCardComponent,
        DynamicFormComponent,
        EventCreateComponent,
        EventListComponent,
        RegistrationCreateComponent,
        LocalDateTimePipe,
        ParticipantListComponent,
        RegistrationDeleteComponent
      ],
      imports: [
        MatCardModule,
        MatDividerModule,
        MatIconModule,
        MatListModule,
        MatButtonToggleModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        AppRoutingModule,
        MatDatepickerModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatExpansionModule,
        MatTableModule,
        MatSelectModule,
        MatOptionModule,
        HttpClientModule,
        MatRadioModule,
        MatCheckboxModule,
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

      providers: [{provide: EventService, useValue: mockEventService}]
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
    component.event$.subscribe(data => {
      expect(data).toEqual(MOCK_EVENT);
    });
  });

  @Component({
    selector: 'app-event-card',
    template: '<p>This is a mock</p>'
  })
  class MockEventCardComponent {
    @Input() event: Event;
  }

});
