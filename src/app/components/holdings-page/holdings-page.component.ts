import { Component, OnInit } from '@angular/core';
import { HoldingsService } from '../../services/holdings.service';
import { RouteService } from '../../services/route.service';
import { holding, value } from '../../../types';
import { HoldingComponent } from '../holding/holding.component';
import { CommonModule } from '@angular/common';
import { ListService } from '../../services/list.service';

@Component({
  selector: 'app-holdings-page',
  standalone: true,
  imports: [HoldingComponent, CommonModule],
  templateUrl: './holdings-page.component.html',
  styleUrl: './holdings-page.component.css'
})
export class HoldingsPageComponent implements OnInit {

  constructor(
    private holdingsList: HoldingsService,
    private data: RouteService,
    private list: ListService
  ) { }

  url: string = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';

  tempList: any[] = [];

  route: string = 'holdings';

  tempHoldingsList: holding[] = [];

  tempCoinsList: any = [];

  valuesList: value[] = [];

  ngOnInit(): void {
    fetch(this.url)
    .then(res => res.json())
    .then(data => this.tempList = data)
    .then(() => this.getValues())
  }

  totalValue: number = 0;

  largeValue: boolean = false;

  getValues() {
    this.data.updatePath(this.route);
    this.holdingsList.shareHoldingsList.subscribe(x => this.tempHoldingsList = x);
    this.list.shareList.subscribe(x => this.tempCoinsList = x);
    this.tempHoldingsList.forEach((item) => {
      this.tempCoinsList.forEach((coin: any) => {
        if (coin.symbol === item.coin) {
          this.valuesList.push({
            id: coin.symbol,
            value: coin.current_price,
            percentage: 0
          })
        }
      })
    })
    this.tempHoldingsList.forEach((holding) => {
      this.valuesList.forEach((value) => {
        if (value.id === holding.coin) {
          this.totalValue += value.value * holding.amount;
        }
      })
    });
    this.tempHoldingsList.forEach((holding) => {
      this.valuesList.forEach((value) => {
        if (value.id === holding.coin) {
          value.percentage = value.value * holding.amount / this.totalValue * 100;
        }
      })
    })
    if (this.totalValue > 100000) {
      this.largeValue = true;
    } else {
      this.largeValue = false;
    }
  }

  largeFormatter = new Intl.NumberFormat('en', {notation: 'compact'});

  formatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'USD'
  })
}
