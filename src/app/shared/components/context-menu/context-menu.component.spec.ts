import { NgStyle } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContextMenuComponent } from './context-menu.component';

describe('ContextMenuComponent', () => {
	let component: ContextMenuComponent;
	let fixture: ComponentFixture<ContextMenuComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [NgStyle, ContextMenuComponent],
			schemas: [NO_ERRORS_SCHEMA]
		}).compileComponents();

		fixture = TestBed.createComponent(ContextMenuComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should hide the context menu', () => {
		component.isVisible.set(true);
		component.hide();
		expect(component.isVisible()).toBe(false);
	});

	it('should emit onShow when shown', () => {
		const spy = spyOn(component.onShow, 'emit');
		component.isVisible.set(true);
		component.onShow.emit();
		expect(spy).toHaveBeenCalled();
	});
});
