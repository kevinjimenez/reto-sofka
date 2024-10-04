import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { TooltipComponent } from '../components';

@Directive({
	selector: '[appTooltip]',
	standalone: true
})
export class TooltipDirective {
	@Input({
		alias: 'appTooltip',
		required: true
	})
	tooltip!: TooltipComponent;

	constructor(private el: ElementRef) {}

	@HostListener('mouseenter') onMouseEnter() {
		this.tooltip.show();
	}

	@HostListener('mouseleave') onMouseLeave() {
		this.tooltip.hide();
	}
}
