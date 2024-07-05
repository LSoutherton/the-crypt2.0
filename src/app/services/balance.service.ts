import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class BalanceService {

  constructor() { }

  private balance = new BehaviorSubject<string | number | null>(this.getBalance());

  public shareBalance = this.balance.asObservable();

  updateBalance(balance: string) {
    this.balance.next(balance);
    localStorage.setItem('balance', balance);
  }

  getBalance() {
    if (localStorage.getItem('balance')) {
      return (localStorage.getItem('balance'));
    } else {
      localStorage.setItem('balance', '100000');
      return (localStorage.getItem('balance'));
    }
  }
}
