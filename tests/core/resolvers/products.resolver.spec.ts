import { EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { productsResolver, ProductsService } from '../../../src/app/core';

const mockRoute = {} as unknown as ActivatedRouteSnapshot;

describe('productsResolver', () => {
	let productsServiceMock = {
		getAll: jest.fn()
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [{ provide: ProductsService, useValue: productsServiceMock }]
		});
	});

	it('should return the list of products', (done) => {
		productsServiceMock.getAll.mockReturnValue(of([]));
		const result = runInInjectionContext(TestBed.inject(EnvironmentInjector), () =>
			productsResolver(mockRoute, {} as RouterStateSnapshot)
		) as unknown as Observable<unknown>;

		result.subscribe((res) => {
			expect(res).toEqual([]);
			done();
		});
	});
});
