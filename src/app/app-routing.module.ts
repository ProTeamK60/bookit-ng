import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventViewComponent } from './event-view/event-view.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventRegComponent } from './event-reg/event-reg.component';
import { EventCreateComponent } from './event-create/event-create.component';

const routes: Routes = [
	{ path: 'events/new', component: EventCreateComponent },
	{ path: 'events/register/:eventId', component: EventRegComponent },
 	{ path: 'events', component: EventListComponent },
	{ path: 'events/:id', component: EventViewComponent },
	{ path: '', redirectTo: 'events', pathMatch: 'full' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { enableTracing: true })],
	exports: [RouterModule]
})
export class AppRoutingModule { }
