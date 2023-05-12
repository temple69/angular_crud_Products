import { Component, OnInit,OnDestroy } from '@angular/core';
import { ProductsService } from '../service/Products/products.service';
import { ProductsList } from '../service/Products/products';
import { Subscription } from 'rxjs';
import { AuthService } from '../service/Auth/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit,OnDestroy {
  constructor(
    private productsService: ProductsService,
    private authService: AuthService
  ) {}
  products: ProductsList[] = [];
  public authProductSubs?: Subscription;
  public isUserAuthenticated: boolean = false;

  ngOnInit(): void {
    this.productsService.getProducts();
    this.productsService
      .getProductsUpdated()
      .subscribe((ProductData: ProductsList[]) => {
        this.products = ProductData;
      });
      this.isUserAuthenticated=this.authService.getIsAuthenticated()
    this.authProductSubs = this.authService
      .getAuthenticationStatusListener()
      .subscribe((userAuthenticated) => {
        this.isUserAuthenticated = userAuthenticated;
      });
  }

  deleteProduct(id: string) {
    this.productsService.deleteProductsById(id);
  }
  ngOnDestroy(): void {
      this.authProductSubs?.unsubscribe()
  }
  
}
