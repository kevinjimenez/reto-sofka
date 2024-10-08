import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { DefaultResponse } from '../common/interfaces';
import { MainServiceInterface } from '../common/interfaces/main-service.interface';
import { HandlerError } from './handler-error';

export abstract class MainService<R> implements MainServiceInterface<R> {
	private baseUrl = `${environment.apiUrl}`;
	constructor(
		public http: HttpClient,
		public segment: string
	) {}

	getAll(): Observable<DefaultResponse<R[]>> {
		const url = `${this.baseUrl}/${this.segment}`;
		return this.http.get<DefaultResponse<R[]>>(url).pipe(catchError(HandlerError.apiResponse));
	}

	create(payload: R): Observable<DefaultResponse<R>> {
		const url = `${this.baseUrl}/${this.segment}`;
		return this.http
			.post<DefaultResponse<R>>(url, payload)
			.pipe(catchError(HandlerError.apiResponse));
	}

	updateById(id: string, payload: Partial<R>): Observable<DefaultResponse<R>> {
		const url = `${this.baseUrl}/${this.segment}/${id}`;
		return this.http
			.put<DefaultResponse<R>>(url, payload)
			.pipe(catchError(HandlerError.apiResponse));
	}

	deleteById(id: string) {
		const url = `${this.baseUrl}/${this.segment}/${id}`;
		return this.http.delete<DefaultResponse<R>>(url).pipe(catchError(HandlerError.apiResponse));
	}
}
