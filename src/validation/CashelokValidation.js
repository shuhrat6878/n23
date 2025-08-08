import Joi from "joi";
import mongoose from "mongoose";

class CashelokValidation {
    static objectIdValidation = (value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
            return helpers.message("Invalid ObjectId format");
        }
        return value;
    };

    create() {
        return Joi.object({
            cardNumber: Joi. number().required(),
            shot: Joi.number().required(),
            clientId: Joi.string().custom(CashelokValidation.objectIdValidation).required(),
            sallerId: Joi.string().custom(CashelokValidation.objectIdValidation).required()
        });
    }

    update() {
        return Joi.object({
            cardNumber: Joi.string().optional(),
            shot: Joi.string().optional(),
            clientId: Joi.string().custom(CashelokValidation.objectIdValidation).optional(),
            sallerId: Joi.string().custom(CashelokValidation.objectIdValidation).optional()
        });
    }

    filterByClient() {
        return Joi.object({
            clientId: Joi.string().custom(CashelokValidation.objectIdValidation).required()
        });
    }

    filterBySaller() {
        return Joi.object({
            sallerId: Joi.string().custom(CashelokValidation.objectIdValidation).required()
        });
    }
}

export default new CashelokValidation();
