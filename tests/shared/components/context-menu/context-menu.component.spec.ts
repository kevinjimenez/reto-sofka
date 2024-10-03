import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContextMenuComponent } from '../../../../src/app/shared/components';
import { CONTEXT_MENU_OPTIONS } from '../../../../src/app/common/constants';
import { Product } from '../../../../src/app/common/interfaces';

describe('ContextMenuComponent', () => {
	let component: ContextMenuComponent;
	let componentRef: ComponentRef<ContextMenuComponent>;
	let fixture: ComponentFixture<ContextMenuComponent>;
	let compiled: HTMLElement;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ContextMenuComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ContextMenuComponent);
		component = fixture.componentInstance;
		componentRef = fixture.componentRef;
		fixture.detectChanges();
		compiled = fixture.nativeElement;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should match snapshot', () => {
		expect(compiled).toMatchSnapshot();
	});

	it('should not render the context menu when isVisible is false', () => {
		component.isVisible.set(false);
		fixture.detectChanges();

		expect(compiled.querySelector('.context-menu')).toBeNull();
	});

	it('should hide render the context menu', () => {
		componentRef.setInput('options', CONTEXT_MENU_OPTIONS);
		component.isVisible.set(true);
		fixture.detectChanges();

		expect(compiled.querySelector('.context-menu')).toBeTruthy();

		component.hide();
		fixture.detectChanges();

		expect(compiled.querySelector('.context-menu')).toBeNull();
	});

	it('should render the context menu', () => {
		componentRef.setInput('options', CONTEXT_MENU_OPTIONS);
		component.isVisible.set(true);
		fixture.detectChanges();

		expect(compiled.querySelector('.context-menu')).toBeTruthy();
	});

	it('should emit optionSelected when an option is selected', () => {
		jest.spyOn(component.optionSelected, 'emit');
		component.itemSelected.set({ id: '1', name: 'Test Item' } as Product);
		component.onOptionSelected(0);
		fixture.detectChanges();

		expect(component.optionSelected.emit).toHaveBeenCalledWith({
			option: 0,
			item: component.itemSelected()
		});
	});

	it('should hide the context menu when document is clicked', () => {
		componentRef.setInput('options', CONTEXT_MENU_OPTIONS);
		component.isVisible.set(true); // Asegúrate de que es visible
		fixture.detectChanges();

		component.onDocumentClick(new MouseEvent('click'));
		expect(component.isVisible()).toBeFalsy();
	});
});
