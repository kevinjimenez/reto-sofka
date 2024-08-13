import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogoComponent } from './logo.component';

describe('LogoComponent', () => {
	let component: LogoComponent;
	let fixture: ComponentFixture<LogoComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [LogoComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(LogoComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should set path when image input is set', () => {
		component.image = 'https://example.com/image.png';
		fixture.detectChanges();
		expect(component.path()).toBe('https://example.com/image.png');
	});

	it('should set hasError to true when setValue is called', () => {
		component.setValue();
		fixture.detectChanges();
		expect(component.hasError()).toBe(true);
	});
});
