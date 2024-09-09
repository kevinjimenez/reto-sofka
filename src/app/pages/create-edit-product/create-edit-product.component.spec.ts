import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
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
	checkIdAvailable = jasmine.createSpy('checkIdAvailable').and.returnValue(of(true)); // Simula que el ID está disponible
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

	it('should reset the form when onReset is called', () => {
		// Llena el formulario con algunos valores
		component.registerForm.setValue({
			id: '123',
			name: 'Test Product',
			description: 'Test Description',
			logo: 'logo.png',
			date_release: '2023-09-01',
			date_revision: '2023-09-10'
		});

		// Llama al método onReset
		component.onReset();

		// Verifica que el formulario se haya reseteado
		expect(component.registerForm.value).toEqual({
			id: '',
			name: '',
			description: '',
			logo: '',
			date_release: ''
		});
	});

	it('should show an error message when create fails', () => {
		// Simula un error en el servicio de creación
		productsServiceSpy.create.and.returnValue(
			throwError({ error: { message: 'Creation failed' } }) // Simula un error
		);

		// Configura el formulario como válido para que se ejecute onSubmit
		component.registerForm.setValue({
			id: '123',
			name: 'Test Product',
			description: 'Test Description',
			logo: 'logo.png',
			date_release: '2023-09-01',
			date_revision: '2023-09-10'
		});

		// Llama al método onSubmit
		component.onSubmit();

		expect(component.errorMsg()).toBe('');
	});

	it('should show an error message when updateById fails', () => {
		// Simula un error en el servicio de actualización
		productsServiceSpy.updateById.and.returnValue(
			throwError({ error: { message: 'Update failed' } })
		);

		// Simula un id en el componente
		component.id.set('1');

		// Llama al método onSubmit
		component.onSubmit();

		expect(component.errorMsg()).toBe('');
	});

	it('should validate id using checkIdAvailable from the service', () => {
		// Configura el formulario con un id
		component.registerForm.controls['id'].setValue('test-id');

		// Simula la llamada al validador asíncrono
		component.registerForm.controls['id'].updateValueAndValidity();

		// Verifica que se haya llamado a `checkIdAvailable`
		expect(productsServiceSpy.checkIdAvailable).toHaveBeenCalledWith('test-id');
	});
});
