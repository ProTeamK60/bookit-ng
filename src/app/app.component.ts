import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bookit-ng';

  constructor(private router: ActivatedRoute) { }

  ngOnInit() {
    if (environment.production) {
      this.storeFragments();
      this.goToLoginPageIfNoToken();
      this.redirectToLastLocation();
    }
  }

  private storeFragments() {
    if (window.location.href.includes("#")) {
      //Store fragments.
      this.router.fragment.subscribe(fragment => {
        if (fragment !== undefined && fragment !== null && fragment !== '') {
          this.getParamsAsMap(fragment).forEach((value, key, map) => { localStorage.setItem(key.toString(), value.toString()); });
        }
      });
      //remove fragments from url and refresh.
      this.goToUrl(window.location.href.substr(0, window.location.href.indexOf("#")));
    }
  }

  private getParamsAsMap(params: string): Map<String, String> {
    let map = new Map<String, String>();
    for (let keyValuePair of params.split('&')) {
      let keyValueSplit = keyValuePair.split('=');
      if (keyValueSplit.length == 2) {
        let key = keyValueSplit[0];
        let value = keyValueSplit[1];
        map.set(key, value);
      }
    }
    return map;
  }

  private goToLoginPageIfNoToken() {
    if (localStorage.getItem('id_token') === null) {
      this.goToUrl(environment.cognitoLoginAddress);
    }
  }

  private redirectToLastLocation() {
    if (window.location.href.endsWith("/events") && sessionStorage.getItem('lastLocation') !== null) {
      let lastLocation = sessionStorage.getItem('lastLocation');
      sessionStorage.removeItem('lastLocation');
      this.goToUrl(lastLocation);
    }
  }

  private goToUrl(url: string) {
    if (window.location.href !== url && url !== '') {
      window.location.href = url;
    }
  }

}
