import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DefaultResponse } from '../../common/interfaces/default-response.interface';
import { Product } from '../../common/interfaces/product.interface';
import { HandlerError } from '../../utils';

@Injectable({
	providedIn: 'root'
})
export class ProductsService {
	private baseUrl = environment.apiUrl;

	private readonly _httpClient = inject(HttpClient);

	getAll() {
		const url = `${this.baseUrl}/products`;
		return this._httpClient
			.get<DefaultResponse<Product[]>>(url)
			.pipe(catchError(HandlerError.apiResponse));
	}

	create(payload: Product) {
		const url = `${this.baseUrl}/products`;
		return this._httpClient
			.post<DefaultResponse<Product>>(url, payload)
			.pipe(catchError(HandlerError.apiResponse));
	}

	updateById(id: string, payload: Partial<Product>) {
		const url = `${this.baseUrl}/products/${id}`;
		return this._httpClient
			.put<DefaultResponse<Product>>(url, payload)
			.pipe(catchError(HandlerError.apiResponse));
	}

	deleteById(id: string) {
		const url = `${this.baseUrl}/products/${id}`;
		return this._httpClient
			.delete<DefaultResponse<unknown>>(url)
			.pipe(catchError(HandlerError.apiResponse));
	}

	checkIdAvailable(id: string) {
		const url = `${this.baseUrl}/products/verification/${id}`;
		const headers = new HttpHeaders({
			skip: 'true'
		});
		return this._httpClient
			.get<boolean>(url, { headers })
			.pipe(catchError(HandlerError.apiResponse));
	}

	// private handleErrorResponse(
	// 	// error: HttpErrorResponse,
	// 	error: HttpErrorResponse
	// ): ReturnType<typeof throwError> {
	// 	return throwError(() => error);
	// }
}
