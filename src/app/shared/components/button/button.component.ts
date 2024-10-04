import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
	selector: 'app-button',
	standalone: true,
	imports: [NgClass],
	templateUrl: './button.component.html',
	styleUrl: './button.component.css'
})
export class ButtonComponent {
	public buttonType = input<'button' | 'submit'>('button');
	public label = input<string>();
	public color = input<'primary-brand' | 'second-brand'>('primary-brand');
	public customClass = input<string>();
	public isFull = input<boolean>(false);
	public onClick = output();

	private get buttonColor() {
		return {
			primary: this.color() === 'primary-brand',
			secundary: this.color() === 'second-brand'
		};
	}

	protected get buttonClass() {
		return {
			...this.buttonColor,
			[this.customClass() ?? '']: this.customClass() !== null
		};
	}
}
