import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OverlayComponent } from './overlay.component';

describe('OverlayComponent', () => {
	let component: OverlayComponent;
	let fixture: ComponentFixture<OverlayComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [OverlayComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(OverlayComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should initialize isVisible to false', () => {
		expect(component.isVisible()).toBe(false);
	});

	it('should update isVisible correctly', () => {
		component.isVisible.set(true);
		fixture.detectChanges();
		expect(component.isVisible()).toBe(true);
	});
});
