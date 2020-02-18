import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dev-toolbar',
  templateUrl: './dev-toolbar.component.html',
  styleUrls: ['./dev-toolbar.component.scss']
})
export class DevToolbarComponent implements OnInit {
  user = this.getUser();
  constructor(private router: Router) { }

  ngOnInit() {
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

  getUser() {
    let token = localStorage.getItem('id_token');
    if(token !== null) {
      try {
        return JSON.parse(atob(token.split(".")[1]));
      } catch{
      }
    }
    return null;
  }

}
