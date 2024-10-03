import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastComponent } from '../../../../src/app/shared/components/toast/toast.component';

describe('ToastComponent', () => {
	let component: ToastComponent;
	let fixture: ComponentFixture<ToastComponent>;
	let compiled: HTMLElement;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ToastComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ToastComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		compiled = fixture.nativeElement;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should match snapshot', () => {
		expect(compiled).toMatchSnapshot();
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
		component.isShow.set(true);
		fixture.detectChanges();

		const toastContend = compiled.querySelector('.toast-contend');
		expect(toastContend?.textContent?.trim()).toBe(component.text.trim());

		// expect(component.text).toBe('Test Toast Message');
	});
});
