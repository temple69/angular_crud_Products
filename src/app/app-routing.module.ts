import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CreateEditProductsComponent } from './create-edit-products/create-edit-products.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';







const routes: Routes = [
  {component:CreateEditProductsComponent,path:'create-product'},
  {component:ProductListComponent,path:'products'},
  {component:SingleProductComponent,path:'products/:productId'},
  {component:CreateEditProductsComponent,path:'editProduct/:productId'},
  {component:RegisterComponent,path:'register'},
  {component:LoginComponent,path:'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
