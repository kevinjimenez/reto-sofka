import { HttpHandlerFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { spinnerInterceptor, SpinnerService } from '../../../src/app/core';

describe('spinnerInterceptor', () => {
	let spinnerServiceMock = {
		show: jest.fn(),
		hide: jest.fn()
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [{ provide: SpinnerService, useValue: spinnerServiceMock }]
		});
	});

	it('should call spinnerService.show() and spinnerService.hide()', (done) => {
		const next: HttpHandlerFn = (req: HttpRequest<unknown>) => of(new HttpResponse({}));
		const req = {} as HttpRequest<unknown>;

		runInInjectionContext(TestBed.inject(EnvironmentInjector), () => {
			spinnerInterceptor(req, next).subscribe({
				next: () => {
					done();
				},
				complete: () => {
					expect(spinnerServiceMock.show).toHaveBeenCalled();
					expect(spinnerServiceMock.hide).toHaveBeenCalled();
					done();
				}
			});
		});
	});
});
