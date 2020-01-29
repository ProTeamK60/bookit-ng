import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { EventViewComponent } from './event-view/event-view.component';
import {HttpClientModule} from '@angular/common/http';
import {DevToolbarComponent} from './dev-toolbar/dev-toolbar.component';
import {
  MatButtonToggleModule,
  MatCardModule,
  MatDividerModule, MatExpansionModule, MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatListModule, MatMenuModule,
  MatProgressSpinnerModule, MatTableModule, MatToolbarModule, MatRadioModule, MatCheckboxModule
} from '@angular/material';
import {EventCardComponent} from './event-card/event-card.component';
import {RegistrationCreateComponent} from './registration-create/registration-create.component';
import {ParticipantListComponent} from './participant-list/participant-list.component';
import {ParticipantComponent} from './participant/participant.component';
import {LocalDateTimePipe} from './pipes/local-date-time.pipe';
import {ReactiveFormsModule} from '@angular/forms';
import {Component} from '@angular/core';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { JsonSchemaFormModule, JsonSchemaFormService, FrameworkLibraryService, WidgetLibraryService, Framework, MaterialDesignFramework } from 'angular2-json-schema-form';

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
        MatFormFieldModule,
        MatExpansionModule,
        MatInputModule,
        ReactiveFormsModule,
        MatTableModule,
        MatRadioModule,
        MatCheckboxModule,
        {
          ngModule: JsonSchemaFormModule,
          providers: [
              JsonSchemaFormService,
              FrameworkLibraryService,
              WidgetLibraryService,
              {provide: Framework, useClass: MaterialDesignFramework, multi: true}
          ]
        }
      ],
      declarations: [
        AppComponent,
        DynamicFormComponent,
        EventCardComponent,
        EventViewComponent,
        DevToolbarComponent,
        RegistrationCreateComponent,
        ParticipantListComponent,
        ParticipantComponent,
        LocalDateTimePipe,
        MockEventListComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  @Component({
    selector: 'app-event-list',
    template: '<p>This is a mock</p>'
  })
  class MockEventListComponent {}
});
