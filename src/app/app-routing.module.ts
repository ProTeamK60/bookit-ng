import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventViewComponent } from './event-view/event-view.component';
import { EventListComponent } from './event-list/event-list.component';
import { RegistrationCreateComponent } from './registration-create/registration-create.component';
import { EventCreateComponent } from './event-create/event-create.component';
import { RegistrationDeleteComponent } from './registration-delete/registration-delete.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
	{ 
		path: 'events/new', 
		component: EventCreateComponent,
		canActivate: [AuthGuard]
	},
	{ 
		path: 'events/register/:eventId', 
		component: RegistrationCreateComponent,
		canActivate: [AuthGuard]
	},
  	{ 
		path: 'events/unregister/:eventId', 
		component: RegistrationDeleteComponent,
		canActivate: [AuthGuard]
	},
 	{ 
		path: 'events',
		component: EventListComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'events/:id',
		component: EventViewComponent,
		canActivate: [AuthGuard]
	},
	{
		path: '**', 
		redirectTo: 'login',
		pathMatch: 'full'
	},
	{
		path: 'login',
		component: AuthComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { enableTracing: true })],
	exports: [RouterModule]
})
export class AppRoutingModule { }
