import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SpinnerComponent } from './shared/components';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, SpinnerComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css'
})
export class AppComponent {}
