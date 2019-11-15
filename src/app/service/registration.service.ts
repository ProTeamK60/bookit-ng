import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Registration } from '../model/registration';

@Injectable({
  providedIn: 'root'
})

export class RegistrationService {
  registrationUrl: string;
  
  constructor(private client: HttpClient) {
    this.registrationUrl = environment.registrationServiceAddress + '/api/v1/registrations';
  }
	
	public addRegistration(registration: Registration): Observable<HttpResponse<Registration>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    console.log(this.registrationUrl, registration, httpOptions);
    return this.client.post<any>(this.registrationUrl, registration, {observe: 'response'});
  }

}

