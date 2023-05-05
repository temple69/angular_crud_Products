import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ProductsService } from '../service/Products/products.service';

import { ProductsList } from '../service/Products/products';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-create-edit-products',
  templateUrl: './create-edit-products.component.html',
  styleUrls: ['./create-edit-products.component.css'],
})
export class CreateEditProductsComponent implements OnInit {
  constructor(
    private productsValue: FormBuilder,
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) {}
  public editMode:boolean =false ;
  productId: string = '';
  singleProduct: {} = {};
  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('productId')) {
        this.editMode = true;
        this.productId = paramMap.get('productId')!;
        this.singleProduct = this.productsService.getSingleProduct(
          this.productId
        );
        this.productForm.patchValue(this.singleProduct);
        console.log(this.singleProduct);
      } else {
        this.editMode = false;
        this.productId = '';
      }
    });
  }
  productForm = this.productsValue.group({
    productName: '',
    description: '',
    price: 0,
    imgUrl: '',
    id:''
  });

  onSubmit() {
    const productName: string = this.productForm.value.productName!;
    const description: string = this.productForm.value.description!;
    const price: number = this.productForm.value.price!;
    const imgUrl: string = this.productForm.value.imgUrl!;
    const id:string=this.productForm.value.id!
    let productsData: ProductsList = {
      productName,
      description,
      price,
      imgUrl,
      id
    };
    if (this.editMode) {
      this.productsService.updateProduct(productsData);
      
    }
    else{
      this.productsService.addProducts(productsData);
      console.log(this.productForm.value);

    }
    
  }
}
