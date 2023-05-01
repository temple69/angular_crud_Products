import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateEditProductsComponent } from './create-edit-products/create-edit-products.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsService } from './service/products.service';
import { SingleProductComponent } from './single-product/single-product.component';
import { TodoListModule } from './todo-list/todo-list.module';



@NgModule({
  declarations: [AppComponent, CreateEditProductsComponent,ProductListComponent, SingleProductComponent],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    TodoListModule,
    ReactiveFormsModule,
  ],
  providers: [ProductsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
