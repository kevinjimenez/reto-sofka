import { Component, input, model, OnInit } from '@angular/core';

@Component({
	selector: 'app-toast',
	standalone: true,
	imports: [],
	templateUrl: './toast.component.html',
	styleUrl: './toast.component.css'
})
export class ToastComponent {
	public isShow = model<boolean>(false);
	public text = input<string>();

	public hide() {
		this.isShow.set(false);
	}
}
