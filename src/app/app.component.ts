import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bookit-ng';

  constructor(private router: ActivatedRoute) { }

  ngOnInit() {
    //Store id token.
    if (this.router.queryParams != undefined && this.router.queryParams != null) {
      this.router.queryParams.subscribe(params => {
        let token = params['id_token'];
        if (token !== undefined && token !== null && token !== '') {
          localStorage.setItem('id_token', token);
        }
      });
    }
  }
  
}
