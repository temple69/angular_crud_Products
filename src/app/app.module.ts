import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
//Routing
import { AppRoutingModule } from './app-routing.module';
//Components
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RegisterComponent } from './Authentication/register/register.component';
import { LoginComponent } from './Authentication/login/login.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { ModalComponent } from './modal/modal.component';
import { CreateEditProductsComponent } from './create-edit-products/create-edit-products.component';
import { ProductListComponent } from './product-list/product-list.component';

//Services
import { AuthService } from './service/Auth/auth.service';
import { ProductsService } from './service/Products/products.service';

//Interceptors
import { ErrorInterceptor } from './Interceptors/error-interceptor';
import { LoadingInterceptor } from './Interceptors/loading.interceptor';
import { AuthInterceptor } from './Interceptors/auth-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    CreateEditProductsComponent,
    ProductListComponent,
    SingleProductComponent,
    NavBarComponent,
    RegisterComponent,
    LoginComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,

    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    ProductsService,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
