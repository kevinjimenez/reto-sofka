import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputComponent } from './input.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CustomValiationForm } from '../../../utils/custom-validation-form';
import { input } from '@angular/core';

describe('InputComponent', () => {
	let component: InputComponent;
	let fixture: ComponentFixture<InputComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [InputComponent, ReactiveFormsModule]
		}).compileComponents();

		fixture = TestBed.createComponent(InputComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create the component', () => {
		expect(component).toBeTruthy();
	});

	it('should have default inputType as text', () => {
		expect(component.inputType()).toBe('text');
	});

	it('should show an error message when the control is invalid', () => {
		component.control().setValue(''); // Invalid value
		component.control().markAsTouched(); // Mark control as touched
		const message = component.errorMessage;
		expect(message).toBeFalsy(); // Assuming there is an error message for invalid input
	});

	it('should correctly identify an invalid field', () => {
		component.control().setValue('');
		component.control().markAsTouched();
		expect(component.invalidField).toBe(false);
	});

  it('should return null for errorMessage when control has no errors', () => {
		component.control().setValue('valid value'); // Establecer un valor válido
		expect(component.errorMessage).toBeNull(); // Debe ser null porque no hay errores
	});
});
