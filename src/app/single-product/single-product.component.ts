import { Component,OnInit } from '@angular/core';
import { ProductsService } from '../service/Products/products.service';
import{ProductsList} from '../service/Products/products'
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {
  
  product:ProductsList={
    productName:'',
    price:0,
    description:'',
    imgUrl:''
  };
  constructor(private singleService:ProductsService,private route:ActivatedRoute){}
  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      const id =params.get('productId')!
      const single= this.singleService.products.filter(prod=>prod.id==id)
      const [Productobj]= single
      this.product= Productobj
    })
      
  }

}
