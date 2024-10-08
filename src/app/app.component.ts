import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SpinnerComponent } from './shared/components';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, SpinnerComponent],
	template: `
		<main>
			<router-outlet />
		</main>
		<app-spinner />
	`
})
export class AppComponent {}
