export const ERROR_INPUT_MESSAGE: Record<string, string> = {
	required: 'El campo {{label}} es requerido',
	email: 'El campo {{label}} no es un correo valido',
	password:
		'El campo {{label}} debe tener al menos una minuscula, mayuscula, número, caracter especial y longitud sea mayor o igual a 4',
	minlength: 'El campo {{label}} debe tener minimo {{minlength}} caracteres',
	maxlength: 'El campo {{label}} debe tener maximo {{maxlength}} caracteres',
	currentDate: 'La fecha debe ser mayor o igual a la fecha actual',
	oneYearAfterRelease: 'La fecha debe ser mayor o igual a la fecha actual + 1 año',
	availableId: 'El ID ya existe'
};
