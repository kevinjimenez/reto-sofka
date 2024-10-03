import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImagePipe } from '../../../../src/app/shared/pipes/image.pipe';
import { IconButtonComponent } from '../../../../src/app/shared/components/icon-button/icon-button.component';

describe('IconButtonComponent', () => {
	let component: IconButtonComponent;
	let componentRef: ComponentRef<IconButtonComponent>;
	let fixture: ComponentFixture<IconButtonComponent>;
	let compiled: HTMLElement;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [IconButtonComponent, ImagePipe]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(IconButtonComponent);
		component = fixture.componentInstance;
		componentRef = fixture.componentRef;
		componentRef.setInput('icon', 'test');

		fixture.detectChanges();
		compiled = fixture.nativeElement;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should match snapshot', () => {
		expect(compiled).toMatchSnapshot();
	});

	it('should render icon button', () => {
		componentRef.setInput('icon', 'test');
		fixture.detectChanges();

		const button = compiled.querySelector('button');
		const img = compiled.querySelector('img') as HTMLImageElement;
		expect(button).toBeTruthy();
		expect(img).toBeTruthy();
		expect(img.alt).toBe('test');
	});
});
