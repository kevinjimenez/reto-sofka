import { Injectable, signal } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class SpinnerService {
	public isLoading = signal<boolean>(false);

	public show() {
		this.isLoading.set(true);
	}

	public hide(time = 250) {
		setTimeout(() => {
			this.isLoading.set(false);
		}, time);
	}
}
