import { Component, Input } from '@angular/core';
import { transition, trigger, animate, style, state } from '@angular/animations';
import { CommonModule } from '@angular/common';

const slideInOut = trigger('slideInOut', [
  state(
    'active',
    style({
      opacity: 1,
    })
  ),
  state(
    'inactive',
    style({
      opacity: 0,
    })
  ),
  transition('active => *', [animate('0.8s ease-out')]),
  transition('* => active', [animate('0.8s ease-in')])
])

@Component({
  selector: 'app-buy-pop-up',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './buy-pop-up.component.html',
  styleUrl: './buy-pop-up.component.css',
  animations: [slideInOut]
})
export class BuyPopUpComponent {
  @Input() show!: boolean;
}
