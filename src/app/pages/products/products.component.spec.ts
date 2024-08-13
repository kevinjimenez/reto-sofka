import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
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
	let httpTestingController: HttpTestingController;

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
		httpTestingController = TestBed.inject(HttpTestingController);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
