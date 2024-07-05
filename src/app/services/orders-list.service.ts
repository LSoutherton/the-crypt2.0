import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { cartItem, orderItem } from '../../types';

@Injectable({
  providedIn: 'root'
})

export class OrdersListService {

  constructor() { }

  private ordersList = new BehaviorSubject<orderItem[]>(this.getOrders());

  public shareOrdersList = this.ordersList.asObservable();

  updateOrders(newOrdersList: orderItem[]) {
    this.ordersList.next(newOrdersList);
    localStorage.setItem('ordersList', JSON.stringify(newOrdersList));
  }

  getOrders() {
    if (localStorage.getItem('ordersList')) {
      return (JSON.parse(localStorage.getItem('ordersList') || '[]'))
    } else {
      localStorage.setItem('ordersList', JSON.stringify([]))
      return (JSON.parse(localStorage.getItem('ordersList') || '[]'))
    }
  }
}
