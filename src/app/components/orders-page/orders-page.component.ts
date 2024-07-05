import { Component, OnInit } from '@angular/core';
import { OrdersListService } from '../../services/orders-list.service';
import { OrderItemComponent } from '../order-item/order-item.component';
import { CommonModule } from '@angular/common';
import { cartItem, orderItem } from '../../../types';
import { RouteService } from '../../services/route.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-orders-page',
  standalone: true,
  imports: [OrderItemComponent, CommonModule, RouterLink],
  templateUrl: './orders-page.component.html',
  styleUrl: './orders-page.component.css'
})
export class OrdersPageComponent implements OnInit {

  constructor(
    private orders: OrdersListService,
    private data: RouteService, 
  ) { }

  route: string = 'orders';

  tempOrdersList: orderItem[] = [];

  ngOnInit(): void {
    this.data.updatePath(this.route);
    this.orders.shareOrdersList.subscribe(x => this.tempOrdersList = x);
  }
}
