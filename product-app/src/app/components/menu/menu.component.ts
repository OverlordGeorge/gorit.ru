import {Component} from '@angular/core';
import {ProductService} from '../../services/productService';
import {ProductQuery} from '../../Interfaces/ProductQuery';
import {CartService} from "../../services/cartService";

@Component({
  selector: 'menu-component',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  products: Array<any>;
  productQuery: ProductQuery = {};
  searchValue = '';
  cartPrice = 0;
  cartAmount = 0;

  constructor(private productService: ProductService, private cartService: CartService) {
    this.productService.get(this.productQuery);
    this.cartService.subscribeToCartAmount().subscribe(amount => {
      this.cartAmount = amount;
    });
    this.cartService.subscribeToCartPrice().subscribe(price => {
      this.cartPrice = price;
    });
  }

  searchByName(name: string) {
    this.productQuery = {
      name: name
    };
    this.productService.get(this.productQuery);
  }

  clearSearchValue() {
    this.searchValue = '';
    this.productService.get({});
  }

  openCart() {
    this.cartService.showCart();
  }


}
