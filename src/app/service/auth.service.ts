import { Injectable } from '@angular/core';
import { Auth } from 'aws-amplify';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getAuthToken(): Promise<string> {
    return Auth.currentSession().then(res => {
      return res.getIdToken().getJwtToken();
    }).catch(reason => { return ''});
  }
  getToken(): any {
    return Auth.currentSession().then(response => {return response.getIdToken().getJwtToken().toString()});
  }

}
