import {Component} from '@angular/core';
import {ProductRecord} from '../../Interfaces/ProductRecord';
import {CartService} from '../../services/cartService';
import {ClientsInfo} from '../../Interfaces/ClientsInfo';
import {MatDialogRef} from "@angular/material/dialog";

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
  private responseMessage = '';

  constructor(private dialogRef: MatDialogRef<OrderComponent>, private cartService: CartService) {
    this.cartService.subscribeToCartProducts().subscribe(products => {
      this.products = products;
    });
    this.cartService.subscribeToCartPrice().subscribe(price => {
      this.totalPrice = price;
    });
  }

  showCartResponse(msg) {
    this.responseMessage = msg;
    setTimeout(() => {
      this.responseMessage = '';
      this.dialogRef.close();
    }, 5000);
  }

  makeOrder() {
    this.cartService.makeOrder(this.clientsInfo, (response) => {
      this.showCartResponse(response);
    });
  }


}
