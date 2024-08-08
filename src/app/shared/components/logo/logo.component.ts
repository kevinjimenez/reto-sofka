import { Component, Input, signal } from '@angular/core';

@Component({
	selector: 'app-logo',
	standalone: true,
	imports: [],
	templateUrl: './logo.component.html',
	styleUrl: './logo.component.css'
})
export class LogoComponent {
	public path = signal<string>('https://placehold.co/600x400');
	public hasError = signal<boolean>(false);
	@Input() set image(value: string) {
		if (value) {
			this.path.set(value);
		}
	}

	setValue() {
		this.hasError.set(true);
	}
}
