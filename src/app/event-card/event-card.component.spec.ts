import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EventCardComponent} from './event-card.component';
import {
  MatButtonToggleModule,
  MatCardModule,
  MatDividerModule, MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule, MatTableModule, MatDatepickerModule, MatProgressSpinnerModule, MatRadioModule, MatCheckboxModule, MatSelectModule, MatOptionModule
} from '@angular/material';
import {Component, DebugElement, Input, ViewChild} from '@angular/core';
import {Event} from '../model/event';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ParticipantListComponent} from '../participant-list/participant-list.component';
import {LocalDateTimePipe} from '../pipes/local-date-time.pipe';
import {AppRoutingModule} from '../app-routing.module';
import {EventCreateComponent} from '../event-create/event-create.component';
import {RegistrationCreateComponent} from '../registration-create/registration-create.component';
import {EventListComponent} from '../event-list/event-list.component';
import {EventViewComponent} from '../event-view/event-view.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { RegistrationDeleteComponent } from '../registration-delete/registration-delete.component';
import {By} from '@angular/platform-browser';
import { JsonSchemaFormModule, JsonSchemaFormService, FrameworkLibraryService, WidgetLibraryService, Framework, MaterialDesignFramework } from 'angular2-json-schema-form';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';

describe('EventCardComponent', () => {
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

  let parentComponent: MockParentComponent;
  let parentFixture: ComponentFixture<MockParentComponent>;

  let eventCardComponent: EventCardComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EventCardComponent,
        MockParentComponent,
        MockParticipantListComponent,
        LocalDateTimePipe,
        EventCreateComponent,
        RegistrationCreateComponent,
        DynamicFormComponent,
        EventListComponent,
        EventViewComponent,
        RegistrationDeleteComponent
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
        HttpClientModule,
        MatCheckboxModule,
        MatRadioModule,
        MatSelectModule,
        MatOptionModule,
        {
          ngModule: JsonSchemaFormModule,
          providers: [
              JsonSchemaFormService,
              FrameworkLibraryService,
              WidgetLibraryService,
              {provide: Framework, useClass: MaterialDesignFramework, multi: true}
          ]
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    parentFixture = TestBed.createComponent(MockParentComponent);
    parentComponent = parentFixture.componentInstance;

    eventCardComponent = parentComponent.eventCardComponent;
    eventCardComponent.event = MOCK_EVENT;

  });

  it('should create', () => {
    expect(eventCardComponent).toBeTruthy();
  });

  it('should display the event name upper cased in the card title', () => {
    parentFixture.detectChanges();

    const cardTitleTag: DebugElement = parentFixture.debugElement.query(By.css('.mat-card-title-text'));
    expect(cardTitleTag.nativeElement.textContent).toContain('KONFERENS');
  });


  @Component({
    selector: `app-mock-parent`,
    template: `
        <app-event-card></app-event-card>
    `
  })
  class MockParentComponent {
    @ViewChild(EventCardComponent, {static: true})
    public eventCardComponent: EventCardComponent;
  }

  @Component({
    selector: 'app-participant-list',
    template: '<p>This is a mock</p>'
  })
  class MockParticipantListComponent {
    @Input() eventId: string;
  }
});
