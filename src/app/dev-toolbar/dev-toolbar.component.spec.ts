import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevToolbarComponent } from './dev-toolbar.component';

describe('DevToolbarComponent', () => {
  let component: DevToolbarComponent;
  let fixture: ComponentFixture<DevToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevToolbarComponent ]
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
