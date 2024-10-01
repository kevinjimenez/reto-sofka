import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastComponent } from './toast.component';
import { ComponentRef } from '@angular/core';

describe('ToastComponent', () => {
	let component: ToastComponent;
	let componentRef: ComponentRef<ToastComponent>;
	let fixture: ComponentFixture<ToastComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ToastComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(ToastComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

  it('should show the toast when show() is called', () => {
		component.isShow.set(true);
		expect(component.isShow()).toBe(true);
	});

	it('should hide the toast when hide() is called', () => {
		component.isShow();
		component.hide();
		expect(component.isShow()).toBe(false);
	});

	it('should display the text passed as input', () => {
		component.text = 'Test Toast Message';
		expect(component.text).toBe('Test Toast Message');
	});
});
