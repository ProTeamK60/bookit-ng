import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevToolbarComponent } from './dev-toolbar.component';
import {
  MatButtonToggleModule,
  MatCardModule,
  MatDatepickerModule, MatDividerModule, MatExpansionModule,
  MatFormFieldModule,
  MatIconModule, MatListModule,
  MatMenuModule,
  MatProgressSpinnerModule, MatTableModule,
  MatToolbarModule,
  MatCheckboxModule,
  MatRadioModule,
  MatSelectModule,
  MatOptionModule,
  MatInputModule
} from '@angular/material';
import {AppRoutingModule} from '../app-routing.module';
import {EventCreateComponent} from '../event-create/event-create.component';
import {EventListComponent} from '../event-list/event-list.component';
import {EventViewComponent} from '../event-view/event-view.component';
import {ReactiveFormsModule} from '@angular/forms';
import {EventCardComponent} from '../event-card/event-card.component';
import {RegistrationCreateComponent} from '../registration-create/registration-create.component';
import {LocalDateTimePipe} from '../pipes/local-date-time.pipe';
import {ParticipantListComponent} from '../participant-list/participant-list.component';
import { RegistrationDeleteComponent } from '../registration-delete/registration-delete.component';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { JsonSchemaFormModule, JsonSchemaFormService, FrameworkLibraryService, WidgetLibraryService, Framework, MaterialDesignFramework } from 'angular2-json-schema-form';

describe('DevToolbarComponent', () => {
  let component: DevToolbarComponent;
  let fixture: ComponentFixture<DevToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevToolbarComponent,
        DynamicFormComponent,
      EventCreateComponent,
        EventListComponent,
        EventViewComponent,
        EventCardComponent,
        RegistrationCreateComponent,
        LocalDateTimePipe,
        ParticipantListComponent,
        RegistrationDeleteComponent
      ],
      imports: [
        MatIconModule,
        MatMenuModule,
        MatToolbarModule,
        AppRoutingModule,
        MatCardModule,
        MatFormFieldModule,
        MatDatepickerModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        MatDividerModule,
        MatListModule,
        MatButtonToggleModule,
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
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevToolbarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
