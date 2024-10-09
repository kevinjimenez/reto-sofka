import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { Product } from '../../common/interfaces';
import { ButtonComponent, InputComponent } from '../../shared/components';
import { TableComponent } from './components/table/table.component';
import { PAGINATOR } from '../../common/constants';
import { StoreService } from '../../core';

@Component({
	selector: 'app-products',
	standalone: true,
	imports: [TableComponent, InputComponent, ButtonComponent, ReactiveFormsModule],
	templateUrl: './products.component.html',
	styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
	private readonly _router = inject(Router);
	private readonly _activatedRoute = inject(ActivatedRoute);
	private readonly _storeService = inject(StoreService);

	public fieldSearch = new FormControl();

	public originalProducts = signal<Product[]>([]);
	public total = computed(() => this.originalProducts().length);
	public cloneProducts = signal<Product[]>([]);
	public take = signal<number>(Number(PAGINATOR.default));

	constructor() {
		this.filterProducts();
	}

	public ngOnInit(): void {
		this.getRouteParams();
	}

	public onNewProduct(): void {
		this._router.navigate(['products', 'product']);
	}

	public onRemoveItem(id: string): void {
		const newCloneProducts = this.cloneProducts().filter((product) => product.id !== id);
		const newOriginalProducts = this.originalProducts().filter((product) => product.id !== id);
		this.cloneProducts.update(() => newCloneProducts);
		this.originalProducts.update(() => newOriginalProducts);
	}

	public onViewItems(value: number): void {
		this.take.update(() => value);
		this.cloneProducts.update(() => this.originalProducts().slice(0, value));
	}

	private getRouteParams(): void {
		this._activatedRoute.data.subscribe(({ products }) => {
			// use observer pattern
			this._storeService.products = products.data;
			//
			this.originalProducts.set(products.data);
			this.cloneProducts.set(products.data.slice(0, this.take()));
		});
	}

	private filterProducts(): void {
		this.fieldSearch.valueChanges.pipe(debounceTime(500)).subscribe((search: string) => {
			const products = this.originalProducts().slice(0, this.take());

			if (!search && search === '') {
				this.cloneProducts.set(products);
				return;
			}

			const newCloneProducts = products.filter((product) => {
				return product.name.includes(search);
			});
			this.cloneProducts.set(newCloneProducts);
		});
	}
}
