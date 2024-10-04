import { Component, Input, model } from '@angular/core';
import { BellRingingComponent } from '../icons/bell-ringing/bell-ringing.component';

@Component({
	selector: 'app-toast',
	standalone: true,
	imports: [BellRingingComponent],
	templateUrl: './toast.component.html',
	styleUrl: './toast.component.css'
})
export class ToastComponent {
	public isShow = model<boolean>(false);
	// public text = input<string>();
	@Input() public text = '';
	public hide() {
		this.isShow.set(false);
	}
}
