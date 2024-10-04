import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
	FormBuilder,
	NonNullableFormBuilder,
	ReactiveFormsModule,
	Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { CreateEditProductComponent } from '../../../src/app/pages/create-edit-product/create-edit-product.component';
import {
	ButtonComponent,
	InputComponent,
	ToastComponent
} from '../../../src/app/shared/components';
import { ProductsService } from '../../../src/app/core';
import { Product } from '../../../src/app/common/interfaces';

const mockProduct: Product = {
	id: '123',
	name: 'Test Product',
	description: 'Test Description',
	logo: 'logo.png',
	date_release: '2023-09-01',
	date_revision: '2023-09-10'
};

describe('CreateEditProductComponent', () => {
	let component: CreateEditProductComponent;
	let fixture: ComponentFixture<CreateEditProductComponent>;
	let compiled: HTMLElement;
	let productsServiceMock = {
		create: jest.fn(),
		updateById: jest.fn(),
		// checkIdAvailable: jest.fn()
		checkIdAvailable: jest.fn().mockReturnValue(of(true))
	};
	let routerMock = {
		navigate: jest.fn().mockResolvedValue(true),
		getCurrentNavigation: jest.fn().mockReturnValue({
			id: 123,
			initialUrl: '/' as unknown,
			extractedUrl: '/' as unknown,
			trigger: 'imperative',
			previousNavigation: null,
			extras: { state: { payload: null } }
		})
	};
	let activatedRouteMock = {
		params: of({ id: '1' }),
		snapshot: { params: { id: '1' } }
	};
	let formBuilder: NonNullableFormBuilder;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				ReactiveFormsModule,
				InputComponent,
				ButtonComponent,
				ToastComponent,
				CreateEditProductComponent
			],
			providers: [
				FormBuilder,
				{ provide: ProductsService, useValue: productsServiceMock },
				{ provide: Router, useValue: routerMock },
				{ provide: ActivatedRoute, useValue: activatedRouteMock }
			]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(CreateEditProductComponent);
		component = fixture.componentInstance;
		formBuilder = TestBed.inject(NonNullableFormBuilder);
		component.registerForm = formBuilder.group({
			id: '',
			name: ['', Validators.required],
			description: '',
			logo: '',
			date_release: '',
			date_revision: [{ value: '', disabled: true }]
		});
		fixture.detectChanges();
		compiled = fixture.nativeElement;
	});

	it('should create the component', () => {
		expect(component).toBeTruthy();
	});

	// it('should match snapshot', () => {
	//   expect(compiled).toMatchSnapshot();
	// });

	it('should call setValueForm when ngOnInit is called with payloadEdit', () => {
		component.payloadEdit.set(mockProduct);
		jest.spyOn(component, 'setValueForm');

		component.ngOnInit();

		expect(component.setValueForm).toHaveBeenCalled();
		expect(component.setValueForm).toHaveBeenCalledTimes(1);
	});

	describe('onCancel', () => {
		it('should navigate to "products" when onCancel is called', () => {
			component.onCancel();
			expect(routerMock.navigate).toHaveBeenCalledWith(['products']);
		});
	});

	describe('onReset', () => {
		it('should reset the form when onReset is called', () => {
			component.registerForm.setValue(mockProduct);

			component.onReset();

			expect(component.registerForm.value).toEqual({
				id: '',
				name: '',
				description: '',
				logo: '',
				date_release: ''
			});
		});
	});

	describe('onSubmit', () => {
		it('form should be valid', () => {
			component.registerForm.setValue(mockProduct);
			expect(component.registerForm.valid).toEqual(true);
		});

		it('form should be invalid', () => {
			component.registerForm.setValue({
				id: '',
				name: '',
				description: '',
				logo: '',
				date_release: '',
				date_revision: ''
			});
			expect(component.registerForm.valid).toEqual(false);
		});

		it('should mark all fields as touched when form is invalid', () => {
			component.onSubmit();

			expect(component.registerForm.controls['id'].touched).toBe(true);
			expect(component.registerForm.controls['name'].touched).toBe(true);
			expect(component.registerForm.controls['description'].touched).toBe(true);
			expect(component.registerForm.controls['logo'].touched).toBe(true);
			expect(component.registerForm.controls['date_release'].touched).toBe(true);
			expect(component.registerForm.controls['date_revision'].touched).toBe(true);
		});

		describe('create', () => {
			it('should show an error message when create fails', () => {
				const errorMessage = 'Creation failed';
				productsServiceMock.create.mockReturnValue(
					throwError(() => {
						return { error: { message: errorMessage } };
					})
				);

				component.registerForm.setValue(mockProduct);
				component.onSubmit();

				expect(component.errorMsg()).toBe(errorMessage);
				expect(component.toastVisible()).toBeTruthy();
			});

			it('should show a message when create succeeds', () => {
				const successMessage = 'Product created successfully';
				productsServiceMock.create.mockReturnValue(of({ message: successMessage }));

				component.registerForm.setValue(mockProduct);
				component.onSubmit();

				expect(component.errorMsg()).toBe(successMessage);
				expect(component.toastVisible()).toBeTruthy();
			});
		});

		describe('update', () => {
			it('should show an error message when updateById fails', () => {
				const errorMessage = 'Update failed';
				productsServiceMock.updateById.mockReturnValue(
					throwError(() => ({ error: { message: errorMessage } }))
				);

				component.id.set('1');
				component.payloadEdit.set(mockProduct);
				component.registerForm.setValue(mockProduct);

				component.onSubmit();

				expect(component.errorMsg()).toBe(errorMessage);
				expect(component.toastVisible()).toBeTruthy();
			});

			it('should show a message when updateById succeeds', () => {
				const successMessage = 'Product update successfully';
				productsServiceMock.updateById.mockReturnValue(of({ message: successMessage }));

				component.id.set('1');
				component.payloadEdit.set(mockProduct);
				component.registerForm.setValue(mockProduct);

				component.onSubmit();

				expect(component.errorMsg()).toBe(successMessage);
			});
		});
	});

	describe('onBack', () => {
		it('should navigate to "products"', () => {
			component.onBack();
			expect(routerMock.navigate).toHaveBeenCalledWith(['/products']);
		});
	});
});
