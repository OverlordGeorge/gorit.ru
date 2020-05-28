import { Component} from '@angular/core';
import {ProductService} from '../../services/productService';
import {Product} from '../../Interfaces/Product';
import {MatDialog} from '@angular/material/dialog';
import {ShowMoreComponent} from '../showMore/showMore.component';
import {CartService} from "../../services/cartService";

@Component({
    selector: 'search-result',
    templateUrl: './searchResult.component.html',
    styleUrls: ['./searchResult.component.css']
})
export class SearchResult {

    products: Array<Product>;

    constructor(private productService: ProductService, private cartService: CartService, public dialog: MatDialog) {
      productService.subscribeToProducts().subscribe( data => {
          this.products = data;
      });
    }

  addProductToCart(product: Product) {
    this.cartService.addProductToCart(product);
  }

  openMoreWindow(clickedItem: Product) {
    const dialogRef = this.dialog.open(ShowMoreComponent, {
      data: clickedItem
    });
  }

}
