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

	public selectedValue: string = this.paginator().default;

	public products = input<Product[]>([]);
	public total = input<number>(0);
	public totalProducts = computed(() => this.products().length);

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
		if (optionSelected.option === MENU_OPTIONS.DELETE) {
			this.showOverlay();
		}

		// update
		if (optionSelected.option === MENU_OPTIONS.UPDATE) {
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
