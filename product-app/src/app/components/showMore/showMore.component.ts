import { Component } from '@angular/core';
import {ProductService} from '../../services/productService';
import {Product} from '../../Interfaces/Product';

@Component({
  selector: 'app-show-more',
  templateUrl: './showMore.component.html',
  styleUrls: ['./showMore.component.css']
})
export class ShowMoreComponent {

  product: Product;

  constructor(private productService: ProductService) {

  }

}
