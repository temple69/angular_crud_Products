import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { CreateEditProductsComponent } from './create-edit-products/create-edit-products.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { RegisterComponent } from './Authentication/register/register.component';
import { LoginComponent } from './Authentication/login/login.component';
import { AuthGuard } from './service/Auth/auth.guards';

const routes: Routes = [
  {
    component: CreateEditProductsComponent,
    path: 'create-product',
    canActivate: [AuthGuard],
  },
  { component: ProductListComponent, path: 'products' },
  { component: ProductListComponent, path: '' },
  { component: SingleProductComponent, path: 'products/:productId' },
  {
    component: CreateEditProductsComponent,
    path: 'editProduct/:productId',
    canActivate: [AuthGuard],
  },
  { component: RegisterComponent, path: 'register' },
  { component: LoginComponent, path: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
