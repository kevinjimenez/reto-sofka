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
});
