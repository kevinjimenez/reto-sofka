import { Component, computed, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
	CONTEXT_MENU_OPTIONS,
	PAGINATOR,
	PRODUCT_TABLE_HEADERS
} from '../../../../common/constants';
import { MENU_OPTIONS } from '../../../../common/enums';
import { Product } from '../../../../common/interfaces';
import { ProductsService } from '../../../../core';
import {
	AlertCircleComponent,
	ButtonComponent,
	ContextMenuComponent,
	ContextMenuOptionSelected,
	IconButtonComponent,
	LogoComponent,
	OverlayComponent,
	ToastComponent,
	TooltipComponent
} from '../../../../shared/components';
import { TooltipDirective } from '../../../../shared/directives';
import { ProductsStore } from '../../../../store/product.store';

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
		ToastComponent,
		TooltipComponent,
		TooltipDirective
	],
	templateUrl: './table.component.html',
	styleUrl: './table.component.css'
})
export class TableComponent {
	private readonly _productsService = inject(ProductsService);
	private readonly _router = inject(Router);
	readonly productsStore = inject(ProductsStore);

	public overlayVisible = signal<boolean>(false);
	public contextMenuVisible = signal<boolean>(false);
	public contextMenuX = signal<number>(0);
	public contextMenuY = signal<number>(0);
	public itemSelected = signal<Product | null>(null);
	public toastVisible = signal<boolean>(false);
	public errorMsg = signal<string>('');

	public paginator = computed(() => PAGINATOR);
	public contextMenuOptions = computed(() => CONTEXT_MENU_OPTIONS);
	public productHeaders = computed(() => PRODUCT_TABLE_HEADERS);
	public totalProductsView = computed(() => this.productsStore.products().length);
	public totalProducts = computed(() => this.productsStore.productsCount());

	public selectedValue: string = this.paginator().default;

	public onRemoveItem = output<string>();

	public showOverlay() {
		this.overlayVisible.update(() => true);
	}

	public showContextMenu(event: MouseEvent, item: Product) {
		this.contextMenuX.set(event.clientX);
		this.contextMenuY.set(event.clientY);
		this.productsStore.setSelectedProduct(item);
		// this.itemSelected.set(item);
		this.contextMenuVisible.update((state) => !state);
	}

	public optionSelected(optionSelected: ContextMenuOptionSelected) {
		// delete
		if (optionSelected.option === MENU_OPTIONS.DELETE) {
			this.showOverlay();
		}

		// update
		if (optionSelected.option === MENU_OPTIONS.UPDATE) {
			this.showOverlay();

			const id = this.productsStore.selectedProduct()?.id;
			this._router.navigate(['products', 'product', id], {
				// state: { payload: this.itemSelected() }
			});
		}
	}

	public onDelete() {
		const id = this.productsStore.product()?.id ?? '';
		this._productsService.deleteById(id).subscribe({
			next: ({ message }) => {
				this.productsStore.remove();
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
		const limit = parseInt(value);
		this.productsStore.loadAllByLimit(limit);
	}
}
