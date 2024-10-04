import { HttpHandlerFn, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
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
		// const req = {} as HttpRequest<unknown>;
		const req = new HttpRequest('GET', '/test-url', {
			headers: new HttpHeaders() // Asegurar que 'skip' está presente
		});

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

	it('should skip spinnerService when "skip" header is present', (done) => {
		const next: HttpHandlerFn = (req: HttpRequest<unknown>) => of(new HttpResponse({}));

		// Solicitud con el header 'skip' para saltar la visualización del spinner
		const req = new HttpRequest('GET', '/test-url', {
			headers: new HttpHeaders({ skip: 'true' }) // Asegurar que 'skip' está presente
		});

		runInInjectionContext(TestBed.inject(EnvironmentInjector), () => {
			spinnerInterceptor(req, next).subscribe({
				next: () => {},
				complete: () => {
					// Validar que no se llame a show ni hide si el header 'skip' está presente
					expect(spinnerServiceMock.show).not.toHaveBeenCalled();
					expect(spinnerServiceMock.hide).not.toHaveBeenCalled();
					done();
				}
			});
		});
	});
});
