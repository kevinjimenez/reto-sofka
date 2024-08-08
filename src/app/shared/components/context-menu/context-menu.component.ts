import { NgStyle } from '@angular/common';
import { Component, HostListener, input, model, output } from '@angular/core';
import { Product } from '../../../common/interfaces/product.interface';
import { ContextMenuOption } from './interfaces/context-menu-option.interface';
import { ContextMenuOptionSelected } from './interfaces/context-menu-option-selected.interface';

@Component({
	selector: 'app-context-menu',
	standalone: true,
	imports: [NgStyle],
	templateUrl: './context-menu.component.html',
	styleUrl: './context-menu.component.css'
})
export class ContextMenuComponent {
	public options = input.required<ContextMenuOption[]>();

	public optionSelected = output<ContextMenuOptionSelected>();
	public onShow = output<void>();

	public isVisible = model<boolean>(false);
	public x = model<number>(0);
	public y = model<number>(0);
	public itemSelected = model<Product | null>(null);

	hide() {
		this.isVisible.set(false);
	}

	onOptionSelected(option: number) {
		const selected: ContextMenuOptionSelected = {
			option,
			item: this.itemSelected()
		};
		this.optionSelected.emit(selected);
		this.hide();
	}

	@HostListener('document:click', ['$event'])
	onDocumentClick(event: MouseEvent) {
		this.hide();
	}
}
