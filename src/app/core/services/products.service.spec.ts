import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
import { Product } from '../../common/interfaces';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
	let service: ProductsService;
	let httpMock: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [ProductsService]
		});
		service = TestBed.inject(ProductsService);
		httpMock = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		httpMock.verify();
	});

	it('should retrieve all products', () => {
		const mockProducts = [
			{ id: 1, name: 'Product 1' },
			{ id: 2, name: 'Product 2' }
		];

		service.getAll().subscribe((products) => {
			expect(products).toEqual(mockProducts);
		});

		const req = httpMock.expectOne(`${environment.apiUrl}/products`);
		expect(req.request.method).toBe('GET');
		req.flush(mockProducts);
	});

	it('should create a new product', () => {
		const newProduct: Product = {
			id: '123',
			name: 'Product 3',
			description: 'Description 3',
			date_release: '2022-01-01',
			date_revision: '2022-01-01',
			logo: ''
		};
		const mockResponse = { success: true, data: newProduct };

		service.create(newProduct).subscribe((response) => {
			expect(response).toEqual(mockResponse as any);
		});

		const req = httpMock.expectOne(`${environment.apiUrl}/products`);
		expect(req.request.method).toBe('POST');
		expect(req.request.body).toEqual(newProduct);
		req.flush(mockResponse);
	});

	it('should update a product by id', () => {
		const updatedProduct: Partial<Product> = { name: 'Updated Product' };
		const mockResponse = { success: true, data: { ...updatedProduct, id: '3' } };

		service.updateById('3', updatedProduct).subscribe((response) => {
			expect(response).toEqual(mockResponse as any);
		});

		const req = httpMock.expectOne(`${environment.apiUrl}/products/3`);
		expect(req.request.method).toBe('PUT');
		expect(req.request.body).toEqual(updatedProduct);
		req.flush(mockResponse);
	});

	it('should delete a product by id', () => {
		const mockResponse = { success: true, data: null };

		service.deleteById('3').subscribe((response) => {
			expect(response).toEqual(mockResponse as any);
		});

		const req = httpMock.expectOne(`${environment.apiUrl}/products/3`);
		expect(req.request.method).toBe('DELETE');
		req.flush(mockResponse);
	});

	it('should check if a product id is available', () => {
		const mockResponse = true;

		service.checkIdAvailable('3').subscribe((isAvailable) => {
			expect(isAvailable).toBe(mockResponse);
		});

		const req = httpMock.expectOne(`${environment.apiUrl}/products/verification/3`);
		expect(req.request.method).toBe('GET');
		req.flush(mockResponse);
	});
});
