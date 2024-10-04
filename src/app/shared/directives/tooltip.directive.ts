import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { TooltipComponent } from '../components/tooltip/tooltip.component';

@Directive({
	selector: '[appTooltip]',
	standalone: true
})
export class TooltipDirective {
	@Input('appTooltip') tooltip!: TooltipComponent; // Enlaza al componente Tooltip

	constructor(private el: ElementRef) {}

	@HostListener('mouseenter') onMouseEnter() {
		this.tooltip.show();
	}

	@HostListener('mouseleave') onMouseLeave() {
		this.tooltip.hide();
	}
}
