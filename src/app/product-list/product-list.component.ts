import { Component } from '@angular/core';
import { ProductsService } from '../service/products.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  constructor(private productsService: ProductsService){}
  

}
