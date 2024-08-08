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
	// @Input() buttonType: 'button' | 'submit' = 'button';
	public buttonType = input<'button' | 'submit'>('button');
	// @Input({ required: true }) public label!: string;
	public label = input<string>();
	public color = input<'primary-brand' | 'second-brand'>('primary-brand');
	public customClass = input<string>();
	// @Output() public onClick: EventEmitter<void> = new EventEmitter();
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
