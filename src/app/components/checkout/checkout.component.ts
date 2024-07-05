import { Component, OnInit } from '@angular/core';
import { RouteService } from '../../services/route.service';
import { BalanceService } from '../../services/balance.service';
import { CartService } from '../../services/cart.service';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { CommonModule } from '@angular/common';
import { cartItem, holding, orderItem } from '../../../types';
import { RouterLink } from '@angular/router';
import { transition, trigger, animate, style, state } from '@angular/animations';
import { ClickpropDirective } from '../../directives/clickprop.directive';
import { OrderNotificationComponent } from '../order-notification/order-notification.component';
import { TwoDpPipe } from '../../pipes/two-dp.pipe';
import { OrdersListService } from '../../services/orders-list.service';
import { HoldingsService } from '../../services/holdings.service';

const fadeInOut = trigger('fadeInOut', [
  state(
    'open',
    style({
      opacity: 0.35,
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
  selector: 'app-checkout',
  standalone: true,
  imports: [CartItemComponent, CommonModule, RouterLink, ClickpropDirective, OrderNotificationComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
  animations: [fadeInOut]
})
export class CheckoutComponent implements OnInit{

  constructor(
    private data: RouteService, 
    private balance: BalanceService, 
    private cart: CartService,
    private orders: OrdersListService,
    private holdings: HoldingsService
  ) { }

  route: string = 'checkout';

  currentList: any = [];

  orderPopUp: boolean = false;

  ngOnInit() {
    this.data.updatePath(this.route);
    this.getBalance();
    this.getCart();
  }

  currentBalance: any = 0;

  getBalance() {
    this.balance.shareBalance.subscribe(x => this.currentBalance = x);
    if (Number(this.currentBalance) >= 1000000) {
      this.largeBalance = true;
    } else {
      this.largeBalance = false;
    }
  }

  tempOrdersList: orderItem[] = [];

  tempHoldingsList: holding[] = [];

  matching: boolean = false;

  date: Date = new Date();

  finishOrder() {
    this.balance.updateBalance((this.currentBalance - this.cartValue).toString());
    this.orders.shareOrdersList.subscribe(x => this.tempOrdersList = x);
    if (typeof this.tempOrdersList === 'string') {
      this.tempOrdersList = [];
    }
    if (this.tempOrdersList.length === 0) {
      this.tempOrdersList = [{ cart: this.currentCart, date: this.date.toDateString() }];
    } else {
      this.tempOrdersList = [{ cart: this.currentCart, date: this.date.toDateString() }, ...this.tempOrdersList];
    }
    this.holdings.shareHoldingsList.subscribe(x => this.tempHoldingsList = x);
    if (typeof this.tempHoldingsList === 'string') {
      this.tempHoldingsList = [];
    }
    if (this.tempHoldingsList.length === 0) {
      this.currentCart.forEach((coin) => {
        this.tempHoldingsList.push({
          coin: coin.id,
          amount: coin.number,
          image: coin.image
        })
      })
    } else {
      this.currentCart.forEach((coin) => {
        this.tempHoldingsList?.forEach((item) => {
          if (coin.id === item.coin) {
            this.matching = true;
          }
        })
        if (this.matching) {
          this.tempHoldingsList.forEach((item) => {
            if (coin.id === item.coin) {
              item.amount += coin.number;
            }
          })
        } else {
          this.tempHoldingsList.push({
            coin: coin.id,
            amount: coin.number,
            image: coin.image
          });
        }
      })
    }
    console.log('one')
    this.orders.updateOrders(this.tempOrdersList);
    this.holdings.updateHoldings(this.tempHoldingsList);
    this.cartValue= 0;
    this.orderPopUp = true;
    this.clearCart();
  }

  currentCart: cartItem[] = [];

  cartValue: number = 0;

  getCart() {
    this.cart.shareCartList.subscribe(x => this.currentCart = x);
    this.currentCart.forEach((item) => {
      this.cartValue += item.price * item.number;
    })
  }

  clearCart() {
    this.cart.updateCart([]);
  }

  formatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'USD'
  })

  largeBalance: boolean = false;

  largeFormatter = new Intl.NumberFormat('en', {notation: 'compact'});

  toggleOrderPopUp() {
    if (this.orderPopUp) {
      this.orderPopUp = !this.orderPopUp;
    }
  }
}
