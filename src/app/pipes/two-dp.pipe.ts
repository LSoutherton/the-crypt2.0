import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'twoDp',
  standalone: true
})
export class TwoDpPipe implements PipeTransform {

  transform(value: number): number {
    return Math.round(value * 100) / 100;
  }

}
