import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {Product} from '../Interfaces/Product';
import {ProductRecord} from '../Interfaces/ProductRecord';
import {AppConfig} from "./AppConfig";
import {map} from "rxjs/operators";
import {ClientsInfo} from "../Interfaces/ClientsInfo";

@Injectable({
  providedIn: 'root'
})

export class CartService {
  cartProducts = new Array<ProductRecord>();
  show = new BehaviorSubject<boolean>(false);
  cartPrice = 0;
  cartAmount = 0;

  cartProductsSubj = new BehaviorSubject<Array<ProductRecord>>(this.cartProducts);
  productPriceSubj = new BehaviorSubject<number>(this.cartPrice);
  productAmountSubj = new BehaviorSubject<number>(this.cartAmount);

  constructor(private httpClient: HttpClient) {

  }

  recalculateValues() {
      let amount = 0;
      let price = 0;
      for (let i = 0; i < this.cartProducts.length; i++) {
        amount += this.cartProducts[i].count;
        price += this.cartProducts[i].count * this.cartProducts[i].productInfo.price;
      }
      this.cartPrice = price;
      this.cartAmount = amount;
      this.productPriceSubj.next(price);
      this.productAmountSubj.next(amount);
      this.cartProductsSubj.next(this.cartProducts);
  }

  subscribeToCartPrice() {
    return this.productPriceSubj.asObservable();
  }

  subscribeToCartAmount() {
    return this.productAmountSubj.asObservable();
  }

  subscribeToCartStatus() {
    return this.show.asObservable();
  }

  subscribeToCartProducts() {
    return this.cartProductsSubj.asObservable();
  }

  hideCart() {
    this.show.next(false);
  }

  showCart() {
    this.show.next(true);
  }

  deleteProduct(id: string) {
    const num = this.findProductById(id);
    console.log(num);
    if (num !== false) {
      this.cartProducts.splice(num, 1);
      this.recalculateValues();
    }
  }

  increaseProductCount(id) {
    const num = this.findProductById(id);
    if (num !== false) {
      this.cartProducts[num].count++;
      this.recalculateValues();
    }
  }

  decreaseProductCount(id) {
    const num = this.findProductById(id);
    if (num !== false) {
      this.cartProducts[num].count--;
      if (this.cartProducts[num].count === 0) {
        this.deleteProduct(id);
      }
    }
    this.recalculateValues();
  }

  findProductById(id: string) {
    for (let i = 0; i < this.cartProducts.length; i++) {
      if (this.cartProducts[i].productInfo._id === id) {
        return i;
      }
    }
    return false;
  }

  addNewProduct(product) {
    this.cartProducts.push({
      productInfo: product,
      count: 1
    });
    this.recalculateValues();
  }

  addProductToCart(product: Product) {
    const id = product._id;
    const num = this.findProductById(id);
    if (num === false) {
      this.addNewProduct(product);
    } else {
      this.increaseProductCount(id);
    }
  }

  clearCart() {
    this.cartProducts = [];
    this.recalculateValues();
  }

  formulateOrder(productRecords: Array<ProductRecord>) {
    const order = [];
    productRecords.forEach( (record) => {
      order.push({id: record.productInfo._id, count: record.count});
    });
    return order;
  }

  makeOrder(clientsInfo: ClientsInfo) {
    const order = this.formulateOrder(this.cartProducts);
    let httpParams = new HttpParams();
    httpParams = httpParams.append('order', JSON.stringify(order));
    httpParams = httpParams.append('name', clientsInfo.name);
    httpParams = httpParams.append('phone', clientsInfo.phone);
    httpParams = httpParams.append('address', clientsInfo.address);
    this.httpClient.get(AppConfig.settings.orders.make, {params: httpParams}).
      subscribe((data) => {
          this.clearCart();
      });
  }
}



