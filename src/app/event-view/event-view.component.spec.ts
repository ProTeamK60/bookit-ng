import { async, ComponentFixture, TestBed } from '@angular/core/testing';


import { EventViewComponent } from './event-view.component';
import { EventService } from '../service/event.service';
import { Event } from '../model/event';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { EventCardComponent } from '../event-card/event-card.component';
import { EventCreateComponent } from '../event-create/event-create.component';
import { EventListComponent } from '../event-list/event-list.component';
import {
  MatCardModule,
  MatIconModule,
  MatDividerModule,
  MatListModule,
  MatButtonToggleModule,
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatInputModule,
  MatExpansionModule, MatTableModule
} from '@angular/material';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {EventRegComponent} from '../event-reg/event-reg.component';
import {LocalDateTimePipe} from '../pipes/local-date-time.pipe';
import {ParticipantListComponent} from '../participant-list/participant-list.component';
import {HttpClientModule} from '@angular/common/http';

describe('EventViewComponent', () => {
	const MOCK_EVENT: Event = {
		eventId: '72ab7c8b-c0d5-4ab2-8c63-5cf1ad0b439b',
		name: 'Konferens',
		description: 'Konferens för Knowit 2020',
		eventStart: 90000000,
		eventEnd: 90060000,
		deadlineRVSP: 64800000,
		location: 'Sierra Nevada',
		organizer: 'Susanne'
	};

	let component: EventViewComponent;
	let fixture: ComponentFixture<EventViewComponent>;
	let mockEventService;

	beforeEach(async(() => {
		mockEventService = jasmine.createSpyObj(['findById']);

		TestBed.configureTestingModule({
			declarations: [EventViewComponent,
				EventCardComponent,
				EventCreateComponent,
				EventListComponent,
        EventRegComponent,
        LocalDateTimePipe,
        ParticipantListComponent
			],
			imports: [
				MatCardModule,
				MatDividerModule,
				MatIconModule,
				MatListModule,
				MatButtonToggleModule,
				MatProgressSpinnerModule,
				MatFormFieldModule,
				AppRoutingModule,
				MatDatepickerModule,
				ReactiveFormsModule,
				MatInputModule,
				BrowserAnimationsModule,
        MatExpansionModule,
        MatTableModule,
        HttpClientModule
			],

			providers: [{ provide: EventService, useValue: mockEventService }]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(EventViewComponent);
		component = fixture.componentInstance;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should store an event in event variable after initialization', () => {
		mockEventService.findById.and.returnValue(of(MOCK_EVENT));

		fixture.detectChanges();
		component.event$.subscribe(data => {
			expect(data).toEqual(MOCK_EVENT);
		});
	});

	it('should display the event name in the second paragraph', () => {
		mockEventService.findById.and.returnValue(of(MOCK_EVENT));

		fixture.detectChanges();

		const cardTitleTag: DebugElement = fixture.debugElement.query(By.css('.mat-card-title-text'));
		expect(cardTitleTag.nativeElement.textContent).toContain('KONFERENS');
	});

});
