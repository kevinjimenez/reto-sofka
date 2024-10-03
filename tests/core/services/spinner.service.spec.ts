import { TestBed } from '@angular/core/testing';
import { SpinnerService } from '../../../src/app/core';

describe('SpinnerService', () => {
	let service: SpinnerService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [SpinnerService]
		});
		service = TestBed.inject(SpinnerService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should set isLoading to true when show is called', () => {
		service.show();
		expect(service.isLoading()).toBe(true);
	});

	it('should set isLoading to false when hide is called', (done) => {
		const customDelay = 500;
		service.hide(customDelay);
		setTimeout(() => {
			expect(service.isLoading()).toBe(false);
			done();
		}, customDelay);
	});

	it('should set isLoading to false after the default delay when hide is called', (done) => {
		const customDelay = 250;
		service.show();
		service.hide();
		setTimeout(() => {
			expect(service.isLoading()).toBe(false);
			done();
		}, customDelay);
	});
});
