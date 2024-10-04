import { NgClass } from '@angular/common';
import { Component, Input, signal } from '@angular/core';

@Component({
	selector: 'app-tooltip',
	standalone: true,
	imports: [NgClass],
	templateUrl: './tooltip.component.html',
	styleUrl: './tooltip.component.css'
})
export class TooltipComponent {
	@Input() text: string = '';
	public isVisible = signal<boolean>(false);

	show() {
		this.isVisible.set(true);
	}

	hide() {
		this.isVisible.set(false);
	}
}
