import { Component, Input } from '@angular/core';
import { cartItem, orderItem } from '../../../types';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-item',
  standalone: true,
  imports: [CartItemComponent, CommonModule],
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.css'
})
export class OrderItemComponent {

  @Input() order!: orderItem;
  
}
