import { Component, Input, OnInit } from '@angular/core';
import { holding, value } from '../../../types';
import { CoinNamePipe } from '../../pipes/coin-name.pipe';
import { TwoDpPipe } from '../../pipes/two-dp.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-holding',
  standalone: true,
  imports: [CoinNamePipe, TwoDpPipe, CommonModule],
  templateUrl: './holding.component.html',
  styleUrl: './holding.component.css'
})
export class HoldingComponent implements OnInit{

  @Input() holding!: holding;

  @Input() values!: value[];

  largeQuantity: boolean = false;

  largeValue: boolean = false;

  coinValue: number = 0;

  percentage: number = 0;

  ngOnInit(): void {
    if (this.holding.amount >= 100000) {
      this.largeQuantity = true;
    } else {
      this.largeQuantity = false;
    }
    this.values.forEach((value) => {
      if (value.id === this.holding.coin) {
        this.coinValue = value.value;
        this.percentage = value.percentage;
        if (this.coinValue >= 100000) {
          this.largeValue = true;
        } else {
          this.largeValue = false;
        }
      }
    })
  }

  largeFormatter = new Intl.NumberFormat('en', {notation: 'compact'});

  more: boolean = false;

  displayMore() {
    this.more = !this.more;
    // if (this.more) {
    //   this.buttonText = 'LESS';
    // } else if (!this.more) {
    //   this.buttonText = 'MORE';
    // }
  }
}
