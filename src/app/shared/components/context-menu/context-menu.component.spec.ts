import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContextMenuComponent } from './context-menu.component';
import { By } from '@angular/platform-browser';
import { Product } from '../../../common/interfaces';

describe('ContextMenuComponent', () => {
	let component: ContextMenuComponent;
	let fixture: ComponentFixture<ContextMenuComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ContextMenuComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(ContextMenuComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should emit optionSelected when an option is selected', () => {
		jest.spyOn(component.optionSelected, 'emit'); // Espía el método emit
		component.itemSelected.set({ id: '1', name: 'Test Item' } as Product); // Establece un producto de prueba
		component.onOptionSelected(0); // Llama a la función con una opción

		expect(component.optionSelected.emit).toHaveBeenCalledWith({
			option: 0,
			item: component.itemSelected()
		}); // Verifica que se haya emitido el evento correcto
	});

	it('should hide the context menu when hide() is called', () => {
		component.isVisible.set(true); // Asegúrate de que es visible
		component.hide(); // Llama al método hide
		expect(component.isVisible()).toBeFalsy(); // Verifica que ya no sea visible
	});

	it('should hide the context menu when document is clicked', () => {
		component.isVisible.set(true); // Asegúrate de que es visible
		component.onDocumentClick(new MouseEvent('click')); // Simula un clic en el documento
		expect(component.isVisible()).toBeFalsy(); // Verifica que ya no sea visible
	});
});
