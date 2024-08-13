import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
	{
		path: 'products',
		component: LayoutComponent,
		children: [
			{
				path: '',
				loadChildren: () => import('./pages/products/products.routes').then((m) => m.routes)
			},
			{
				path: '',
				redirectTo: '',
				pathMatch: 'full'
			}
		]
	},
	{
		path: '',
		redirectTo: 'products',
		pathMatch: 'full'
	}
	// {
	//   path: '**',
	//   loadComponent: () =>
	//     import('./pages/not-found/not-found.component').then(m => m.default),
	// },
];
