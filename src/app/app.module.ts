import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventViewComponent } from './event-view/event-view.component';
import { EventService } from './service/event.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatMenuModule} from '@angular/material/menu'; 
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list'; 
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider'; 

@NgModule({
  declarations: [
    AppComponent,
    EventViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatCardModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatTabsModule,
    MatListModule,
    MatFormFieldModule,
    MatDividerModule
  ],
  providers: [EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
