import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { Product } from '../../../src/app/common/interfaces';
import { ProductsService } from '../../../src/app/core';
import { TableComponent } from '../../../src/app/pages/products/components/table/table.component';
import { ProductsComponent } from '../../../src/app/pages/products/products.component';
import { ButtonComponent, InputComponent } from '../../../src/app/shared/components';
import { By } from '@angular/platform-browser';

const productsMock: Product[] = [
	{
		id: '1',
		name: 'Product 1',
		description: 'Description 1',
		logo: 'logo1.png',
		date_release: '2024-01-01',
		date_revision: '2024-01-01'
	},
	{
		id: '2',
		name: 'Product 2',
		description: 'Description 2',
		logo: 'logo2.png',
		date_release: '2024-01-01',
		date_revision: '2024-01-01'
	}
];

describe('ProductsComponent', () => {
	let component: ProductsComponent;
	let fixture: ComponentFixture<ProductsComponent>;
	let compiled: DebugElement;
	let routerMock = {
		navigate: jest.fn()
	};
	let activatedRouteMock = {
		data: of({
			products: {
				data: productsMock
			}
		})
	};
	let productsServiceMock = {};

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				ProductsComponent,
				TableComponent,
				InputComponent,
				ButtonComponent,
				ReactiveFormsModule
			],
			providers: [
				{ provide: ProductsService, useValue: productsServiceMock },
				{ provide: Router, useValue: routerMock },
				{ provide: ActivatedRoute, useValue: activatedRouteMock }
			]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ProductsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		compiled = fixture.debugElement;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should match snapshot', () => {
		expect(compiled).toMatchSnapshot();
	});

	it('should initialize products', () => {
		const originalProducts = component.originalProducts();
		expect(originalProducts).toEqual(productsMock);

		const cloneProducts = component.cloneProducts();
		expect(cloneProducts).toEqual(originalProducts.slice(0, component.take()));
	});

	it('should navigate to Form when "Agregar" button is clicked', () => {
		const onNewProductSpy = jest.spyOn(component, 'onNewProduct');
		const buttonComponent = compiled.query(By.directive(ButtonComponent));
		buttonComponent.triggerEventHandler('onClick', null);

		expect(onNewProductSpy).toHaveBeenCalled();
		expect(routerMock.navigate).toHaveBeenCalledWith(['products', 'product']);
	});

	it('should update cloneProducts on search input', (done) => {
		component.fieldSearch.setValue('Product 1');
		setTimeout(() => {
			expect(component.cloneProducts()).toEqual(productsMock.slice(0, 1));
			done();
		}, 600);
	});

	it('should reset cloneProducts when search input is cleared', (done) => {
		component.fieldSearch.setValue('Product 1');
		setTimeout(() => {
			component.fieldSearch.setValue('');
			setTimeout(() => {
				expect(component.cloneProducts()).toEqual(
					component.originalProducts().slice(0, component.take())
				);
				done();
			}, 600);
		}, 600);
	});

	it('should call onRemoveItem and remove a product from the list', () => {
		const initialLength = component.cloneProducts().length;
		const productToRemove = '1';
		component.onRemoveItem(productToRemove);
		expect(component.cloneProducts().length).toBe(initialLength - 1);
	});

	it('should call onViewItems and update visible products based on "take" value', () => {
		component.onViewItems(1);
		expect(component.cloneProducts().length).toBe(1);
		expect(component.cloneProducts()).toEqual(productsMock.slice(0, 1));
	});
});
