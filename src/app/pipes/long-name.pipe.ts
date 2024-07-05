import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'longName',
  standalone: true
})
export class LongNamePipe implements PipeTransform {

  transform(value: string): string {
    // return value.slice(0, 11);
    return value.charAt(0).toUpperCase() + value.slice(1, 14);
  }

}
