import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutComponent } from '../../src/app/layout/layout.component';

describe('LayoutComponent', () => {
	let component: LayoutComponent;
	let fixture: ComponentFixture<LayoutComponent>;
	let compiled: HTMLElement;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [LayoutComponent] // Importar el LayoutComponent aquí
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(LayoutComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		compiled = fixture.nativeElement;
	});

	it('should create the component', () => {
		expect(component).toBeTruthy();
	});

	it('should contain a router-outlet', () => {
		expect(compiled.querySelector('router-outlet')).toBeTruthy();
	});
});
