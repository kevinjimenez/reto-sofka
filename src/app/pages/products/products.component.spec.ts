import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { ButtonComponent, InputComponent } from '../../shared/components';
import { TableComponent } from './components/table/table.component';
import { ProductsComponent } from './products.component';

describe('ProductsComponent', () => {
	let component: ProductsComponent;
	let fixture: ComponentFixture<ProductsComponent>;
	let routerSpy: jasmine.SpyObj<Router>;
	let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;

	beforeEach(async () => {
		routerSpy = jasmine.createSpyObj('Router', ['navigate']);
		activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['data']);

		activatedRouteSpy.data = of({
			products: {
				data: [
					{
						id: '1',
						name: 'Product 1',
						description: 'Description 1',
						logo: 'logo1.png',
						date_release: '2024-01-01',
						date_revision: '2024-01-01'
					},
					{
						id: '2',
						name: 'Product 2',
						description: 'Description 2',
						logo: 'logo2.png',
						date_release: '2024-01-01',
						date_revision: '2024-01-01'
					}
				]
			}
		});

		await TestBed.configureTestingModule({
			imports: [
				ProductsComponent,
				TableComponent,
				InputComponent,
				ButtonComponent,
				ReactiveFormsModule,
				HttpClientTestingModule
			],
			providers: [
				{ provide: Router, useValue: routerSpy },
				{ provide: ActivatedRoute, useValue: activatedRouteSpy }
			]
		}).compileComponents();

		fixture = TestBed.createComponent(ProductsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should initialize products on ngOnInit', () => {
		expect(component.originalProducts()).toEqual([
			{
				id: '1',
				name: 'Product 1',
				description: 'Description 1',
				logo: 'logo1.png',
				date_release: '2024-01-01',
				date_revision: '2024-01-01'
			},
			{
				id: '2',
				name: 'Product 2',
				description: 'Description 2',
				logo: 'logo2.png',
				date_release: '2024-01-01',
				date_revision: '2024-01-01'
			}
		]);
		expect(component.cloneProducts()).toEqual(
			component.originalProducts().slice(0, component.take())
		);
	});

	it('should call onNewProduct when "Agregar" button is clicked', () => {
		spyOn(component, 'onNewProduct').and.callThrough(); // Asegura que el método 'onNewProduct' siga ejecutándose
		const buttonComponent = fixture.debugElement.query(By.directive(ButtonComponent));
		buttonComponent.triggerEventHandler('onClick', null); // Simula el evento de clic

		expect(component.onNewProduct).toHaveBeenCalled();
		expect(routerSpy.navigate).toHaveBeenCalledWith(['products', 'product']); // Verifica que Router.navigate haya sido llamado
	});

	it('should update cloneProducts on search input', (done) => {
		component.fieldSearch.setValue('Product 1');
		setTimeout(() => {
			expect(component.cloneProducts()).toEqual([
				{
					id: '1',
					name: 'Product 1',
					description: 'Description 1',
					logo: 'logo1.png',
					date_release: '2024-01-01',
					date_revision: '2024-01-01'
				}
			]);
			done();
		}, 600); // Se espera debido al debounceTime de 500ms
	});

	it('should reset cloneProducts when search input is cleared', (done) => {
		component.fieldSearch.setValue('Product 1');
		setTimeout(() => {
			component.fieldSearch.setValue('');
			setTimeout(() => {
				expect(component.cloneProducts()).toEqual(
					component.originalProducts().slice(0, component.take())
				);
				done();
			}, 600);
		}, 600);
	});

	it('should call onRemoveItem and remove a product from the list', () => {
		const initialLength = component.cloneProducts().length;
		const productToRemove = '1'; // ID del producto a eliminar
		component.onRemoveItem(productToRemove);
		expect(component.cloneProducts().length).toBe(initialLength - 1);
		expect(component.cloneProducts().some((p) => p.id === productToRemove)).toBe(false);
	});

	it('should call onViewItems and update visible products based on "take" value', () => {
		component.onViewItems(1); // Mostrar solo 1 producto
		expect(component.cloneProducts().length).toBe(1);
		expect(component.cloneProducts()).toEqual([
			{
				id: '1',
				name: 'Product 1',
				description: 'Description 1',
				logo: 'logo1.png',
				date_release: '2024-01-01',
				date_revision: '2024-01-01'
			}
		]);
	});
});
