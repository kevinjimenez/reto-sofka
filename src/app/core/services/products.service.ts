import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { Product } from '../../common/interfaces';
import { HandlerError, MainService } from '../../utils';

@Injectable({
	providedIn: 'root'
})
export class ProductsService extends MainService<Product> {
	// private readonly _httpClient = inject(HttpClient);

	constructor(private readonly _httpClient: HttpClient) {
		super(_httpClient, 'products');
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
}
