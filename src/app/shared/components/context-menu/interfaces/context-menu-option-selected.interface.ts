import { Product } from '../../../../common/interfaces/product.interface';

export interface ContextMenuOptionSelected {
	option: number;
	item: Product | null;
}
