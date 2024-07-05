import { Component, Input, OnInit } from '@angular/core';
import { cartItem } from '../../../types';
import { CoinNamePipe } from '../../pipes/coin-name.pipe';
import { TwoDpPipe } from '../../pipes/two-dp.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CoinNamePipe, TwoDpPipe, CommonModule],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent implements OnInit {

  @Input() item!: cartItem;

  formatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'USD'
  });

  sell: boolean = false;

  tempNumber: number = 0;

  ngOnInit(): void {
    if (this.item.number < 0) {
      this.sell = true;
      this.tempNumber = this.item.number * -1
    }
  }

}
