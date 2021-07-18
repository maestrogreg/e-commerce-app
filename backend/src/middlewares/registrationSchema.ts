import Joi, { ValidationResult } from 'joi';

interface User{
    name: string,
    password: string,
    email: string
}

export const regValidator = (object: User): ValidationResult => {
    const signUpValidation = Joi.object({
		email: Joi.string()
			.email()
			.min(3)
			.max(50)
			.required(),
		password: Joi.string()
			.pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
			.required(),
    
		name: Joi.string()
			.min(3)
			.max(30)
			.required()
	});
	return signUpValidation.validate(object);
}