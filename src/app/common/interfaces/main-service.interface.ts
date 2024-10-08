import { Observable } from 'rxjs';
import { DefaultResponse } from './default-response.interface';

export interface MainServiceInterface<R> {
	getAll: () => Observable<DefaultResponse<R[]>>;
	create: (payload: R) => Observable<DefaultResponse<R>>;
	updateById: (id: string, payload: Partial<R>) => Observable<DefaultResponse<R>>;
	deleteById: (id: string) => Observable<DefaultResponse<R>>;
}
