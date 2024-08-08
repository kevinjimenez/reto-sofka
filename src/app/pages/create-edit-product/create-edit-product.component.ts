import { Component, inject, OnInit, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonComponent, InputComponent, ToastComponent } from '../../shared/components';
import { ProductsService } from '../../core';
import { Product } from '../../common/interfaces';
import { CustomValiationForm } from '../../utils';

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

	public payloadEdit = signal<Product | null>(null);
	public id = signal<string | null>(null);
	public toastVisible = signal<boolean>(false);
	public errorMsg = signal<string>('');

	public registerForm = this.formBuilder.group(
		{
			id: [
				this.payloadEdit()?.id || '',
				[Validators.required, Validators.minLength(3), Validators.maxLength(10)],
				[CustomValiationForm.checkIdValidator(this._productsService)]
			],
			name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
			description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
			logo: ['', Validators.required],
			date_release: ['', [Validators.required, CustomValiationForm.currentDateValidator]],
			date_revision: ['', Validators.required]
		},
		{
			validators: [CustomValiationForm.revisionDateValidator]
		}
	);

	constructor() {
		this._activatedRoute.params.subscribe(({ id }) => {
			if (id) {
				this.id.set(id);
				const navigation = this._router.getCurrentNavigation();
				this.payloadEdit.set(navigation?.extras.state?.['payload']);
			}
		});
	}

	ngOnInit(): void {
		if (this.payloadEdit()) {
			this.setValueForm();
		}
	}

	setValueForm() {
		this.registerForm.controls.id.clearAsyncValidators();
		this.registerForm.setValue({
			id: this.payloadEdit()!.id,
			name: this.payloadEdit()!.name,
			description: this.payloadEdit()!.description,
			logo: this.payloadEdit()!.logo,
			date_release: this.payloadEdit()!.date_release,
			date_revision: this.payloadEdit()!.date_revision
		});

		this.registerForm.controls.id.disable();
	}

	onSubmit() {
		if (this.registerForm.valid) {
			const newProduct: Partial<Product> = {
				id: this.registerForm.value.id!,
				name: this.registerForm.value.name!,
				description: this.registerForm.value.description!,
				logo: this.registerForm.value.logo!,
				date_release: this.registerForm.value.date_release!,
				date_revision: this.registerForm.value.date_revision!
			};
			if (this.id() && this.payloadEdit()) {
				const { id, ...updateProduct } = newProduct;
				this._productsService.updateById(this.id()!, updateProduct).subscribe({
					next: ({ message }) => {
						this.errorMsg.set(message);
						this.toastVisible.set(true);
						// this.onReset();
					},
					error: (err) => {
						this.errorMsg.set(err.error.message);
						this.toastVisible.set(true);
					}
				});
			} else {
				this._productsService.create(newProduct as Product).subscribe({
					next: ({ message }) => {
						this.errorMsg.set(message);
						this.toastVisible.set(true);
						this.onReset();
						// this._router.navigate(['products']);
					},
					error: (err) => {
						this.errorMsg.set(err.error.message);
						this.toastVisible.set(true);
					}
				});
			}
		} else {
			this.registerForm.markAllAsTouched();
		}
	}

	onReset() {
		this.registerForm.reset();
	}

	onCancel() {
		this._router.navigate(['products']);
	}
}
