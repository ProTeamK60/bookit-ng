import { async, ComponentFixture, TestBed } from '@angular/core/testing';

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

import { EventCreateComponent } from '../event-create/event-create.component';
import { EventListComponent } from '../event-list/event-list.component';
import { EventViewComponent } from '../event-view/event-view.component';
import { EventCardComponent } from '../event-card/event-card.component';
import { LocalDateTimePipe } from '../pipes/local-date-time.pipe';
import { ParticipantListComponent } from '../participant-list/participant-list.component';
import { EventUnregComponent } from './event-unreg.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EventRegComponent } from '../event-reg/event-reg.component';
import { RegistrationService } from '../service/registration.service';

describe('EventUnregComponent', () => {
  let component: EventUnregComponent;
  let fixture: ComponentFixture<EventUnregComponent>;
  const formBuilder: FormBuilder = new FormBuilder();
  let mockRegistrationService;

  beforeEach(async(() => {
    mockRegistrationService = jasmine.createSpyObj('RegistrationService', ['deleteRegistration']);

    TestBed.configureTestingModule({
      declarations: [
        EventRegComponent,
        EventCreateComponent,
        EventListComponent,
        EventViewComponent,
        EventCardComponent,
        LocalDateTimePipe,
        ParticipantListComponent,
        EventUnregComponent
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
      providers: [{ provide: RegistrationService, useValue: mockRegistrationService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventUnregComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('method onSubmit()', () => {
    it('should call registrationService.deleteRegistration once if form is correctly filled', () => {
      mockRegistrationService.deleteRegistration.and.returnValue(of('Registration deleted!'));

      component.regForm = formBuilder.group({
        email: 'kalle@ankeborg.se'
      });

      component.onSubmit();
      fixture.detectChanges();

      expect(mockRegistrationService.deleteRegistration).toHaveBeenCalledTimes(1);
    });
  });
});
