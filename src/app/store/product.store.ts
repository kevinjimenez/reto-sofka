import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { switchMap } from 'rxjs';
import { Product } from '../common/interfaces';
import { ProductsService } from '../core';

interface ProductsState {
	selectedProduct: Product | null;
	products: Product[];
	total: number;
	limit: number;
	filter: { query: string };
}

const initialState: ProductsState = {
	selectedProduct: null,
	products: [],
	total: 0,
	limit: 0,
	filter: { query: '' }
};

export const ProductsStore = signalStore(
	{ providedIn: 'root' },
	withState(initialState),
	withComputed(({ total, limit, selectedProduct }) => ({
		productsCount: computed(() => total()),
		productslimit: computed(() => limit()),
		product: computed(() => selectedProduct())
	})),
	withMethods(
		(
			{ filter, products, limit, selectedProduct, ...store },
			productsService = inject(ProductsService)
		) => ({
			setSelectedProduct: (product: Product | null) =>
				patchState(store, { selectedProduct: product }),
			loadAllByLimit: rxMethod<number>(
				switchMap((limit) =>
					productsService.getAll().pipe(
						tapResponse({
							next: (products) => {
								// update total
								const query = filter().query;
								const total = products.data.length;
								patchState(store, { total });

								// update products (records)
								const productsByLimit = products.data.slice(0, limit);
								const productsByQuery = productsByLimit.filter((product) =>
									product.name.includes(query)
								);
								patchState(store, { products: productsByQuery, limit });
							},
							error: (err) => {
								console.error(err);
							}
						})
					)
				)
			),
			loadAllByQuery: rxMethod<string>(
				switchMap((query) =>
					productsService.getAll().pipe(
						tapResponse({
							next: (products) => {
								// update total and filter
								const total = products.data.length;
								patchState(store, { total, filter: { query } });

								// update products (records)
								const productsByLimit = products.data.slice(0, limit());
								const productsByQuery = productsByLimit.filter((product) =>
									product.name.includes(query)
								);
								patchState(store, { products: productsByQuery });
							},
							error: (err) => {
								console.error(err);
							}
						})
					)
				)
			),
			remove: () => {
				const newProducts = products().filter((product) => product.id !== selectedProduct()?.id);
				const total = newProducts.length;
				const newSelectedProduct = null;
				patchState(store, {
					products: [...newProducts],
					total,
					selectedProduct: newSelectedProduct
				});
			}
		})
	)
);
