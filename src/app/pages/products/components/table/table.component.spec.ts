import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ProductsService } from '../../../../core';
import { TableComponent } from './table.component';
import { ContextMenuOptionSelected } from '../../../../shared/components';
import { MENU_OPTIONS } from '../../../../common/enums';
import { of } from 'rxjs';

describe('TableComponent', () => {
	let component: TableComponent;
	let fixture: ComponentFixture<TableComponent>;
	let productsServiceMock: jest.Mocked<ProductsService>;
	let routerMock: jest.Mocked<Router>;

	beforeEach(async () => {
		productsServiceMock = {
      deleteById: jest.fn(),
    } as unknown as jest.Mocked<ProductsService>;

		routerMock = {
      navigate: jest.fn(),
    } as unknown as jest.Mocked<Router>;

		await TestBed.configureTestingModule({
			imports: [TableComponent],
			providers: [
				{ provide: ProductsService, useValue: productsServiceMock },
				{ provide: Router, useValue: routerMock },
			],
		}).compileComponents();

		fixture = TestBed.createComponent(TableComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should navigate to product edit page when update is selected', () => {
		const mockProduct = { id: '1', name: 'Product 1' } as any; // Un producto de ejemplo

		// Simula la selección del producto
		component.itemSelected.set(mockProduct);

		// Simula la opción de actualización
		component.optionSelected({ option: MENU_OPTIONS.UPDATE } as ContextMenuOptionSelected);

		// Verifica que el componente navegue a la ruta correcta
		expect(routerMock.navigate).toHaveBeenCalledWith(['products', 'product', mockProduct.id], {
			state: { payload: mockProduct },
		});
	});

	it('should call deleteById and emit onRemoveItem when onDelete is called', () => {
		const mockProduct = { id: '1', name: 'Product 1' } as any; // Un producto de ejemplo
		component.itemSelected.set(mockProduct);

		// Mock de respuesta del servicio de eliminación
		productsServiceMock.deleteById.mockReturnValue(of({ message: 'Product deleted' } as any));

		const emitSpy = jest.spyOn(component.onRemoveItem, 'emit'); // Espía el evento de eliminación

		component.onDelete(); // Llama al método de eliminación

		expect(productsServiceMock.deleteById).toHaveBeenCalledWith(mockProduct.id); // Verifica que se haya llamado al servicio
		expect(emitSpy).toHaveBeenCalledWith(mockProduct.id); // Verifica que se haya emitido el evento
	});

	it('should emit onViewItems when onSelectionChange is called', () => {
		const emitSpy = jest.spyOn(component.onViewItems, 'emit'); // Espía el evento de selección

		const newValue = '10'; // Nuevo valor del select
		component.onSelectionChange(newValue); // Cambia el valor

		expect(emitSpy).toHaveBeenCalledWith(10); // Verifica que se haya emitido el valor como número
	});
});
