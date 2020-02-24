import { Component, OnInit } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {


  constructor(private amplifyService: AmplifyService, private router: Router, private route: ActivatedRoute) {
    this.amplifyService.authStateChange$.subscribe(authState => {
      if(authState.state === 'signedIn') {
        this.router.navigateByUrl(this.route.snapshot.queryParams['redirect_url'] || '/events');
      }
    })
  }

  usernameAttributes = "email"; 
  signUpConfig = {
    header: 'My Customized Sign Up',
    hideAllDefaults: true,
    defaultCountryCode: '1',
    signUpFields: [
      {
        label: 'Email',
        key: 'email',
        required: true,
        displayOrder: 1,
        type: 'string',
      },
      {
        label: 'First Name',
        key: 'given_name',
        required: true,
        displayOrder: 2,
        type: 'string'
      },
      {
        label: 'Last Name',
        key: 'family_name',
        required: true,
        displayOrder: 3,
        type: 'string'
      },
      {
        label: 'Password',
        key: 'password',
        required: true,
        displayOrder: 4,
        type: 'password'
      }
    ]
  };

  ngOnInit() {

  }

}
