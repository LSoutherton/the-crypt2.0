import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, EventEmitter, Output } from '@angular/core';
import { PricePipe } from '../../pipes/price.pipe';
import { CoinNamePipe } from '../../pipes/coin-name.pipe';
import { buyPopUpService } from '../../services/buy-pop-up.service';
import { BuyPopUpComponent } from '../buy-pop-up/buy-pop-up.component';
import { ClickpropDirective } from '../../directives/clickprop.directive';
import { FormsModule } from '@angular/forms';
import { BalanceService } from '../../services/balance.service';
import { CartService } from '../../services/cart.service';
import { PurchaseNotificationComponent } from '../purchase-notification/purchase-notification.component';
import { transition, trigger, animate, style, state } from '@angular/animations';
import { cartItem, holding } from '../../../types';
import { HoldingsService } from '../../services/holdings.service';
import { HoldingsNotificationComponent } from '../holdings-notification/holdings-notification.component';
import { LongNamePipe } from '../../pipes/long-name.pipe';

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
  selector: 'app-crypto-sheet',
  standalone: true,
  imports: [CommonModule, PurchaseNotificationComponent, LongNamePipe, HoldingsNotificationComponent, FormsModule, PricePipe, CoinNamePipe, BuyPopUpComponent, ClickpropDirective],
  templateUrl: './crypto-sheet.component.html',
  styleUrl: './crypto-sheet.component.css',
  animations: [fadeInOut]
})
export class CryptoSheetComponent implements OnChanges, OnInit{

  @Input() coin!: any;

  last24: boolean = false;

  ngOnChanges() {
    if (this.coin.price_change_percentage_24h > 0) {
      this.last24 = true;
    }
  }

  more: boolean = false;

  buttonText: string = 'MORE';

  displayMore() {
    this.more = !this.more;
    if (this.more) {
      this.buttonText = 'LESS';
    } else if (!this.more) {
      this.buttonText = 'MORE';
    }
  }

  show: boolean = false;

  sell: boolean = false;

  toggleFront(input: boolean, off: boolean) {
    this.usd = '';
    this.coinAmount = '';
    this.remaining = Number(this.accountBalance);
    this.show = !this.show;
    if (off) {
      setTimeout(() => {
        this.sell = false;
      }, 200)
    }
    if (input) {
      this.sell = !this.sell;
    }
  }

  constructor(
    private data: buyPopUpService, 
    private balance: BalanceService, 
    private cart: CartService,
    private holdings: HoldingsService
  ) { }

  tempBuyPopUp: boolean = false;

  buyPopUpToggle() {
    this.data.sharePopUp.subscribe(x => this.tempBuyPopUp = x);
    this.data.toggleMenu(!this.tempBuyPopUp);
  }

  usd: string | number = '';

  coinAmount: string | number = '';

  accountBalance: string | number | null = '';

  largeBalance: boolean = false;

  remaining: number = 0;

  disableBuy: boolean = true;

  formatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'USD'
  })

  largeFormatter = new Intl.NumberFormat('en', {notation: 'compact'});

  longName: boolean = false;

  ngOnInit(): void {
    this.balance.shareBalance.subscribe(x => this.accountBalance = x);
    if (Number(this.accountBalance) >= 1000000) {
      this.largeBalance = true;
    } else {
      this.largeBalance = false;
    }
    this.remaining = Number(this.accountBalance);
    if (this.coin.id.length > 17) {
      this.longName = true;
    }
  }

  usdChange() {
    this.enough = true;
    this.balance.shareBalance.subscribe(x => this.accountBalance = x);
    if (Number(this.accountBalance) >= 1000000) {
      this.largeBalance = true;
    } else {
      this.largeBalance = false;
    }
    this.coinAmount = (Number(this.usd) / this.coin.current_price).toString();
    if (!this.sell) {
      this.remaining = Number(this.accountBalance) - Number(this.usd);
    } else if (this.sell) {
      this.remaining = Number(this.accountBalance) + Number(this.usd);
    }
    if (this.remaining <= 0) {
      this.disableBuy = true;
      this.remaining = 0;
    } else {
      if (Number(this.coinAmount) === 0) {
        this.disableBuy = true;
      } else if (Number(this.coinAmount) > 0) {
        this.disableBuy = false;
      }
    }
  }

  coinChange() {
    this.enough = false;
    this.balance.shareBalance.subscribe(x => this.accountBalance = x);
    if (Number(this.accountBalance) >= 1000000) {
      this.largeBalance = true;
    } else {
      this.largeBalance = false;
    }
    this.usd = (Number(this.coinAmount) * this.coin.current_price).toFixed(2).toString();
    if (!this.sell) {
      this.remaining = Number(this.accountBalance) - Number(this.usd);
    } else if (this.sell) {
      this.remaining = Number(this.accountBalance) + Number(this.usd);
    }
    if (this.remaining <= 0) {
      this.disableBuy = true;
      this.remaining = 0;
    } else {
      if (Number(this.usd) === 0) {
        this.disableBuy = true;
      } else if (Number(this.usd) > 0) {
        this.disableBuy = false;
      }
    }
  }

  tempHoldings: holding[] = [];

  enough: boolean = false;

  checkHoldings() {
    this.holdings.shareHoldingsList.subscribe(x => this.tempHoldings = x);
    this.tempHoldings.forEach((holding) => {
      if (holding.coin === this.coin.symbol) {
        if (holding.amount - Number(this.coinAmount) > 0) {
          this.enough = true;
        }
      }
    })
  }

  tempCart: any = [];

  buyPopUp: boolean = false;

  matching: boolean = false;

  confirmBuy() {
    this.getCartValue();
    if (Number(this.accountBalance) - (this.cartValue + Number(this.usd)) < 0) {
      this.toggleError.emit();
    } else {
      if (this.disableBuy && (this.remaining === 0)) {
        console.log('You do not have sufficient funds.')
      } else if (this.disableBuy && this.remaining != 0) {
        console.log('You need to enter an amount.')
      } else {
        this.cart.shareCartList.subscribe(x => this.tempCart = x);
        this.tempCart.forEach((item: cartItem) => {
          if (item.coin === this.coin.id) {
            this.matching = true;
          }
        })
        if (this.matching) {
          this.tempCart.forEach((item: cartItem) => {
            if (item.coin === this.coin.id) {
              item.number += Number(this.coinAmount);
            }
          })
        } else {
          this.tempCart = [...this.tempCart, { 
            coin: this.coin.id,
            number: Math.round(Number(this.coinAmount) * 100) /100,
            price: Number(this.coin.current_price),
            image: this.coin.image,
            id: this.coin.symbol,
          }];
        }
        this.cart.updateCart(this.tempCart);
        this.toggleBuy.emit();
      }     
    }
  }

  holdingsPopUp: boolean = false;

  confirmSell() {
    this.checkHoldings();
    if (this.enough) {
      if (this.disableBuy && (this.remaining === 0)) {
      } else if (this.disableBuy && this.remaining != 0) {
      } else {
        this.cart.shareCartList.subscribe(x => this.tempCart = x);
        this.tempCart.forEach((item: cartItem) => {
          if (item.coin === this.coin.id) {
            this.matching = true;
          }
        })
        if (this.matching) {
          this.tempCart.forEach((item: cartItem) => {
            if (item.coin === this.coin.id) {
              item.number -= Number(this.coinAmount);
            }
          })
        } else {
          this.tempCart = [...this.tempCart, { 
            coin: this.coin.id,
            number: Math.round(Number(this.coinAmount) * -100) /100,
            price: Number(this.coin.current_price),
            image: this.coin.image,
            id: this.coin.symbol,
          }];
        }
        this.cart.updateCart(this.tempCart);
        this.toggleBuy.emit();
      }
    } else {
      this.toggleHoldings.emit();
    }
  }

  @Output() toggleBuy = new EventEmitter<any>();

  @Output() toggleHoldings = new EventEmitter<any>();

  @Output() toggleError = new EventEmitter<any>();

  cartValue: number = 0;

  getCartValue() {
    this.cart.shareCartList.subscribe(x => x.forEach((item) => {
      this.cartValue += item.number * item.price;
    }))
  }
}
