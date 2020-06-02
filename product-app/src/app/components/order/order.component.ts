import { Component, Inject } from '@angular/core';
import {ProductRecord} from '../../Interfaces/ProductRecord';
import {CartService} from '../../services/cartService';
import {ClientsInfo} from '../../Interfaces/ClientsInfo';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {

  private products: Array<ProductRecord>;
  private clientsInfo: ClientsInfo = {
    name: '',
    phone: '',
    address: ''
  };
  private totalPrice = 0;

  constructor(private cartService: CartService) {
    this.cartService.subscribeToCartProducts().subscribe( products => {
      this.products = products;
    });
    this.cartService.subscribeToCartPrice().subscribe( price => {
      this.totalPrice = price;
    });
  }



  makeOrder() {
    this.cartService.makeOrder(this.clientsInfo);
  }



}
