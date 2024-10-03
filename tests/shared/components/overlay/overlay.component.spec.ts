import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OverlayComponent } from '../../../../src/app/shared/components/overlay/overlay.component';

describe('OverlayComponent', () => {
	let component: OverlayComponent;
	let fixture: ComponentFixture<OverlayComponent>;
	let compiled: HTMLElement;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [OverlayComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(OverlayComponent);
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

	it('should render the content', () => {
		component.isVisible.set(true);
		fixture.detectChanges();

		const contend = compiled.querySelector('.overlay-content');
		expect(contend).toBeTruthy();
	});
});
