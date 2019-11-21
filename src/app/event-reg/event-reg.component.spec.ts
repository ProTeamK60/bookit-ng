import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventRegComponent } from './event-reg.component';
import {MatCardModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatProgressSpinnerModule, MatDividerModule, MatIconModule, MatListModule, MatExpansionModule, MatButtonToggleModule, MatTableModule, MatSnackBarModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from '../app-routing.module';
import {EventCreateComponent} from '../event-create/event-create.component';
import {EventListComponent} from '../event-list/event-list.component';
import { EventViewComponent } from '../event-view/event-view.component';
import { EventCardComponent } from '../event-card/event-card.component';
import { LocalDateTimePipe } from '../pipes/local-date-time.pipe';
import { ParticipantListComponent } from '../participant-list/participant-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('EventRegComponent', () => {
  let component: EventRegComponent;
  let fixture: ComponentFixture<EventRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventRegComponent,
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
      ]
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
});
