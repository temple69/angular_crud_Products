import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occured';
        if (errorResponse.error.message) {
          errorMessage = errorResponse.error.message;
        }
        alert(errorMessage);
        return throwError(errorResponse);
      })
    );
  }
}
