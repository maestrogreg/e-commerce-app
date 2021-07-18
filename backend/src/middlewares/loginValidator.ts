import Joi from 'joi';


const schema = Joi.object({
    email: Joi.string().required().min(5),
    password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required()
    .error(()=> new Error("check password field"))
})

export default schema;