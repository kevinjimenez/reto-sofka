import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpinnerService } from '../../../core/services/spinner.service';
import { SpinnerComponent } from './spinner.component';

describe('SpinnerComponent', () => {
	let component: SpinnerComponent;
	let fixture: ComponentFixture<SpinnerComponent>;
	let spinnerService: jasmine.SpyObj<SpinnerService>;

	beforeEach(async () => {
		const spinnerServiceSpy = jasmine.createSpyObj('SpinnerService', [], {
			isLoading: signal<boolean>(true)
		});

		await TestBed.configureTestingModule({
			imports: [SpinnerComponent],
			providers: [{ provide: SpinnerService, useValue: spinnerServiceSpy }]
		}).compileComponents();

		fixture = TestBed.createComponent(SpinnerComponent);
		component = fixture.componentInstance;
		spinnerService = TestBed.inject(SpinnerService) as jasmine.SpyObj<SpinnerService>;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should bind isLoading from the SpinnerService', () => {
		expect(component.isLoading()).toBe(true);
	});
});
