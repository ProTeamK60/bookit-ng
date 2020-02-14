import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallEventCardComponent } from './small-event-card.component';
import { EventCardComponent } from '../event-card/event-card.component';
import { LocalDateTimePipe } from '../pipes/local-date-time.pipe';
import { EventCreateComponent } from '../event-create/event-create.component';
import { RegistrationCreateComponent } from '../registration-create/registration-create.component';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { EventListComponent } from '../event-list/event-list.component';
import { EventViewComponent } from '../event-view/event-view.component';
import { RegistrationDeleteComponent } from '../registration-delete/registration-delete.component';
import { MatCardModule, MatDividerModule, MatIconModule, MatListModule, MatFormFieldModule, MatButtonToggleModule, MatInputModule, MatExpansionModule, MatTableModule, MatDatepickerModule, MatProgressSpinnerModule, MatCheckboxModule, MatRadioModule, MatSelectModule, MatOptionModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JsonSchemaFormModule, JsonSchemaFormService, FrameworkLibraryService, WidgetLibraryService, Framework, MaterialDesignFramework } from 'angular2-json-schema-form';
import { ParticipantListComponent } from '../participant-list/participant-list.component';
import { Component, ViewChild } from '@angular/core';
import { Event } from '../model/event';
import { EventViewCardComponent } from '../event-view-card/event-view-card.component';

describe('SmallEventCardComponent', () => {
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

  let component: SmallEventCardComponent;
  let fixture: ComponentFixture<SmallEventCardComponent>;
  let parentFixture: ComponentFixture<MockParentComponent>;
  let parentComponent: MockParentComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SmallEventCardComponent,
        EventCardComponent,
        LocalDateTimePipe,
        EventCreateComponent,
        RegistrationCreateComponent,
        ParticipantListComponent,
        DynamicFormComponent,
        EventListComponent,
        EventViewComponent,
        EventViewCardComponent,
        RegistrationDeleteComponent,
        MockParentComponent
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

    component = parentComponent.smallEventCardComponent;
    component.event = MOCK_EVENT;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  @Component({
    selector: `app-mock-parent`,
    template: `
        <small-event-card></small-event-card>
    `
  })
  class MockParentComponent {
    @ViewChild(SmallEventCardComponent, {static: true})
    public smallEventCardComponent: SmallEventCardComponent;
  }

});
