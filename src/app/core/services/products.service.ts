import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, skip, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DefaultResponse } from '../../common/interfaces/default-response.interface';
import { Product } from '../../common/interfaces/product.interface';

@Injectable({
	providedIn: 'root'
})
export class ProductsService {
	private readonly _httpClient = inject(HttpClient);

	getAll() {
		const url = `${environment.apiUrl}/products`;
		return this._httpClient
			.get<DefaultResponse<Product[]>>(url)
			.pipe(catchError(this.handleErrorResponse));
	}

	create(payload: Product) {
		const url = `${environment.apiUrl}/products`;
		return this._httpClient
			.post<DefaultResponse<Product>>(url, payload)
			.pipe(catchError(this.handleErrorResponse));
	}

	updateById(id: string, payload: Partial<Product>) {
		const url = `${environment.apiUrl}/products/${id}`;
		return this._httpClient
			.put<DefaultResponse<Product>>(url, payload)
			.pipe(catchError(this.handleErrorResponse));
	}

	deleteById(id: string) {
		const url = `${environment.apiUrl}/products/${id}`;
		return this._httpClient
			.delete<DefaultResponse<unknown>>(url)
			.pipe(catchError(this.handleErrorResponse));
	}

	checkIdAvailable(id: string) {
		const url = `${environment.apiUrl}/products/verification/${id}`;
		const headers = new HttpHeaders({
			skip: 'true'
		});
		return this._httpClient
			.get<boolean>(url, { headers })
			.pipe(catchError(this.handleErrorResponse));
	}

	private handleErrorResponse(
		// error: HttpErrorResponse,
		error: HttpErrorResponse
	): ReturnType<typeof throwError> {
		return throwError(() => error);
	}
}
