import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ProductsService } from '../../../../core';
import { TableComponent } from './table.component';

describe('TableComponent', () => {
	let component: TableComponent;
	let fixture: ComponentFixture<TableComponent>;
	let productsServiceSpy: jasmine.SpyObj<ProductsService>;
	let routerSpy: jasmine.SpyObj<Router>;

	beforeEach(async () => {
		productsServiceSpy = jasmine.createSpyObj('ProductsService', ['deleteById']);
		routerSpy = jasmine.createSpyObj('Router', ['navigate']);

		await TestBed.configureTestingModule({
			imports: [TableComponent],
			providers: [
				{ provide: ProductsService, useValue: productsServiceSpy },
				{ provide: Router, useValue: routerSpy }
			]
		}).compileComponents();

		fixture = TestBed.createComponent(TableComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
