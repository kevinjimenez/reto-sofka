import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../common/interfaces';

interface StoreInterface {
	products: Product[];
}

@Injectable({
	providedIn: 'root'
})
export class StoreService {
	private initialState: StoreInterface = {
		products: []
	};

	private _store: BehaviorSubject<StoreInterface> = new BehaviorSubject<StoreInterface>(
		this.initialState
	);
	public readonly store = this._store.asObservable();

	set products(products: Product[]) {
		this._store.next({ products: [...products] });
	}

	get products(): Product[] {
		return this._store.value.products;
	}
}
