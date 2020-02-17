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
    if(this.router.fragment !== undefined && this.router.fragment !== null) {
      this.router.fragment.subscribe(fragment => {
        if(fragment !== undefined && fragment !== null && fragment !== '') {
          this.getParamsAsMap(fragment).forEach((value, key, map) => {localStorage.setItem(key.toString(), value.toString());});
        }
      });
    }
  }

  private getParamsAsMap(params: string): Map<String,String> {
    let map = new Map<String,String>();
    for(let keyValuePair of params.split('&')) {
      let keyValueSplit = keyValuePair.split('=');
      if(keyValueSplit.length == 2) {
        let key = keyValueSplit[0];
        let value = keyValueSplit[1];
        map.set(key, value);
      }
    }
    return map;
  }

}
