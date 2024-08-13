import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { ProductsService } from '../../core';
import { ButtonComponent, InputComponent, ToastComponent } from '../../shared/components';
import { CreateEditProductComponent } from './create-edit-product.component';

class ProductsServiceSpy {
	create = jasmine
		.createSpy('create')
		.and.returnValue(of({ message: 'Product created successfully' }));
	updateById = jasmine
		.createSpy('updateById')
		.and.returnValue(of({ message: 'Product updated successfully' }));
}

class ActivatedRouteSpy {
	params = of({ id: '1' });
	get snapshot() {
		return { params: { id: '1' } };
	}
}

describe('CreateEditProductComponent', () => {
	let component: CreateEditProductComponent;
	let fixture: ComponentFixture<CreateEditProductComponent>;
	let productsServiceSpy: ProductsServiceSpy;
	let routerSpy: jasmine.SpyObj<Router>;
	let activatedRouteSpy: ActivatedRouteSpy;
	let formBuilder: FormBuilder;

	beforeEach(async () => {
		productsServiceSpy = new ProductsServiceSpy();
		routerSpy = jasmine.createSpyObj('Router', ['navigate', 'getCurrentNavigation']);
		activatedRouteSpy = new ActivatedRouteSpy();

		routerSpy.getCurrentNavigation.and.returnValue({
			id: 123,
			initialUrl: '/' as any,
			extractedUrl: '/' as any,
			trigger: 'imperative',
			previousNavigation: null,
			extras: { state: { payload: null } }
		});

		routerSpy.navigate.and.callFake(() => Promise.resolve(true));

		await TestBed.configureTestingModule({
			imports: [
				ReactiveFormsModule,
				InputComponent,
				ButtonComponent,
				ToastComponent,
				CreateEditProductComponent
			],
			providers: [
				{ provide: ProductsService, useValue: productsServiceSpy },
				{ provide: Router, useValue: routerSpy },
				{ provide: ActivatedRoute, useValue: activatedRouteSpy },
				FormBuilder
			]
		}).compileComponents();

		fixture = TestBed.createComponent(CreateEditProductComponent);
		component = fixture.componentInstance;

		fixture.detectChanges();
	});

	it('should create the component', () => {
		expect(component).toBeTruthy();
	});

	it('should navigate to "products" when onCancel is called', () => {
		component.onCancel();
		expect(routerSpy.navigate).toHaveBeenCalledWith(['products']);
	});
});
