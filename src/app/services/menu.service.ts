import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

  private menu = new BehaviorSubject<boolean>(false);

  public shareMenu = this.menu.asObservable();

  toggleMenu(newValue: boolean) {
    this.menu.next(newValue);
  }
}
