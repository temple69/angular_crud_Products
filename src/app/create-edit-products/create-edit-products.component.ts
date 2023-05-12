import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ProductsService } from '../service/Products/products.service';

import { ProductsList } from '../service/Products/products';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';



@Component({
  selector: 'app-create-edit-products',
  templateUrl: './create-edit-products.component.html',
  styleUrls: ['./create-edit-products.component.css'],
})
export class CreateEditProductsComponent implements OnInit {
  constructor(
    private productsValue: FormBuilder,
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  
  public editMode: boolean = false;
  productId: string = '';
  singleProduct: {} = {};
  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('productId')) {
        this.editMode = true;
        this.productId = paramMap.get('productId')!;
        this.productsService
          .getSingleProduct(this.productId)
          .subscribe((productData) => {
            this.singleProduct = productData.product;
            this.productForm.patchValue(this.singleProduct);
            
          });
      } else {
        this.editMode = false;
        this.productId = '';
      }
    });
  }
  productForm = this.productsValue.group({
    productName: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
    description: ['',[Validators.required,Validators.minLength(6),Validators.maxLength(90)]],
    price: [0,[Validators.required,Validators.minLength(1),Validators.maxLength(6)]],
    imgUrl:['',[Validators.required,Validators.pattern('^(https?://).+\.(jpe?g|png|svg)$')]],
    id: '',
  });
  submitted = false
  

  onSubmit() {
    this.submitted=true
    if (this.productForm.invalid) {
      return
    }
    const productName: string = this.productForm.value.productName!;
    const description: string = this.productForm.value.description!;
    const price: number = this.productForm.value.price!;
    const imgUrl:string= this.productForm.value.imgUrl!;
    const id: string = this.productForm.value.id!;
    let productsData: ProductsList = {
      productName,
      description,
      price,
      imgUrl,
      id,
    };
    if (this.editMode) {
      this.productsService.updateProduct(productsData);
      
    
    } else {
      this.productsService.addProducts(productsData);
    
    }
    this.productForm.reset();
    this.router.navigateByUrl('/products')
  }
  get f(): { [key: string]: AbstractControl } {
    return this.productForm.controls;
  }
}
