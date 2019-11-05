import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventViewComponent } from './event-view/event-view.component';
import { EventService } from './service/event.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
  MatSlideToggleModule
} from '@angular/material';

import { DevToolbarComponent } from './dev-toolbar/dev-toolbar.component';
import {EventCreateComponent} from './event-create/event-create.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventCardComponent } from './event-card/event-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material';
import {ErrorInterceptorService} from './service/interceptors/error-interceptor.service';
import { LocalDateTimePipe } from './pipes/local-date-time.pipe';

@NgModule({
  declarations: [
    AppComponent,
    EventViewComponent,
    DevToolbarComponent,
    EventListComponent,
    EventCardComponent,
    EventCreateComponent,
    LocalDateTimePipe
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
    MatProgressSpinnerModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true
    },
    EventService
  ],
  bootstrap: [AppComponent],
  exports: [LocalDateTimePipe]
})
export class AppModule { }
