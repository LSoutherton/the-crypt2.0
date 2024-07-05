import { transition, trigger, animate, style, state } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MenuSectionComponent } from '../menu-section/menu-section.component';
import { RouteService } from '../../services/route.service';

const fadeInOut = trigger('fadeInOut', [
  state(
    'open',
    style({
      opacity: 1,
      transform: 'translateX(0%)'
    })
  ),
  state(
    'closed',
    style({
      opacity: 0,
      transform: 'translateX(100%)'
    })
  ),
  transition('open => *', [animate('0.8s ease-out')]),
  transition('* => open', [animate('0.8s ease-in')])
])

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, MenuSectionComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
  animations: [fadeInOut]
})
export class MenuComponent implements OnChanges {

  @Input() menu!: boolean;

  @Input() name!: string;

  @Output() off: EventEmitter<boolean> = new EventEmitter<boolean>();

  isShown = false;

  menuList = [
    {
      icon: 'assets/images/home.svg',
      active: 'assets/images/home-green.svg',
      name: 'home'
    },
    {
      icon: 'assets/images/pie-chart.png',
      active: 'assets/images/pie-chart-green.png',
      name: 'holdings'
    },
    {
      icon: 'assets/images/order.png',
      active: 'assets/images/order-green.png',
      name: 'orders'
    },
    {
      icon: 'assets/images/checkout.png',
      active: 'assets/images/checkout-green.png',
      name: 'checkout'
    },
  ];

  fadeInOut() {
    this.isShown = !this.isShown;
  }

  constructor(private data: RouteService) { }

  currentPath: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    this.data.sharePath.subscribe(x => this.currentPath = x);
  }
}
