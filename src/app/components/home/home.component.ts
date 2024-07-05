import { Component } from '@angular/core';
import { CryptoSheetComponent } from '../crypto-sheet/crypto-sheet.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../layout/header/header.component';
import { RouterOutlet } from '@angular/router';
import { RouteService } from '../../services/route.service';
import { ListService } from '../../services/list.service';
import { BalanceService } from '../../services/balance.service';
import { transition, trigger, animate, style, state } from '@angular/animations';
import { PurchaseNotificationComponent } from '../purchase-notification/purchase-notification.component';
import { HoldingsNotificationComponent } from '../holdings-notification/holdings-notification.component';
import { PurchaseErrorComponent } from '../purchase-error/purchase-error.component';


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
  selector: 'app-home',
  standalone: true,
  imports: [CryptoSheetComponent, PurchaseNotificationComponent, PurchaseErrorComponent, HoldingsNotificationComponent, CommonModule, HeaderComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  animations: [fadeInOut]
})
export class HomeComponent {

  constructor(
    private data: RouteService, 
    private list: ListService, 
    private balance: BalanceService
  ) { }

  route: string = 'home';

  currentList: any = [];

  ngOnInit() {
    this.data.updatePath(this.route);
    this.list.shareList.subscribe(x => this.currentList = x);
    this.getBalance();
  }

  currentBalance: any = 0;

  getBalance() {
    this.balance.shareBalance.subscribe(x => this.currentBalance = x);
    if (Number(this.currentBalance) > 1000000) {
      this.largeBalance = true;
    } else {
      this.largeBalance = false;
    }
  }

  toggleBuy: boolean = false;

  toggleBuyPopUp() {
    this.toggleBuy = !this.toggleBuy;
  }

  toggleHoldings: boolean = false;

  toggleHoldingsPopUp() {
    this.toggleHoldings = !this.toggleHoldings;
  }

  toggleError: boolean = false;

  toggleErrorPopUp() {
    this.toggleError = !this.toggleError;
  }

  formatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'USD'
  })

  largeBalance: boolean = false;

  largeFormatter = new Intl.NumberFormat('en', {notation: 'compact'});

  sortedBy: string = 'Sort By';

  showSort: boolean = false;

  toggleSort() {
    this.showSort = !this.showSort;
  }

  sortPriceLtH() {
    this.currentList = [].concat(this.currentList)
      .sort((a: any, b: any) => a.current_price - b.current_price);
    this.showSort = !this.showSort
    this.sortedBy = 'Price: L to H'
  }

  sortPriceHtL() {
    this.currentList = [].concat(this.currentList)
      .sort((a: any, b: any) => b.current_price - a.current_price);
    this.showSort = !this.showSort
    this.sortedBy = 'Price: H to L'
  }

  sortAthHtL() {
    this.currentList = [].concat(this.currentList)
      .sort((a: any, b: any) => b.ath - a.ath);
    this.showSort = !this.showSort
    this.sortedBy = 'ATH: H to L'
  }

  sortAthLtH() {
    this.currentList = [].concat(this.currentList)
      .sort((a: any, b: any) => a.ath - b.ath);
    this.showSort = !this.showSort
    this.sortedBy = 'ATH: L to H'
  }

  sortCapHtL() {
    this.currentList = [].concat(this.currentList)
      .sort((a: any, b: any) => b.market_cap - a.market_cap);
    this.showSort = !this.showSort
    this.sortedBy = 'MKT Cap: H to L'
  }

  sortCapLtH() {
    this.currentList = [].concat(this.currentList)
      .sort((a: any, b: any) => a.market_cap - b.market_cap);
    this.showSort = !this.showSort
    this.sortedBy = 'MKT Cap: L to H'
  }
}
