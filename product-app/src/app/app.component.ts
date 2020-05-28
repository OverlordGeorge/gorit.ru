import { Component } from '@angular/core';
import {CartService} from './services/cartService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'product-app';
  cartOpen = false;

  constructor(private cartService: CartService) {
    cartService.subscribeToCartStatus().subscribe( (status: boolean) => {
      this.cartOpen = status;
    });
  }


}
