import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { MENU_OPTIONS } from '../../../src/app/common/enums';
import { Product } from '../../../src/app/common/interfaces';
import { ProductsService } from '../../../src/app/core';
import { TableComponent } from '../../../src/app/pages/products/components/table/table.component';
import { ContextMenuOptionSelected } from '../../../src/app/shared/components';

const mockProduct: Product = {
	id: '1',
	name: 'Product 1',
	description: 'Description 1',
	logo: 'logo1.png',
	date_release: '2024-01-01',
	date_revision: '2024-01-01'
};

describe('TableComponent', () => {
	let component: TableComponent;
	let componentRef: ComponentRef<TableComponent>;
	let fixture: ComponentFixture<TableComponent>;
	let compiled: HTMLElement;
	let productsServiceMock = { deleteById: jest.fn() };
	let routerMock = { navigate: jest.fn() };

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TableComponent],
			providers: [
				{ provide: ProductsService, useValue: productsServiceMock },
				{ provide: Router, useValue: routerMock }
			]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TableComponent);
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

	describe('optionSelected', () => {
		it('should navigate to product edit page when update is selected', () => {
			component.itemSelected.set(mockProduct);
			component.optionSelected({ option: MENU_OPTIONS.UPDATE } as ContextMenuOptionSelected);
			expect(routerMock.navigate).toHaveBeenCalledWith(['products', 'product', mockProduct.id], {
				state: { payload: mockProduct }
			});
		});

		it('should navigate to product delete page when delete is selected', () => {
			component.itemSelected.set(mockProduct);
			component.optionSelected({ option: MENU_OPTIONS.DELETE } as ContextMenuOptionSelected);

			expect(component.overlayVisible()).toBe(true);
		});
	});

	describe('onDelete', () => {
		it('should call deleteById and emit onRemoveItem when onDelete is called', () => {
			component.itemSelected.set(mockProduct);
			productsServiceMock.deleteById.mockReturnValue(of({ message: 'Product deleted' } as any));
			const onRemoveItemSpy = jest.spyOn(component.onRemoveItem, 'emit');
			component.onDelete();

			expect(productsServiceMock.deleteById).toHaveBeenCalledWith(mockProduct.id);
			expect(onRemoveItemSpy).toHaveBeenCalledWith(mockProduct.id);
		});

		it('should trhow error when deleteById', () => {
			const errorMessage = 'Error deleting product';
			productsServiceMock.deleteById.mockReturnValue(
				throwError(() => {
					return { error: { message: errorMessage } };
				})
			);

			component.onDelete();

			expect(productsServiceMock.deleteById).toHaveBeenCalledWith('');

			expect(component.errorMsg()).toBe(errorMessage);
			expect(component.toastVisible()).toBe(true);
		});
	});

	describe('onSelectionChange', () => {
		it('should emit onViewItems when onSelectionChange is called', () => {
			const onViewItemsSpy = jest.spyOn(component.onViewItems, 'emit');
			const newValue = '10';
			component.onSelectionChange(newValue);

			expect(onViewItemsSpy).toHaveBeenCalledWith(10);
		});
	});

	describe('showContextMenu', () => {
		it('should show context menu', () => {
			componentRef.setInput('products', [mockProduct]);
			fixture.detectChanges();

			const event = new MouseEvent('click');
			component.showContextMenu(event, mockProduct);

			expect(component.contextMenuVisible()).toBe(true);
		});
	});
});
