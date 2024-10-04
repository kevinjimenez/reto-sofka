import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('./create-edit-product.component').then((m) => m.CreateEditProductComponent)
	},
	{
		path: ':id',
		loadComponent: () =>
			import('./create-edit-product.component').then((m) => m.CreateEditProductComponent)
	}
];
