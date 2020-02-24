import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
@Component({
  selector: 'app-dev-toolbar',
  templateUrl: './dev-toolbar.component.html',
  styleUrls: ['./dev-toolbar.component.scss']
})
export class DevToolbarComponent implements OnInit {
  
  user = null;

  constructor(private router: Router) { }

  ngOnInit() {
    Auth.currentAuthenticatedUser({
      bypassCache: false
    }).then(async user => {
      this.user = {
        email: user.attributes.email,
        firstName: user.attributes.given_name,
        lastName: user.attributes.family_name
      };
    })
    .catch(err => console.log(err));
  }

  redirect(subUrl: string)
  {
    if (this.router.url.endsWith(subUrl)) {
      //refresh
      window.location.reload();
    }
    else {
      this.router.navigateByUrl(subUrl);
    }
  }

  signOut() {
    this.user = null;
    Auth.signOut()
    .then(data => this.router.navigate(['/login']))
    .catch(err => console.log(err));
  }

}
