import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dev-toolbar',
  templateUrl: './dev-toolbar.component.html',
  styleUrls: ['./dev-toolbar.component.scss']
})
export class DevToolbarComponent implements OnInit {

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

}
