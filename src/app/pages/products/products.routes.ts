import { Routes } from '@angular/router';
import { productsResolver } from '../../core/resolvers/products.resolver';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () => import('../products/products.component').then((m) => m.ProductsComponent),
		resolve: {
			products: productsResolver
		}
	},
	{
		path: 'product',
		loadChildren: () =>
			import('../create-edit-product/create-edit-product.routes').then((m) => m.routes)
	}
];
