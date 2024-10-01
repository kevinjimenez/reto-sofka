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
    // Fill the form with some values
    component.registerForm.setValue({
      id: '123',
      name: 'Test Product',
      description: 'Test Description',
      logo: 'logo.png',
      date_release: '2023-09-01',
      date_revision: '2023-09-10'
    });

    // Call the onReset method
    component.onReset();

    // Check that the form has been reset
    expect(component.registerForm.value).toEqual({
      id: '',
      name: '',
      description: '',
      logo: '',
      date_release: '',
      // date_revision: ''
    });
  });

  it('should show an error message when create fails', () => {
    // Simulate a creation error
    productsServiceMock.create.mockReturnValue(
      throwError({ error: { message: 'Creation failed' } })
    );

    // Set up the form as valid
    component.registerForm.setValue({
      id: '123',
      name: 'Test Product',
      description: 'Test Description',
      logo: 'logo.png',
      date_release: '2023-09-01',
      date_revision: '2023-09-10'
    });

    // Call the onSubmit method
    component.onSubmit();

    // Check that the error message is set correctly
    expect(component.errorMsg()).toBe('');
  });

  it('should show an error message when updateById fails', () => {
    // Simulate an update error
    productsServiceMock.updateById.mockReturnValue(
      throwError({ error: { message: 'Update failed' } })
    );

    // Simulate an id in the component
    component.id.set('1');

    // Call the onSubmit method
    component.onSubmit();

    // Check that the error message is set correctly
    expect(component.errorMsg()).toBe('');
  });

  it('should validate id using checkIdAvailable from the service', () => {
    // Set the id control value
    component.registerForm.controls['id'].setValue('test-id');

    // Simulate the call to the asynchronous validator
    component.registerForm.controls['id'].updateValueAndValidity();

    // Verify that `checkIdAvailable` was called
    expect(productsServiceMock.checkIdAvailable).toHaveBeenCalledWith('test-id');
  });

  it('should set form values correctly when editing a product', () => {
    // Simulate a payload for editing
    const payload = {
      // id: '123',
      name: 'Test Product',
      description: 'Test Description',
      logo: 'logo.png',
      date_release: '2023-09-01',
      // date_revision: '2023-09-10'
    };

    // component.registerForm.setValue(payload);

    // Set the payloadEdit signal
    component.payloadEdit.set({...payload, id: '123', date_revision: '2023-09-10'});

    // Initialize the form
    component.ngOnInit();

    // Verify that the form values are set correctly
    expect(component.registerForm.value).toEqual(payload);
  });

  it('should call setValueForm when ngOnInit is called with payloadEdit', () => {
    const payload = {
      id: '123',
      name: 'Test Product',
      description: 'Test Description',
      logo: 'logo.png',
      date_release: '2023-09-01',
      date_revision: '2023-09-10'
    };

    component.payloadEdit.set(payload);
    jest.spyOn(component, 'setValueForm'); // Spy on setValueForm method

    component.ngOnInit();

    expect(component.setValueForm).toHaveBeenCalled(); // Verify that setValueForm was called
  });

  it('should not call setValueForm when ngOnInit is called without payloadEdit', () => {
    jest.spyOn(component, 'setValueForm');

    component.ngOnInit();

    expect(component.setValueForm).not.toHaveBeenCalled(); // Verify that setValueForm was not called
  });

  it('should mark all fields as touched when form is invalid', () => {
    component.onSubmit(); // Call submit without filling the form

    // Check that all fields have been marked as touched
    expect(component.registerForm.controls['id'].touched).toBe(true);
    expect(component.registerForm.controls['name'].touched).toBe(true);
    expect(component.registerForm.controls['description'].touched).toBe(true);
    expect(component.registerForm.controls['logo'].touched).toBe(true);
    expect(component.registerForm.controls['date_release'].touched).toBe(true);
    expect(component.registerForm.controls['date_revision'].touched).toBe(true);
  });
});
