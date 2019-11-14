import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'localDateTime'
})
export class LocalDateTimePipe implements PipeTransform {

  transform(value: number, ...args: any[]): string {
    let date = new Date(value);
    let options = {timeZoneName: 'short'};
    return date.toLocaleString() + " " + /.*\s(.+)/.exec(date.toLocaleDateString(navigator.language, options))[1];
  }

}
