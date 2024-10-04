import { HttpInterceptorFn } from '@angular/common/http';
import { inject, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { SpinnerService } from '../services/spinner.service';

let activeRequest = signal<number>(0);

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {
	const spinnerService = inject(SpinnerService);

	if (!req.headers.get('skip')) {
		console.log('spinner');

		if (activeRequest() === 0) spinnerService.show();
		activeRequest.update((cunrrent) => cunrrent + 1);
	}

	return next(req).pipe(finalize(() => stopLoader(spinnerService)));
};

const stopLoader = (spinnerService: SpinnerService) => {
	activeRequest.update((cunrrent) => cunrrent - 1);
	if (activeRequest() === 0) spinnerService.hide();
};
