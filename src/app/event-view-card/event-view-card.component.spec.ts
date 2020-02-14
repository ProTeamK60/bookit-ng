import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventViewCardComponent } from './event-view-card.component';

describe('EventViewCardComponent', () => {
  let component: EventViewCardComponent;
  let fixture: ComponentFixture<EventViewCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventViewCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventViewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
