import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImagePipe } from '../../pipes/image.pipe';
import { IconButtonComponent } from './icon-button.component';

describe('IconButtonComponent', () => {
	let component: IconButtonComponent;
	let componentRef: ComponentRef<IconButtonComponent>;
	let fixture: ComponentFixture<IconButtonComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [IconButtonComponent, ImagePipe]
		}).compileComponents();

		fixture = TestBed.createComponent(IconButtonComponent);
		component = fixture.componentInstance;
		componentRef = fixture.componentRef;
		componentRef.setInput('icon', 'Feyd-Rautha');

		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
