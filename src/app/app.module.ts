import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {EventViewComponent} from './event-view/event-view.component';
import {EventService} from './service/event.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  JsonSchemaFormModule, 
  MaterialDesignFrameworkModule,
  JsonSchemaFormService,
  FrameworkLibraryService,
  WidgetLibraryService,
  MaterialDesignFramework,
  Framework} from 'angular2-json-schema-form';


import {
  MatSliderModule,
  MatCardModule,
  MatButtonToggleModule,
  MatButtonModule,
  MatCheckboxModule,
  MatMenuModule,
  MatTabsModule,
  MatListModule,
  MatFormFieldModule,
  MatDividerModule,
  MatToolbarModule,
  MatInputModule,
  MatIconModule,
  MatDatepickerModule,
  MatRadioModule,
  MatSelectModule,
  MatOptionModule,
  MatNativeDateModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatExpansionModule,
  MatTableModule,
  MatSortModule
} from '@angular/material';
import {DevToolbarComponent} from './dev-toolbar/dev-toolbar.component';
import {EventCreateComponent} from './event-create/event-create.component';
import {EventListComponent} from './event-list/event-list.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material';
import {ErrorInterceptorService} from './service/interceptors/error-interceptor.service';
import {LocalDateTimePipe} from './pipes/local-date-time.pipe';
import {RegistrationCreateComponent} from './registration-create/registration-create.component';
import {ParticipantListComponent} from './participant-list/participant-list.component';
import {ParticipantComponent} from './participant/participant.component';
import { RegistrationService } from './service/registration.service';
import { RegistrationDeleteComponent } from './registration-delete/registration-delete.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { SmallEventCardComponent } from './small-event-card/small-event-card.component';
import { EventViewCardComponent } from './event-view-card/event-view-card.component';
import {AmplifyAngularModule, AmplifyService} from 'aws-amplify-angular';
import { AuthComponent } from './auth/auth.component';
@NgModule({
  declarations: [
    AppComponent,
    EventViewComponent,
    DevToolbarComponent,
    EventListComponent,
    EventCreateComponent,
    LocalDateTimePipe,
    RegistrationCreateComponent,
    ParticipantListComponent,
    ParticipantComponent,
    RegistrationDeleteComponent,
    DynamicFormComponent,
    SmallEventCardComponent,
    EventViewCardComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatSliderModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatTabsModule,
    MatListModule,
    MatFormFieldModule,
    MatDividerModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatOptionModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatTableModule,
    MatSortModule,
    MaterialDesignFrameworkModule,
    {
      ngModule: JsonSchemaFormModule,
      providers: [
        JsonSchemaFormService,
        FrameworkLibraryService,
        WidgetLibraryService,
        {provide: Framework, useClass: MaterialDesignFramework, multi: true}
      ]
    },
    AmplifyAngularModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true
    },
    EventService,
    RegistrationService,
    AmplifyService,

  ],
  bootstrap: [AppComponent],
  exports: [LocalDateTimePipe]

})
export class AppModule {
}
