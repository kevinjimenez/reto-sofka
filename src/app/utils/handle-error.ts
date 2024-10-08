import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export class HandlerError {
	public static apiResponse(error: HttpErrorResponse): ReturnType<typeof throwError> {
		return throwError(() => error);
	}
}
