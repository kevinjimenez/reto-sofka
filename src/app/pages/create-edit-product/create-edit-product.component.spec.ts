import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ProductsService } from '../../core';
import { ButtonComponent, InputComponent, ToastComponent } from '../../shared/components';
import { CreateEditProductComponent } from './create-edit-product.component';

// Mock del servicio de productos usando jest
class ProductsServiceMock {
	create = jest.fn().mockReturnValue(of({ message: 'Product created successfully' }));
	updateById = jest.fn().mockReturnValue(of({ message: 'Product updated successfully' }));
	checkIdAvailable = jest.fn().mockReturnValue(of(true)); // Simula que el ID está disponible
}

class ActivatedRouteMock {
	params = of({ id: '1' });
	get snapshot() {
		return { params: { id: '1' } };
	}
}

describe('CreateEditProductComponent', () => {
	let component: CreateEditProductComponent;
	let fixture: ComponentFixture<CreateEditProductComponent>;
	let productsServiceMock: ProductsServiceMock;
	let routerMock: jest.Mocked<Router>;
	let activatedRouteMock: ActivatedRouteMock;
	let formBuilder: FormBuilder;

	beforeEach(async () => {
		productsServiceMock = new ProductsServiceMock();
		routerMock = {
      navigate: jest.fn().mockResolvedValue(true),
      getCurrentNavigation: jest.fn().mockReturnValue({
        id: 123,
        initialUrl: '/' as any,
        extractedUrl: '/' as any,
        trigger: 'imperative',
        previousNavigation: null,
        extras: { state: { payload: null } }
      })
    } as unknown as jest.Mocked<Router>;

		activatedRouteMock = new ActivatedRouteMock();

		await TestBed.configureTestingModule({
			imports: [
				ReactiveFormsModule,
				InputComponent,
				ButtonComponent,
				ToastComponent,
				CreateEditProductComponent
			],
			providers: [
				{ provide: ProductsService, useValue: productsServiceMock },
				{ provide: Router, useValue: routerMock },
				{ provide: ActivatedRoute, useValue: activatedRouteMock },
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
		expect(routerMock.navigate).toHaveBeenCalledWith(['products']);
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
		productsServiceMock.create.mockReturnValue(
			throwError({ error: { message: 'Creation failed' } })
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
		productsServiceMock.updateById.mockReturnValue(
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
		expect(productsServiceMock.checkIdAvailable).toHaveBeenCalledWith('test-id');
	});
});
