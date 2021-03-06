import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RegistrationCreateComponent} from './registration-create.component';
import {
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatProgressSpinnerModule,
  MatDividerModule,
  MatIconModule,
  MatListModule,
  MatExpansionModule,
  MatButtonToggleModule,
  MatTableModule,
  MatSnackBarModule,
  MatRadioModule,
  MatCheckboxModule,
  MatSelectModule,
  MatOptionModule
} from '@angular/material';
import {ReactiveFormsModule, FormBuilder} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from '../app-routing.module';
import {EventCreateComponent} from '../event-create/event-create.component';
import {EventListComponent} from '../event-list/event-list.component';
import {EventViewComponent} from '../event-view/event-view.component';
import {LocalDateTimePipe} from '../pipes/local-date-time.pipe';
import {ParticipantListComponent} from '../participant-list/participant-list.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RegistrationDeleteComponent } from '../registration-delete/registration-delete.component';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { JsonSchemaFormModule, JsonSchemaFormService, FrameworkLibraryService, WidgetLibraryService, Framework, MaterialDesignFramework } from 'angular2-json-schema-form';
import { ActivatedRouteSnapshot } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';
import { SmallEventCardComponent } from '../small-event-card/small-event-card.component';
import { EventViewCardComponent } from '../event-view-card/event-view-card.component';
import { AmplifyAngularModule } from 'aws-amplify-angular';
import { AuthComponent } from '../auth/auth.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('EventRegComponent', () => {
  let component: RegistrationCreateComponent;
  let fixture: ComponentFixture<RegistrationCreateComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [RegistrationCreateComponent,
        DynamicFormComponent,
        EventCreateComponent,
        EventListComponent,
        EventViewComponent,
        EventViewCardComponent,
        LocalDateTimePipe,
        ParticipantListComponent,
        RegistrationDeleteComponent,
        SmallEventCardComponent,
        AuthComponent
      ],
      imports: [
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        MatDatepickerModule,
        MatProgressSpinnerModule,
        MatDividerModule,
        MatIconModule,
        MatListModule,
        MatSelectModule,
        MatOptionModule,
        MatExpansionModule,
        MatButtonToggleModule,
        MatTableModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
        MatRadioModule,
        MatCheckboxModule,
        AmplifyAngularModule,
        RouterTestingModule,
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
    fixture = TestBed.createComponent(RegistrationCreateComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  

});
