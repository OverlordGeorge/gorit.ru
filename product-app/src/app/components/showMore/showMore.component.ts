import { Component, Inject } from '@angular/core';
import {ProductService} from '../../services/productService';
import {Product} from '../../Interfaces/Product';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-show-more',
  templateUrl: './showMore.component.html',
  styleUrls: ['./showMore.component.css', '../searchResult/searchResult.component.css']
})
export class ShowMoreComponent {

  private product: Product;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Product, private productService: ProductService) {
    this.product = data;
  }

}
