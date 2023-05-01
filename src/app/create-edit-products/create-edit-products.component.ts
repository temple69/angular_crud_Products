import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ProductsService } from '../service/products.service';
import { v4 as uuidv4 } from 'uuid';
import { ProductsList } from '../service/products';

@Component({
  selector: 'app-create-edit-products',
  templateUrl: './create-edit-products.component.html',
  styleUrls: ['./create-edit-products.component.css'],
})
export class CreateEditProductsComponent {
  productForm = this.productsValue.group({
    name: '',
    description: '',
    price: 0,
    imgUrl: '',
  });

  constructor(
    private productsValue: FormBuilder,
    private productsService: ProductsService
  ) {}

  onSubmit() {
    const name: string = this.productForm.value.name!;
    const description: string = this.productForm.value.name!;
    const price: number = this.productForm.value.price!;
    const imgUrl: string = this.productForm.value.imgUrl!;
    let productsData: ProductsList = {
      name: name,
      description,
      price,
      imgUrl,
      id: uuidv4(),
    };
    this.productsService.addProducts(productsData);
  }
}
