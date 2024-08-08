import { Component, input, output } from '@angular/core';
import { ImagePipe } from '../../pipes/image.pipe';

@Component({
	selector: 'app-icon-button',
	standalone: true,
	imports: [ImagePipe],
	templateUrl: './icon-button.component.html',
	styleUrl: './icon-button.component.css'
})
export class IconButtonComponent {
	public icon = input.required<string>();

	public buttonType = input<'button' | 'submit'>('button');
	// @Output() public onClick: EventEmitter<void> = new EventEmitter();
	public onClick = output<MouseEvent>();
}
