import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () => import('../products/products.component').then((m) => m.ProductsComponent)
		// resolve: {
		// 	products: productsResolver
		// }
	},
	{
		path: 'product',
		loadChildren: () =>
			import('../create-edit-product/create-edit-product.routes').then((m) => m.routes)
	}
];
