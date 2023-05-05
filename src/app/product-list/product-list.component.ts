import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../service/Products/products.service';
import { ProductsList } from '../service/Products/products';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  constructor(private productsService: ProductsService) {}
  products: ProductsList[] = [];

  ngOnInit(): void {
    this.productsService.getProducts();
    this.productsService
      .getProductsUpdated()
      .subscribe((ProductData: ProductsList[]) => {
        this.products = ProductData;
      });
  }
  
  deleteProduct(id:string){
    this.productsService.deleteProductsById(id)
  }
}
