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
    this.router.navigateByUrl(subUrl);
  }

}
