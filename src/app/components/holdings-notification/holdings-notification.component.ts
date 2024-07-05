import { Component, Input } from '@angular/core';
import { transition, trigger, animate, style, state } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CoinNamePipe } from '../../pipes/coin-name.pipe';

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
  selector: 'app-holdings-notification',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './holdings-notification.component.html',
  styleUrl: './holdings-notification.component.css',
  animations: [fadeInOut]
})
export class HoldingsNotificationComponent {

  @Input() show!: boolean;
}
