import {Component} from '@angular/core';
import {CartService} from '../../services/cartService';

@Component({
  selector: 'app-cart-component',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent {

  products = [];
  totalPrice = 0;

  constructor(private cartService: CartService) {
      this.cartService.subscribeToCartProducts().subscribe( products => {
        this.products = products;
      });
      this.cartService.subscribeToCartPrice().subscribe( price => {
        this.totalPrice = price;
      });
  }

  deleteProductFromCart(id) {
    this.cartService.deleteProduct(id);
  }

  closeCart() {
    this.cartService.hideCart();
  }
}
