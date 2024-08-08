import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductsService } from '../services/products.service';

export const productsResolver: ResolveFn<Observable<unknown>> = (route, state) => {
	return inject(ProductsService).getAll();
};
