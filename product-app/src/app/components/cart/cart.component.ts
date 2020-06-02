import {Component} from '@angular/core';
import {CartService} from '../../services/cartService';
import {MatDialog} from "@angular/material/dialog";
import {OrderComponent} from "../order/order.component";

@Component({
  selector: 'app-cart-component',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent {

  products = [];
  totalPrice = 0;

  constructor(private cartService: CartService, public dialog: MatDialog) {
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

  makeOrder() {
    this.cartService.hideCart();
    const dialogRef = this.dialog.open(OrderComponent, {
      minWidth: '50%'
    });
  }
}
