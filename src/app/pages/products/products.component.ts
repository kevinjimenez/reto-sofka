import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PAGINATOR } from '../../common/constants';
import { Product } from '../../common/interfaces';
import { ButtonComponent, InputComponent } from '../../shared/components';
import { ProductsStore } from '../../store/product.store';
import { TableComponent } from './components/table/table.component';
import { debounceTime } from 'rxjs';

@Component({
	selector: 'app-products',
	standalone: true,
	imports: [TableComponent, InputComponent, ButtonComponent, ReactiveFormsModule],
	templateUrl: './products.component.html',
	styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
	private readonly _router = inject(Router);
	readonly productsStore = inject(ProductsStore);

	public fieldSearch = new FormControl();

	public originalProducts = signal<Product[]>([]);
	public cloneProducts = signal<Product[]>([]);

	constructor() {
		this.filterProducts();
	}

	public ngOnInit(): void {
		this.productsStore.loadAllByLimit(Number(PAGINATOR.default));
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

	private filterProducts(): void {
		this.fieldSearch.valueChanges.pipe(debounceTime(500)).subscribe((search: string) => {
			this.productsStore.loadAllByQuery(search);
		});
	}
}
