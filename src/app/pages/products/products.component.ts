import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { Product } from '../../common/interfaces';
import { ButtonComponent, InputComponent } from '../../shared/components';
import { TableComponent } from './components/table/table.component';

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

	public fieldSearch = new FormControl();

	public originalProducts = signal<Product[]>([]);
	public cloneProducts = signal<Product[]>([]);
	public take = signal<number>(5);

	constructor() {
		this.fieldSearch.valueChanges.pipe(debounceTime(500)).subscribe((search: string) => {
			if (!search && search === '') {
				this.cloneProducts.set(this.originalProducts().slice(0, this.take())); // cambiar
				return;
			}

			const newCloneProducts = this.cloneProducts().filter((product) => {
				return product.name.includes(search);
			});
			this.cloneProducts.set(newCloneProducts);
		});
	}

	ngOnInit(): void {
		this._activatedRoute.data.subscribe(({ products }) => {
			this.originalProducts.set(products.data);
			this.cloneProducts.set(products.data.slice(0, this.take())); // cambiar
		});
	}

	onNewProduct(): void {
		this._router.navigate(['products', 'product']);
	}

	onRemoveItem(id: string): void {
		const newCloneProducts = this.cloneProducts().filter((product) => product.id !== id);
		const newOriginalProducts = this.originalProducts().filter((product) => product.id !== id);
		this.cloneProducts.update(() => newCloneProducts);
		this.originalProducts.update(() => newOriginalProducts);
	}

	onViewItems(value: number): void {
		this.take.update(() => value);
		this.cloneProducts.update(() => this.originalProducts().slice(0, value));
	}
}
