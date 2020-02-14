import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormComponent } from './dynamic-form.component';
import { MatCardModule, MatDividerModule, MatIconModule, MatListModule, MatFormFieldModule, MatButtonToggleModule, MatInputModule, MatExpansionModule, MatTableModule, MatGridListModule,
  MatDatepickerModule, MatProgressSpinnerModule, MatRadioModule, MatCheckboxModule, MatSnackBarModule, MatSelectModule, MatOptionModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EventCreateComponent } from '../event-create/event-create.component';
import { EventViewComponent } from '../event-view/event-view.component';
import { RegistrationCreateComponent } from '../registration-create/registration-create.component';
import { LocalDateTimePipe } from '../pipes/local-date-time.pipe';
import { ParticipantListComponent } from '../participant-list/participant-list.component';
import { RegistrationDeleteComponent } from '../registration-delete/registration-delete.component';
import { EventListComponent } from '../event-list/event-list.component';
import { JsonSchemaFormModule, JsonSchemaFormService, FrameworkLibraryService, WidgetLibraryService, Framework, MaterialDesignFramework } from 'angular2-json-schema-form';
import { EventCardComponent } from '../event-card/event-card.component';
import {Event} from '../model/event';
import { of } from 'rxjs';
import { RegistrationService } from '../service/registration.service';
import { ActivatedRouteSnapshot } from '@angular/router';
import { SmallEventCardComponent } from '../small-event-card/small-event-card.component';
import { EventViewCardComponent } from '../event-view-card/event-view-card.component';
describe('DynamicFormComponent', () => {
  let component: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;
  let mockRegistrationService;
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

  beforeEach(async(() => {
    mockRegistrationService = jasmine.createSpyObj('RegistrationService', ['addRegistration']);

    TestBed.configureTestingModule({
      declarations: [
        DynamicFormComponent,
        EventCreateComponent,
        EventViewComponent,
        EventViewCardComponent,
        EventListComponent,
        RegistrationCreateComponent,
        LocalDateTimePipe,
        ParticipantListComponent,
        RegistrationDeleteComponent,
        SmallEventCardComponent,
        EventCardComponent
      ],
      imports: [MatCardModule,
        MatDividerModule,
        MatIconModule,
        MatListModule,
        MatGridListModule,
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
        MatSnackBarModule,
        MatRadioModule,
        MatSelectModule,
        MatOptionModule,
        MatCheckboxModule,
        {
          ngModule: JsonSchemaFormModule,
          providers: [
            JsonSchemaFormService,
            FrameworkLibraryService,
            WidgetLibraryService,
            { provide: Framework, useClass: MaterialDesignFramework, multi: true }
          ]
        }
      ],
      providers: [{provide: RegistrationService, useValue: mockRegistrationService},
        { provide: ActivatedRouteSnapshot, useValue: {
          snapshot: of({params: of({ id: 'test', eventId: 'eventId' })})
        }}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;
    component.event = MOCK_EVENT;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('method onSubmit()', () => {
    it('should call registrationService.addRegistration once if form is correctly filled', () => {
      mockRegistrationService.addRegistration.and.returnValue(of('Registration added!'));

      component.onSubmit();
      fixture.detectChanges();

      expect(mockRegistrationService.addRegistration).toHaveBeenCalledTimes(1);
    });
  });

});
