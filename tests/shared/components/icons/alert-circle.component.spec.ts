import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertCircleComponent } from '../../../../src/app/shared/components';

describe('AlertCircleComponent', () => {
	let component: AlertCircleComponent;
	let fixture: ComponentFixture<AlertCircleComponent>;
	let compiled: HTMLElement;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AlertCircleComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AlertCircleComponent);
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
});
