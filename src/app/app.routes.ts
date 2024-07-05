import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrdersPageComponent } from './components/orders-page/orders-page.component';
import { HoldingsPageComponent } from './components/holdings-page/holdings-page.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'holdings',
        component: HoldingsPageComponent
    },
    {
        path: 'orders',
        component: OrdersPageComponent
    },
    {
        path: 'checkout',
        component: CheckoutComponent
    }
];
