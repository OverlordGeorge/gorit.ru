import { Component } from '@angular/core';
import {ProductService} from "../../services/productService";
import {ProductQuery} from "../../Interfaces/ProductQuery";

@Component({
    selector: 'menu-component',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent {

    products: Array<any>;
    productQuery: ProductQuery = {};
    searchValue: string="";

    constructor(private productService: ProductService){
        this.productService.get(this.productQuery);
    }

    searchByName(name: string){
        this.productQuery = {
            name: name
        };
        this.productService.get(this.productQuery);
    }

    clearSearchValue(){
        this.searchValue = "";
        this.productService.get({});
    }


}