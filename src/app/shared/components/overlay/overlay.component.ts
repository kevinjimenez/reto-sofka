import { Component, model } from '@angular/core';

@Component({
	selector: 'app-overlay',
	standalone: true,
	imports: [],
	templateUrl: './overlay.component.html',
	styleUrl: './overlay.component.css'
})
export class OverlayComponent {
	public isVisible = model<boolean>(false);
}
