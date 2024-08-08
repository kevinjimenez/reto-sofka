import { Component, inject, input, output, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
	AlertCircleComponent,
	ButtonComponent,
	ContextMenuComponent,
	ContextMenuOption,
	ContextMenuOptionSelected,
	IconButtonComponent,
	LogoComponent,
	OverlayComponent,
	ToastComponent
} from '../../../../shared/components';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../../../core';
import { Product } from '../../../../common/interfaces';
import { CONTEXT_MENU_OPTIONS } from '../../../../common/constants';

@Component({
	selector: 'app-table',
	standalone: true,
	imports: [
		LogoComponent,
		AlertCircleComponent,
		IconButtonComponent,
		OverlayComponent,
		ContextMenuComponent,
		ButtonComponent,
		FormsModule,
		ToastComponent
	],
	templateUrl: './table.component.html',
	styleUrl: './table.component.css'
})
export class TableComponent {
	private readonly _productsService = inject(ProductsService);

	public overlayVisible = signal<boolean>(false);
	public contextMenuVisible = signal<boolean>(false);
	public contextMenuX = signal<number>(0);
	public contextMenuY = signal<number>(0);
	public contextMenuOptions = signal<ContextMenuOption[]>(CONTEXT_MENU_OPTIONS);
	public itemSelected = signal<Product | null>(null);
	public toastVisible = signal<boolean>(false);
	public errorMsg = signal<string>('');

	public selectedValue: string = '5';

	public products = input<Product[]>([]);

	public onViewItems = output<number>();
	public onRemoveItem = output<string>();

	private readonly _router = inject(Router);

	public showOverlay() {
		this.overlayVisible.update(() => true);
	}

	public showContextMenu(event: MouseEvent, item: Product) {
		this.contextMenuX.set(event.clientX);
		this.contextMenuY.set(event.clientY);
		this.itemSelected.set(item);
		this.contextMenuVisible.update((state) => !state);
	}

	public optionSelected(optionSelected: ContextMenuOptionSelected) {
		// delete
		if (optionSelected.option === 2) {
			this.showOverlay();
		}

		// update
		if (optionSelected.option === 1) {
			this.showOverlay();
			this._router.navigate(['products', 'product', this.itemSelected()?.id], {
				state: { payload: this.itemSelected() }
			});
		}
	}

	public onDelete() {
		this._productsService.deleteById(this.itemSelected()?.id || '').subscribe({
			next: ({ message }) => {
				this.onRemoveItem.emit(this.itemSelected()!.id);
				this.overlayVisible.set(false);
				this.errorMsg.set(message);
				this.toastVisible.set(true);
			},
			error: (err) => {
				this.errorMsg.set(err.error.message);
				this.toastVisible.set(true);
			}
		});
	}

	public onSelectionChange(value: string) {
		this.onViewItems.emit(parseInt(value));
	}
}
