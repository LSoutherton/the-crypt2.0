import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitals',
  standalone: true
})
export class CapitalsPipe implements PipeTransform {

  transform(value: string): string {
    return value.toUpperCase();
  }

}
