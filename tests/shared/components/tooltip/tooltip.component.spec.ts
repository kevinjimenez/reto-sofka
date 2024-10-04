import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TooltipComponent } from '../../../../src/app/shared/components/tooltip/tooltip.component';

describe('TooltipComponent', () => {
	let component: TooltipComponent;
	let fixture: ComponentFixture<TooltipComponent>;
	let compiled: HTMLElement;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TooltipComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TooltipComponent);
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

	it('should show the tooltip when show() is called', () => {
		component.show();
		fixture.detectChanges();

		expect(component.isVisible()).toBeTruthy();
	});

	it('should hide the tooltip when hide() is called', () => {
		component.hide();
		fixture.detectChanges();

		expect(component.isVisible()).toBeFalsy();
	});
});
