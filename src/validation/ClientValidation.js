import Joi from "joi";

class ClientValidation {
    static passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    static phoneRegex = /^(\+?[1-9]\d{0,3})?[-.\s]?(\(?[1-9]\d{0,4}\)?)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{0,9}$/;

    create() {
        return Joi.object({
            phoneNumber: Joi.string().pattern(ClientValidation.phoneRegex).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(ClientValidation.passwordRegex).required(),
            fullName: Joi.string().required(),
            userName: Joi.string().optional(),
        });
    }

    signin() {
        return Joi.object({
            phoneNumber: Joi.string().required(),
            password: Joi.string().required()
        });
    }

    update() {
        return Joi.object({
            phoneNumber: Joi.string().pattern(ClientValidation.phoneRegex).optional(),
            email: Joi.string().email().optional(),
            password: Joi.string().pattern(ClientValidation.passwordRegex).optional(),
            fullName: Joi.string().optional(),
            userName: Joi.string().optional()

        });
    }
    

    password() {
        return Joi.object({
            oldPassword: Joi.string().required(),
            newPassword: Joi.string().pattern(ClientValidation.passwordRegex).required()
        });
    }

    forgetPassword() {
        return Joi.object({
            email: Joi.string().email().required()
        });
    }

    confirmOTP() {
        return Joi.object({
            email: Joi.string().email().required(),
            otp: Joi.string().length(6).required()
        });
    }

    confirmPassword() {
        return Joi.object({
            email: Joi.string().email().required(),
            newPassword: Joi.string().pattern(ClientValidation.passwordRegex).required()
        });
    }


}

export default new ClientValidation();
