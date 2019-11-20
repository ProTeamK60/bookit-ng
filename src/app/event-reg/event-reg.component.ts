import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { RegistrationService } from '../service/registration.service';
import { Registration } from '../model/registration';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-event-reg',
	templateUrl: './event-reg.component.html',
	styleUrls: ['./event-reg.component.scss']
})
export class EventRegComponent implements OnInit {

	constructor(private registrationService: RegistrationService,
		private formBuilder: FormBuilder,
		private activatedRoute: ActivatedRoute,
		private snackBar: MatSnackBar) { }

	regForm = this.formBuilder.group({
		email: ['', [Validators.required, Validators.email]]
	});

	ngOnInit() {
	}

	onSubmit() {
		console.warn(this.regForm.value);
		const registraion: Registration = {
			eventId: this.activatedRoute.snapshot.params.eventId,
			participant: {email: this.regForm.get('email').value},
		}
		this.registrationService.addRegistration(registraion).subscribe(
			// TODO, notify user that registration is done 
			(data) => {
				console.log('Registration succeeded');
				let snackBarRef = this.snackBar.open('Succeessfully registration done', 'Ok', {duration: 5000});
			}
		);
	}
}
