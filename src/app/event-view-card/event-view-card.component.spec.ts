import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventViewCardComponent } from './event-view-card.component';
import { LocalDateTimePipe } from '../pipes/local-date-time.pipe';
import { EventViewComponent } from '../event-view/event-view.component';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { EventCreateComponent } from '../event-create/event-create.component';
import { EventListComponent } from '../event-list/event-list.component';
import { RegistrationCreateComponent } from '../registration-create/registration-create.component';
import { ParticipantListComponent } from '../participant-list/participant-list.component';
import { RegistrationDeleteComponent } from '../registration-delete/registration-delete.component';
import { SmallEventCardComponent } from '../small-event-card/small-event-card.component';
import { MatCardModule, MatDividerModule, MatIconModule, MatListModule, MatButtonToggleModule, MatProgressSpinnerModule, MatFormFieldModule, MatDatepickerModule, MatInputModule, MatExpansionModule, MatTableModule, MatSelectModule, MatOptionModule, MatRadioModule, MatCheckboxModule } from '@angular/material';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { JsonSchemaFormModule, JsonSchemaFormService, FrameworkLibraryService, WidgetLibraryService, Framework, MaterialDesignFramework } from 'angular2-json-schema-form';
import { ViewChild, Component } from '@angular/core';
import { Event } from '../model/event';
import { AuthComponent } from '../auth/auth.component';
import { AmplifyAngularModule } from 'aws-amplify-angular';

describe('EventViewCardComponent', () => {
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

  let component: EventViewCardComponent;
  let fixture: ComponentFixture<EventViewCardComponent>;
  let parentFixture: ComponentFixture<MockParentComponent>;
  let parentComponent: MockParentComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({declarations: [EventViewComponent,
      EventViewCardComponent,
      DynamicFormComponent,
      EventCreateComponent,
      EventListComponent,
      RegistrationCreateComponent,
      LocalDateTimePipe,
      ParticipantListComponent,
      RegistrationDeleteComponent,
      SmallEventCardComponent,
      MockParentComponent,
      AuthComponent
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
      AmplifyAngularModule,
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

  })
    .compileComponents();
  }));

  beforeEach(() => {
    parentFixture = TestBed.createComponent(MockParentComponent);
    parentComponent = parentFixture.componentInstance;

    component = parentComponent.eventViewCardComponent;
    component.event = MOCK_EVENT;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  @Component({
    selector: `app-mock-parent`,
    template: `
        <event-view-card></event-view-card>
    `
  })
  class MockParentComponent {
    @ViewChild(EventViewCardComponent, {static: true})
    public eventViewCardComponent: EventViewCardComponent;
  }

});
