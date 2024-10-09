import { Component, computed, HostListener, inject, OnInit, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../common/interfaces';
import { ProductsService } from '../../core';
import { ButtonComponent, InputComponent, ToastComponent } from '../../shared/components';
import { CustomValiationForm } from '../../utils';
import { ProductsStore } from '../../store/product.store';

@Component({
	selector: 'app-create-edit-product',
	standalone: true,
	imports: [InputComponent, ButtonComponent, ReactiveFormsModule, ToastComponent],
	templateUrl: './create-edit-product.component.html',
	styleUrl: './create-edit-product.component.css'
})
export class CreateEditProductComponent implements OnInit {
	private readonly formBuilder = inject(NonNullableFormBuilder);
	private readonly _productsService = inject(ProductsService);
	private readonly _router = inject(Router);
	private readonly _activatedRoute = inject(ActivatedRoute);
	readonly productsStore = inject(ProductsStore);

	public toastVisible = signal<boolean>(false);
	public errorMsg = signal<string>('');

	public selectedProduct = computed(() => this.productsStore.product());

	public registerForm = this.formBuilder.group(
		{
			id: [
				this.selectedProduct()?.id ?? '',
				[Validators.required, Validators.minLength(3), Validators.maxLength(10)],
				[CustomValiationForm.availableIdValidator(this._productsService)]
			],
			name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
			description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
			logo: ['', Validators.required],
			date_release: ['', [Validators.required, CustomValiationForm.currentDateValidator]],
			date_revision: [{ value: '', disabled: true }, Validators.required]
		},
		{
			validators: [CustomValiationForm.oneYearAfterReleaseValidator]
		}
	);

	constructor() {
		this.getRouteParams();
	}

	public ngOnInit(): void {}

	public setValueForm(): void {
		this.registerForm.controls.id.clearAsyncValidators();
		this.registerForm.setValue({
			id: this.selectedProduct()!.id,
			name: this.selectedProduct()!.name,
			description: this.selectedProduct()!.description,
			logo: this.selectedProduct()!.logo,
			date_release: this.selectedProduct()!.date_release,
			date_revision: this.selectedProduct()!.date_revision
		});

		this.registerForm.controls.id.disable();
	}

	public onBack(): void {
		this._router.navigate(['/products']);
	}

	public onSubmit(): void {
		if (this.registerForm.valid) {
			if (this.selectedProduct()) {
				const { id, ...updateProduct } = this.productForm;
				this.updateProduct(this.selectedProduct()!.id, updateProduct);
			} else {
				this.createProduct(this.productForm as Product);
			}
		} else {
			this.registerForm.markAllAsTouched();
		}
	}

	private createProduct(payload: Product): void {
		this._productsService.create(payload).subscribe({
			next: ({ message }) => {
				this.errorMsg.set(message);
				this.toastVisible.set(true);
				this.onReset();
			},
			error: (err) => {
				this.errorMsg.set(err.error.message);
				this.toastVisible.set(true);
			}
		});
	}

	private updateProduct(id: string, payload: Partial<Product>): void {
		this._productsService.updateById(id, payload).subscribe({
			next: ({ message }) => {
				this.errorMsg.set(message);
				this.toastVisible.set(true);
			},
			error: (err) => {
				this.errorMsg.set(err.error.message);
				this.toastVisible.set(true);
			}
		});
	}

	public onReset(): void {
		this.registerForm.reset();
	}

	public onCancel(): void {
		this._router.navigate(['products']);
	}

	private get productForm(): Partial<Product> {
		return {
			id: this.registerForm.value.id!,
			name: this.registerForm.value.name!,
			description: this.registerForm.value.description!,
			logo: this.registerForm.value.logo!,
			date_release: this.registerForm.value.date_release!,
			date_revision: this.registerForm.value.date_revision!
		};
	}

	private getRouteParams(): void {
		this._activatedRoute.params.subscribe(({ id }) => {
			if (id) {
				if (!this.selectedProduct()) {
					this._router.navigate(['/products']);
				} else {
					this.setValueForm();
				}
			}
		});
	}

	@HostListener('window:beforeunload', ['$event'])
	onBeforeReload(e: BeforeUnloadEvent): void {
		const isValidRegisterForm = Object.values(this.registerForm.controls).some(
			(control) => control.value !== ''
		);

		if (isValidRegisterForm) {
			e.preventDefault();
		}
	}
}
