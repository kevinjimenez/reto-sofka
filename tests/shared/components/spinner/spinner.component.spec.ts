import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpinnerService } from '../../../../src/app/core/services/spinner.service';
import { SpinnerComponent } from '../../../../src/app/shared/components/spinner/spinner.component';

describe('SpinnerComponent', () => {
	let component: SpinnerComponent;
	let fixture: ComponentFixture<SpinnerComponent>;
	let compiled: HTMLElement;
	// let spinnerServiceMock: jest.Mocked<SpinnerService>;
	let spinnerServiceMock = {
		isLoading: signal<boolean>(false)
	};

	beforeEach(async () => {
		// spinnerServiceMock = {
		// 	isLoading: signal<boolean>(true)
		// } as jest.Mocked<SpinnerService>;

		await TestBed.configureTestingModule({
			imports: [SpinnerComponent],
			providers: [{ provide: SpinnerService, useValue: spinnerServiceMock }]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(SpinnerComponent);
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

	// it('should show the spinner when isLoading is true', () => {
	// 	const expected = 'Loading...';
	// 	component.isLoading.set(true);
	// 	fixture.detectChanges();

	// 	const contend = compiled.querySelector('.overlay');
	// 	expect(contend?.textContent).toBe(expected);
	// });
});
