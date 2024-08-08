import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CustomValiationForm } from '../../../utils/custom-validation-form';
import { NgClass } from '@angular/common';

@Component({
	selector: 'app-input',
	standalone: true,
	imports: [ReactiveFormsModule, NgClass],
	templateUrl: './input.component.html',
	styleUrl: './input.component.css'
})
export class InputComponent {
	// @Input() inputType: 'text' | 'number' = 'text';
	public inputType = input<'text' | 'number' | 'date'>('text');
	// @Input() placeholder: string = 'Search';
	public placeholder = input<string>('Search');
	public label = input<string>();
	public control = input<FormControl>(new FormControl());
	public required = input<boolean>(false);

	protected get invalidField() {
		return this.control().touched && this.control().invalid;
	}

	protected get errorMessage(): string | null {
		if (!this.control() && !this.control().errors) return null;

		return CustomValiationForm.message(this.control().errors!, this.label());
	}
}
