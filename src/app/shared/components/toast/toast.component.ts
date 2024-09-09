import { Component, Input, input, model, OnInit } from '@angular/core';

@Component({
	selector: 'app-toast',
	standalone: true,
	imports: [],
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
