import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EventRegComponent} from './event-reg.component';
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
  MatSnackBarModule
} from '@angular/material';
import {ReactiveFormsModule, FormBuilder} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from '../app-routing.module';
import {EventCreateComponent} from '../event-create/event-create.component';
import {EventListComponent} from '../event-list/event-list.component';
import {EventViewComponent} from '../event-view/event-view.component';
import {EventCardComponent} from '../event-card/event-card.component';
import {LocalDateTimePipe} from '../pipes/local-date-time.pipe';
import {ParticipantListComponent} from '../participant-list/participant-list.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RegistrationService} from '../service/registration.service';
import {of} from 'rxjs';
import {Registration} from '../model/registration';

describe('EventRegComponent', () => {
  let component: EventRegComponent;
  let fixture: ComponentFixture<EventRegComponent>;
  const formBuilder: FormBuilder = new FormBuilder();
  let mockRegistrationService;

  beforeEach(async(() => {
    mockRegistrationService = jasmine.createSpyObj('RegistrationService', ['addRegistration']);

    TestBed.configureTestingModule({
      declarations: [EventRegComponent,
        EventCreateComponent,
        EventListComponent,
        EventViewComponent,
        EventCardComponent,
        LocalDateTimePipe,
        ParticipantListComponent
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
        MatExpansionModule,
        MatButtonToggleModule,
        MatTableModule,
        MatSnackBarModule,
        BrowserAnimationsModule
      ],
      providers: [{provide: RegistrationService, useValue: mockRegistrationService}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventRegComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  describe('method onSubmit()', () => {
    it('should call registrationService.addRegistration once if form is correctly filled', () => {
      mockRegistrationService.addRegistration.and.returnValue(of('Registration added!'));

      component.regForm = formBuilder.group({
        email: 'kalle@ankeborg.se'
      });

      component.onSubmit();
      fixture.detectChanges();

      expect(mockRegistrationService.addRegistration).toHaveBeenCalledTimes(1);
    });
  });

});
