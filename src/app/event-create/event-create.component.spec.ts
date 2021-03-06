import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EventCreateComponent} from './event-create.component';
import {
  MatButtonToggleModule,
  MatCardModule,
  MatDatepickerModule,
  MatDividerModule, MatExpansionModule,
  MatFormFieldModule,
  MatIconModule, MatInputModule, MatListModule, MatNativeDateModule,
  MatProgressSpinnerModule, MatTableModule, MatRadioModule, MatCheckboxModule, MatSelectModule, MatOptionModule, MatSnackBarModule
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from '../app-routing.module';
import {EventListComponent} from '../event-list/event-list.component';
import {EventViewComponent} from '../event-view/event-view.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RegistrationCreateComponent} from '../registration-create/registration-create.component';
import {LocalDateTimePipe} from '../pipes/local-date-time.pipe';
import {ParticipantListComponent} from '../participant-list/participant-list.component';
import { RegistrationDeleteComponent } from '../registration-delete/registration-delete.component';
import { JsonSchemaFormModule, JsonSchemaFormService, FrameworkLibraryService, WidgetLibraryService, Framework, MaterialDesignFramework } from 'angular2-json-schema-form';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { ActivatedRouteSnapshot } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';
import { SmallEventCardComponent } from '../small-event-card/small-event-card.component';
import { EventViewCardComponent } from '../event-view-card/event-view-card.component';
import { AuthComponent } from '../auth/auth.component';
import { AmplifyAngularModule } from 'aws-amplify-angular';
import { RouterTestingModule } from '@angular/router/testing';

describe('EventCreateComponent', () => {
  let component: EventCreateComponent;
  let fixture: ComponentFixture<EventCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EventCreateComponent,
        DynamicFormComponent,
        EventListComponent,
        EventViewComponent,
        EventViewCardComponent,
        RegistrationCreateComponent,
        LocalDateTimePipe,
        ParticipantListComponent,
        RegistrationDeleteComponent,
        SmallEventCardComponent,
        AuthComponent
      ],
      imports: [
        MatCardModule,
        MatDividerModule,
        MatFormFieldModule,
        MatDatepickerModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatListModule,
        MatButtonToggleModule,
        MatNativeDateModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatExpansionModule,
        MatTableModule,
        MatRadioModule,
        MatSelectModule,
        MatOptionModule,
        MatCheckboxModule,
        MatSnackBarModule,
        RouterTestingModule,
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
      providers: []
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCreateComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
