import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpinnerService } from '../../../core/services/spinner.service';
import { SpinnerComponent } from './spinner.component';

describe('SpinnerComponent', () => {
	let component: SpinnerComponent;
	let fixture: ComponentFixture<SpinnerComponent>;
	let spinnerServiceMock: jest.Mocked<SpinnerService>;

	beforeEach(async () => {
		spinnerServiceMock = {
			isLoading: signal<boolean>(true),
		} as jest.Mocked<SpinnerService>;

		await TestBed.configureTestingModule({
			imports: [SpinnerComponent],
			providers: [{ provide: SpinnerService, useValue: spinnerServiceMock }],
		}).compileComponents();

		fixture = TestBed.createComponent(SpinnerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should bind isLoading from the SpinnerService', () => {
		expect(component.isLoading()).toBe(true);
	});
});
