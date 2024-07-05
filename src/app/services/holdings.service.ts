import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { holding } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class HoldingsService {

  constructor() { }

  private holdingsList = new BehaviorSubject<holding[]>(this.getHoldings());

  public shareHoldingsList = this.holdingsList.asObservable();

  updateHoldings(newHoldingsList: holding[]) {
    this.holdingsList.next(newHoldingsList);
    localStorage.setItem('holdingsList', JSON.stringify(newHoldingsList));
  }

  getHoldings() {
    if (localStorage.getItem('holdingsList')) {
      return (JSON.parse(localStorage.getItem('holdingsList') || '[]'))
    } else {
      localStorage.setItem('holdingsList', JSON.stringify([]))
      return (JSON.parse(localStorage.getItem('holdingsList') || '[]'))
    }
  }
}
