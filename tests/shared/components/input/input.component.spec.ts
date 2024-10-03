import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../../../src/app/shared/components/input/input.component';
import { ComponentRef } from '@angular/core';

describe('InputComponent', () => {
	let component: InputComponent;
	let fixture: ComponentFixture<InputComponent>;
	let componentRef: ComponentRef<InputComponent>;
	let compiled: HTMLElement;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [InputComponent, ReactiveFormsModule]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(InputComponent);
		component = fixture.componentInstance;
		componentRef = fixture.componentRef;
		fixture.detectChanges();
		compiled = fixture.nativeElement;
	});

	it('should create the component', () => {
		expect(component).toBeTruthy();
	});

	it('should match snapshot', () => {
		expect(compiled).toMatchSnapshot();
	});

	it('should return not show errorMessage', () => {
		const formControlMock = new FormControl();
		componentRef.setInput('label', 'Input');
		componentRef.setInput('control', formControlMock);
		fixture.detectChanges();

		const contendErrorMessage = compiled.querySelector('.error-text');
		expect(contendErrorMessage).toBeFalsy();
		expect(compiled.querySelector('.label')).toBeTruthy();

		componentRef.setInput('label', null);
		fixture.detectChanges();

		expect(compiled.querySelector('.label')).toBeFalsy();
	});

	it('should return errorMessage', () => {
		const formControlMock = new FormControl();
		const expectedErrorMessage = 'El campo Input es requerido';
		componentRef.setInput('label', 'Input');
		componentRef.setInput('control', formControlMock);
		component.control().markAllAsTouched();
		fixture.detectChanges();

		component.control().setErrors({ required: true });
		expect(component.errorMessage).toBe(expectedErrorMessage);
		fixture.detectChanges();

		const contendErrorMessage = compiled.querySelector('.error-text');
		expect(contendErrorMessage?.textContent).toBe(expectedErrorMessage);
	});

	it('should return null when control is null', () => {
		const formControlMock = new FormControl();
		componentRef.setInput('control', formControlMock);
		fixture.detectChanges();

		componentRef.setInput('control', null);

		expect(component.errorMessage).toBeNull();
	});
});
