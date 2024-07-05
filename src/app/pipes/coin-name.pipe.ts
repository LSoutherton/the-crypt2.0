import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'coinName',
  standalone: true
})
export class CoinNamePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

}
