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
  MatToolbarModule
} from '@angular/material';
import {AppRoutingModule} from '../app-routing.module';
import {EventCreateComponent} from '../event-create/event-create.component';
import {EventListComponent} from '../event-list/event-list.component';
import {EventViewComponent} from '../event-view/event-view.component';
import {ReactiveFormsModule} from '@angular/forms';
import {EventCardComponent} from '../event-card/event-card.component';
import {EventRegComponent} from '../event-reg/event-reg.component';
import {LocalDateTimePipe} from '../pipes/local-date-time.pipe';
import {ParticipantListComponent} from '../participant-list/participant-list.component';

describe('DevToolbarComponent', () => {
  let component: DevToolbarComponent;
  let fixture: ComponentFixture<DevToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevToolbarComponent,
      EventCreateComponent,
        EventListComponent,
        EventViewComponent,
        EventCardComponent,
        EventRegComponent,
        LocalDateTimePipe,
        ParticipantListComponent
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
        MatTableModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
