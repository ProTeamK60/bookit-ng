import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {EventViewComponent} from './event-view/event-view.component';
import {EventService} from './service/event.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {
  MatSliderModule,
  MatCardModule,
  MatButtonToggleModule,
  MatButtonModule,
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
import {EventCardComponent} from './event-card/event-card.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material';
import {ErrorInterceptorService} from './service/interceptors/error-interceptor.service';
import {LocalDateTimePipe} from './pipes/local-date-time.pipe';
import {RegistrationCreateComponent} from './registration-create/registration-create.component';
import {ParticipantListComponent} from './participant-list/participant-list.component';
import {ParticipantComponent} from './participant/participant.component';
import { RegistrationService } from './service/registration.service';
import { RegistrationDeleteComponent } from './registration-delete/registration-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    EventViewComponent,
    DevToolbarComponent,
    EventListComponent,
    EventCardComponent,
    EventCreateComponent,
    LocalDateTimePipe,
    RegistrationCreateComponent,
    ParticipantListComponent,
    ParticipantComponent,
    RegistrationDeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
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
    MatSortModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true
    },
    EventService,
    RegistrationService

  ],
  bootstrap: [AppComponent],
  exports: [LocalDateTimePipe]
})
export class AppModule {
}
