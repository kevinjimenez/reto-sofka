import { Routes } from '@angular/router';
import { productsResolver } from '../../core/resolvers/products.resolver';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('./create-edit-product.component').then((m) => m.CreateEditProductComponent),
		resolve: {
			products: productsResolver
		}
	},
	{
		path: ':id',
		loadComponent: () =>
			import('./create-edit-product.component').then((m) => m.CreateEditProductComponent),
		resolve: {
			products: productsResolver
		}
	}
];
