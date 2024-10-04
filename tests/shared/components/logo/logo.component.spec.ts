import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogoComponent } from '../../../../src/app/shared/components/logo/logo.component';

describe('LogoComponent', () => {
	let component: LogoComponent;
	let fixture: ComponentFixture<LogoComponent>;
	let compiled: HTMLElement;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [LogoComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(LogoComponent);
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

	it('should set path to default value when image input is not set', () => {
		const contend = compiled.querySelector('img');
		expect(contend).toBeTruthy();
		expect(component.path()).toBe('https://placehold.co/600x400');
	});

	it('should set path', () => {
		const expeected = 'https://example.com/image.png';
		component.image = expeected;
		fixture.detectChanges();

		const contend = compiled.querySelector('img');
		expect(contend).toBeTruthy();
		expect(component.path()).toBe(expeected);
	});

	it('should render default content when load img error', () => {
		component.image = '://example.com/image.png';
		component.setError();
		fixture.detectChanges();

		const contend = compiled.querySelector('img');
		expect(contend).toBeTruthy();
	});
});
