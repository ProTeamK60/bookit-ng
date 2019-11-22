import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EventCreateComponent} from './event-create.component';
import {
  MatButtonToggleModule,
  MatCardModule,
  MatDatepickerModule,
  MatDividerModule, MatExpansionModule,
  MatFormFieldModule,
  MatIconModule, MatInputModule, MatListModule, MatNativeDateModule,
  MatProgressSpinnerModule, MatTableModule,
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from '../app-routing.module';
import {EventListComponent} from '../event-list/event-list.component';
import {EventViewComponent} from '../event-view/event-view.component';
import {EventCardComponent} from '../event-card/event-card.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {EventRegComponent} from '../event-reg/event-reg.component';
import {LocalDateTimePipe} from '../pipes/local-date-time.pipe';
import {ParticipantListComponent} from '../participant-list/participant-list.component';
import { EventUnregComponent } from '../event-unreg/event-unreg.component';

describe('EventCreateComponent', () => {
  let component: EventCreateComponent;
  let fixture: ComponentFixture<EventCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EventCreateComponent,
        EventListComponent,
        EventViewComponent,
        EventCardComponent,
        EventRegComponent,
        LocalDateTimePipe,
        ParticipantListComponent,
        EventUnregComponent
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
        MatTableModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
