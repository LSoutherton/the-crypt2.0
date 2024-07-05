import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appClickprop]',
  standalone: true
})
export class ClickpropDirective {

  @HostListener('click', ['$event'])
  public onClick(event: any): void {
    event.stopPropagation();
  }
}
