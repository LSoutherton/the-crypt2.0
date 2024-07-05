import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { transition, trigger, animate, style, state } from '@angular/animations';

const fadeInOut = trigger('fadeInOut', [
  state(
    'open',
    style({
      opacity: 1,
    })
  ),
  state(
    'closed',
    style({
      opacity: 0,
    })
  ),
  transition('open => *', [animate('0.8s ease-out')]),
  transition('* => open', [animate('0.8s ease-in')])
])

@Component({
  selector: 'app-purchase-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './purchase-error.component.html',
  styleUrl: './purchase-error.component.css',
  animations: [fadeInOut]
})
export class PurchaseErrorComponent {
  @Input() show!: boolean;
}
