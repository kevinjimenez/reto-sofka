import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ProductsService } from '../../../src/app/core/services/products.service';
import { Product } from '../../../src/app/common/interfaces';

const mockProductId = '123';

const mockProducts = [
	{ id: 1, name: 'Product 1' },
	{ id: 2, name: 'Product 2' }
];

const mockProduct: Product = {
	id: '1',
	name: 'Product 1',
	description: 'Description 1',
	date_release: '2024-01-01',
	date_revision: '2024-01-01',
	logo: 'logo1.png'
};

const mockErrorResponse = new HttpErrorResponse({
	error: '404 Not Found',
	status: 404,
	statusText: 'Not Found'
});

describe('ProductsService', () => {
	let service: ProductsService;
	const httpClientMock = {
		get: jest.fn(),
		post: jest.fn(),
		put: jest.fn(),
		delete: jest.fn()
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				ProductsService,
				{
					provide: HttpClient,
					useValue: httpClientMock
				}
			]
		});
		service = TestBed.inject(ProductsService);
		// httpClientMock.get.mockReturnValue(of([]));
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('getAll', () => {
		it('should call http get', () => {
			httpClientMock.get.mockReturnValue(of([]));
			service.getAll();
			expect(httpClientMock.get).toHaveBeenCalledTimes(1);
		});

		it('should return all products', (done) => {
			httpClientMock.get.mockReturnValue(of(mockProducts));
			service.getAll().subscribe((products) => {
				expect(products).toEqual(mockProducts);
				done();
			});
		});

		it('should throw an error', (done) => {
			const mockErrorResponse = new HttpErrorResponse({
				error: '404 Not Found',
				status: 404,
				statusText: 'Not Found'
			});
			httpClientMock.get.mockReturnValue(throwError(() => mockErrorResponse));
			service.getAll().subscribe({
				next: () => {
					done();
				},
				error: (err) => {
					expect(err).toEqual(mockErrorResponse);
					done();
				}
			});
		});
	});

	describe('create', () => {
		it('should call http post', () => {
			httpClientMock.post.mockReturnValue(of({}));
			service.create({} as unknown as Product);
			expect(httpClientMock.post).toHaveBeenCalledTimes(1);
		});

		it('should return the created product', (done) => {
			httpClientMock.post.mockReturnValue(of(mockProduct));
			service.create(mockProduct).subscribe({
				next: (product) => {
					expect(product).toEqual(mockProduct);
					done();
				}
			});
		});

		it('should throw an error', (done) => {
			httpClientMock.post.mockReturnValue(throwError(() => mockErrorResponse));
			service.create(mockProduct).subscribe({
				next: () => {
					done();
				},
				error: (err) => {
					expect(err).toEqual(mockErrorResponse);
					done();
				}
			});
		});
	});

	describe('updateById', () => {
		it('should call http put', () => {
			httpClientMock.put.mockReturnValue(of({}));
			service.updateById(mockProductId, {} as unknown as Product);
			expect(httpClientMock.put).toHaveBeenCalledTimes(1);
		});

		it('should return the updated product', (done) => {
			httpClientMock.put.mockReturnValue(of(mockProduct));
			service.updateById(mockProductId, mockProduct).subscribe({
				next: (product) => {
					expect(product).toEqual(mockProduct);
					done();
				}
			});
		});

		it('should throw an error', (done) => {
			httpClientMock.put.mockReturnValue(throwError(() => mockErrorResponse));
			service.updateById(mockProductId, mockProduct).subscribe({
				next: () => {
					done();
				},
				error: (err) => {
					expect(err).toEqual(mockErrorResponse);
					done();
				}
			});
		});
	});

	describe('deleteById', () => {
		it('should call http delete', () => {
			httpClientMock.delete.mockReturnValue(of({}));
			service.deleteById(mockProductId);
			expect(httpClientMock.delete).toHaveBeenCalledTimes(1);
		});

		it('should return the deleted product', (done) => {
			httpClientMock.delete.mockReturnValue(of({}));
			service.deleteById(mockProductId).subscribe({
				next: (product) => {
					expect(product).toEqual({});
					done();
				}
			});
		});

		it('should throw an error', (done) => {
			httpClientMock.delete.mockReturnValue(throwError(() => mockErrorResponse));
			service.deleteById(mockProductId).subscribe({
				next: () => {
					done();
				},
				error: (err) => {
					expect(err).toEqual(mockErrorResponse);
					done();
				}
			});
		});
	});

	describe('checkIdAvailable', () => {
		it('should call http get', () => {
			httpClientMock.get.mockReturnValue(of(true));
			service.checkIdAvailable(mockProductId);
			expect(httpClientMock.get).toHaveBeenCalledTimes(1);
		});

		it('should return the boolean when id is available', (done) => {
			httpClientMock.get.mockReturnValue(of(true));
			service.checkIdAvailable(mockProductId).subscribe({
				next: (valid) => {
					expect(valid).toEqual(true);
					done();
				}
			});
		});

		it('should throw an error', (done) => {
			httpClientMock.get.mockReturnValue(throwError(() => mockErrorResponse));
			service.checkIdAvailable(mockProductId).subscribe({
				next: () => {
					done();
				},
				error: (err) => {
					expect(err).toEqual(mockErrorResponse);
					done();
				}
			});
		});
	});
});
