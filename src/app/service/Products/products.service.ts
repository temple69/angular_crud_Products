import { Injectable } from '@angular/core';
import { ProductsList } from './products';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  public products: ProductsList[] = [];
  public ProductsUpdated = new Subject<ProductsList[]>();
  private API_URL: string = 'http://localhost:3000/api/products';
  constructor(private http: HttpClient) {}
  //This function creates Products
  addProducts(product: ProductsList) {
    this.http
      .post<{ message: string; productId: string }>(this.API_URL, product)
      .subscribe((responseData) => {
        console.log(responseData.message);
        const productId = responseData.productId;
        product.id = productId;
        this.products.push(product);
        this.ProductsUpdated.next([...this.products]);
      });
  }

  //This function get Products from the database
  getProducts() {
    this.http
      .get<{ message: string; products: ProductsList[] }>(this.API_URL)

      .subscribe((ProductData) => {
        this.products = ProductData.products;
        this.ProductsUpdated.next([...this.products]);
      });
  }
  getSingleProduct(id: string) {
    return { ...this.products.find((prod) => prod.id === id) };
  }
  updateProduct(product: ProductsList) {
    const { id } = product;
    console.log(id);
    this.http
      .put<{ message: string; updatedProduct: ProductsList }>(
        `http://localhost:3000/api/products/${id}`,
        product
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  //This function delete Products using id from the database
  deleteProductsById(productId: string) {
    this.http
      .delete<{ message: string; products: ProductsList }>(
        `http://localhost:3000/api/products/${productId}`
      )
      .subscribe(() => {
        const updatedPosts = this.products.filter(
          (product) => product.id !== productId
        );
        this.products = updatedPosts;
        this.ProductsUpdated.next([...this.products]);
      });
  }
  getProductsUpdated() {
    return this.ProductsUpdated.asObservable();
  }
}
