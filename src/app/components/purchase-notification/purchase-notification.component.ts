import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
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
  selector: 'app-purchase-notification',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './purchase-notification.component.html',
  styleUrl: './purchase-notification.component.css',
  animations: [fadeInOut]
})
export class PurchaseNotificationComponent {
  @Input() show!: boolean;
}
