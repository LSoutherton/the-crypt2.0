import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class buyPopUpService {

  constructor() { }

  private popUp = new BehaviorSubject<boolean>(false);

  public sharePopUp = this.popUp.asObservable();

  toggleMenu(newValue: boolean) {
    this.popUp.next(newValue);
  }
}
