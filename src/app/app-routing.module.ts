import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventViewComponent } from './event-view/event-view.component';
import { EventListComponent } from './event-list/event-list.component';


const routes: Routes = [
  {path: 'events', component: EventListComponent},
  {path: 'events/:id', component: EventViewComponent},
  {path: '', redirectTo: 'events', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true }) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
