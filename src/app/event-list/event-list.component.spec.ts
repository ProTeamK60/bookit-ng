import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EventListComponent} from './event-list.component';
import {EventCardComponent} from '../event-card/event-card.component';
import {
  MatButtonToggleModule,
  MatCardModule,
  MatDatepickerModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatTableModule
} from '@angular/material';
import {AppRoutingModule} from '../app-routing.module';
import {EventCreateComponent} from '../event-create/event-create.component';
import {EventViewComponent} from '../event-view/event-view.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {EventRegComponent} from '../event-reg/event-reg.component';
import {LocalDateTimePipe} from '../pipes/local-date-time.pipe';
import {ParticipantListComponent} from '../participant-list/participant-list.component';

describe('EventListComponent', () => {
  let component: EventListComponent;
  let fixture: ComponentFixture<EventListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EventListComponent,
        EventCardComponent,
        EventCreateComponent,
        EventViewComponent,
        EventRegComponent,
        LocalDateTimePipe,
        ParticipantListComponent
      ],
      imports: [
        MatProgressSpinnerModule,
        MatCardModule,
        MatIconModule,
        MatDividerModule,
        MatListModule,
        MatFormFieldModule,
        MatButtonToggleModule,
        AppRoutingModule,
        MatDatepickerModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatExpansionModule,
        MatTableModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
