import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import dayjs from 'dayjs';
import { debounceTime, map } from 'rxjs';
import { ERROR_INPUT_MESSAGE } from '../common/constants';
import { ErrorInputInterface } from '../common/interfaces';
import { ProductsService } from '../core/services/products.service';

export class CustomValiationForm {
	static message(
		errors: Record<string, string | ErrorInputInterface>,
		label?: string
	): string | null {
		for (const key in errors) {
			if (Object.hasOwn(errors, key)) {
				const msg = ERROR_INPUT_MESSAGE[key];

				if (typeof errors[key] === 'object' && label) {
					const requiredLength = errors[key].requiredLength;
					return msg
						.replace('{{label}}', label)
						.replace('{{minlength}}', `${requiredLength}`)
						.replace('{{maxlength}}', `${requiredLength}`);
				}
				if (label) return msg.replace('{{label}}', label);
				return msg.replace('{{label}}', '');
			}
		}
		return null;
	}

	static currentDateValidator(control: AbstractControl<string>): ValidationErrors | null {
		const value = control.value;
		const currentDate = dayjs().subtract(1, 'day');
		const selectedDate = dayjs(value);
		if (currentDate.isAfter(selectedDate) || currentDate.isSame(selectedDate)) {
			return { currentDate: true };
		} else {
			return null;
		}
	}

	static oneYearAfterReleaseValidator(control: AbstractControl<string>): ValidationErrors | null {
		const releaseDateControl = control.get('date_release');
		const revisionDateControl = control.get('date_revision');

		if (!releaseDateControl || !revisionDateControl) return null;

		if (releaseDateControl.valid) {
			revisionDateControl.enable({ onlySelf: true });
		}

		if (releaseDateControl.invalid) {
			revisionDateControl.disable({ onlySelf: true });
		}

		releaseDateControl.valueChanges.subscribe(() => {
			revisionDateControl.setValue('');
			revisionDateControl.clearAsyncValidators();
			// revisionDateControl.clearValidators();
			revisionDateControl.updateValueAndValidity();
		});

		const releaseDate = releaseDateControl.value;
		const revisionDate = revisionDateControl.value;

		if (releaseDate && revisionDate) {
			const isOneYearLater = dayjs(revisionDate).isAfter(
				dayjs(releaseDate).add(1, 'year').subtract(1, 'day'),
				'day'
			);
			if (!isOneYearLater) {
				revisionDateControl.setErrors({ oneYearAfterRelease: true });
				return { oneYearAfterRelease: true };
			}
		}

		return null;
	}

	static availableIdValidator(productService: ProductsService): AsyncValidatorFn {
		return (control: AbstractControl) => {
			return productService.checkIdAvailable(control.value).pipe(
				debounceTime(500),
				map((result: boolean) => (result ? { availableId: true } : null))
			);
		};
	}
}
