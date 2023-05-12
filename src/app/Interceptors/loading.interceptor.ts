import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoadingService } from '../service/Loader/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loader:LoadingService) {}
  private totalRequests = 0;

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    this.totalRequests++;
    this.loader.setLoading(true)
    return next.handle(request).pipe(finalize(()=>{
      this.totalRequests--
      if (this.totalRequests===0) {
        this.loader.setLoading(false);
        
      }
    }));
  }
}
