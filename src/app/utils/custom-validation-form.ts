import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import dayjs from 'dayjs';
import { debounceTime, map } from 'rxjs';
import { ProductsService } from '../core/services/products.service';

const errorMessage: Record<string, string> = {
	required: 'El campo {{label}} es requerido',
	email: 'El campo {{label}} no es un correo valido',
	password:
		'El campo {{label}} debe tener al menos una minuscula, mayuscula, número, caracter especial y longitud sea mayor o igual a 4',
	minlength: 'El campo {{label}} debe tener minimo {{minlength}} caracteres',
	maxlength: 'El campo {{label}} debe tener maximo {{maxlength}} caracteres',
	currentDate: 'La fecha debe ser mayor o igual a la fecha actual',
	dateNotOneYearLater: 'La fecha debe ser mayor o igual a la fecha actual + 1 año',
	exists: 'El ID ya existe'
};

export class CustomValiationForm {
	static message(errors: Record<string, string | object>, label?: string): string | null {
		for (const key in errors) {
			if (Object.prototype.hasOwnProperty.call(errors!, key)) {
				const msg = errorMessage[key];
				if ((errors[key] as any).requiredLength && label)
					return msg
						.replace('{{label}}', label)
						.replace('{{minlength}}', (errors[key] as any).requiredLength)
						.replace('{{maxlength}}', (errors[key] as any).requiredLength);
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

	static revisionDateValidator(control: AbstractControl): null {
		const releaseDateControl = control.get('date_release');
		const revisionDateControl = control.get('date_revision');

		if (!releaseDateControl || !revisionDateControl) return null;

		const releaseDate = releaseDateControl.value;
		const revisionDate = revisionDateControl.value;

		if (releaseDate && revisionDate) {
			const isOneYearLater = dayjs(revisionDate).isAfter(
				dayjs(releaseDate).add(1, 'year').subtract(1, 'day'),
				'day'
			);
			if (!isOneYearLater) revisionDateControl.setErrors({ dateNotOneYearLater: true });
		}

		return null;
	}

	static checkIdValidator(productService: ProductsService): AsyncValidatorFn {
		return (control: AbstractControl) => {
			return productService.checkIdAvailable(control.value).pipe(
				debounceTime(500),
				map((result: boolean) => (result ? { exists: true } : null))
			);
		};
	}
}
