import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ProductsService } from '../services/products.service';
import { productsResolver } from './products.resolver';

describe('productsResolver', () => {
	let productsServiceSpy: jasmine.SpyObj<ProductsService>;

	const executeResolver: ResolveFn<Observable<unknown>> = (...resolverParameters) =>
		TestBed.runInInjectionContext(() => productsResolver(...resolverParameters));

	beforeEach(() => {
		const spy = jasmine.createSpyObj('ProductsService', ['getAll']);

		TestBed.configureTestingModule({
			providers: [{ provide: ProductsService, useValue: spy }]
		});

		productsServiceSpy = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
	});

	it('should be created', () => {
		expect(executeResolver).toBeTruthy();
	});

	it('should return an Observable from the service', (done) => {
		const mockProducts = [
			{ id: 1, name: 'Product 1' },
			{ id: 2, name: 'Product 2' }
		];
		const mockRoute = {} as ActivatedRouteSnapshot;
		const mockState = {} as RouterStateSnapshot;

		productsServiceSpy.getAll.and.returnValue(of(mockProducts));

		const result = executeResolver(mockRoute, mockState);

		if (result instanceof Observable) {
			result.subscribe((res) => {
				expect(res).toEqual(mockProducts);
				done();
			});
		} else {
			fail('Expected an Observable to be returned from the resolver');
		}

		expect(productsServiceSpy.getAll).toHaveBeenCalled();
	});
});
