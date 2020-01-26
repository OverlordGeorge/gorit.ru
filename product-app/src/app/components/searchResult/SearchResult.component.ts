import { Component } from '@angular/core';
import {ProductService} from "../../services/productService";
import {Product} from "../../Interfaces/Product";

@Component({
    selector: 'search-result',
    templateUrl: './searchResult.component.html',
    styleUrls: ['./searchResult.component.css']
})
export class SearchResult {

    products: Array<Product>;

    constructor(private productService: ProductService){
      productService.subscribeToProducts().subscribe( data => {
          this.products = data;
      })
    }

}