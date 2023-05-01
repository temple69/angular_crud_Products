import { Injectable } from '@angular/core';
import{ProductsList} from './products'


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products:ProductsList[]=[]
  
addProducts(product:ProductsList){
  this.products.push(product)
}
  constructor() { }
  
}
