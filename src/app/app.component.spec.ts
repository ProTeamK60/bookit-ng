import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { EventViewComponent } from './event-view/event-view.component';
import {HttpClientModule} from '@angular/common/http';
import {DevToolbarComponent} from './dev-toolbar/dev-toolbar.component';
import {
  MatButtonToggleModule,
  MatCardModule,
  MatDividerModule, MatFormFieldModule,
  MatIconModule,
  MatListModule, MatMenuModule,
  MatProgressSpinnerModule, MatToolbarModule
} from '@angular/material';
import {EventCardComponent} from './event-card/event-card.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatCardModule,
        MatDividerModule,
        MatIconModule,
        MatListModule,
        MatButtonToggleModule,
        MatProgressSpinnerModule,
        MatMenuModule,
        MatToolbarModule,
        MatFormFieldModule
      ],
      declarations: [
        AppComponent,
        EventCardComponent,
        EventViewComponent,
        DevToolbarComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
