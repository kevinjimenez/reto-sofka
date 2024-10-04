import { Component, Input, signal } from '@angular/core';
import { ImagePipe } from '../../pipes';

@Component({
	selector: 'app-logo',
	standalone: true,
	imports: [ImagePipe],
	templateUrl: './logo.component.html',
	styleUrl: './logo.component.css'
})
export class LogoComponent {
	public path = signal<string>('https://placehold.co/600x400');
	public default = signal<string>('photo.svg');
	public hasError = signal<boolean>(false);
	@Input() set image(value: string) {
		if (value) {
			this.path.set(value);
		}
	}

	public setError() {
		this.hasError.set(true);
	}
}
