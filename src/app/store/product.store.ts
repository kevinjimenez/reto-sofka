import { Product } from '../common/interfaces';

export interface ProductState {
	products: Product[];
}

const initialState: ProductState = {
	products: []
};
