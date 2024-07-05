import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { cartItem } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  private cartList = new BehaviorSubject<cartItem[]>([]);

  public shareCartList = this.cartList.asObservable();

  updateCart(newCart: []) {
    this.cartList.next(newCart);
  }
}
