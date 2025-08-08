import Joi from "joi";
import mongoose from "mongoose";

class DastafkaValidation {
    static objectIdValidation = (value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
            return helpers.message("Invalid ObjectId format");
        }
        return value;
    };

    create() {
        return Joi.object({
            adress: Joi.string().required(),
            orderId: Joi.string().custom(DastafkaValidation.objectIdValidation).required(),
            sallerId: Joi.string().custom(DastafkaValidation.objectIdValidation).required()
        });
    }

    update() {
        return Joi.object({
            adress: Joi.string().optional(),
            orderId: Joi.string().custom(DastafkaValidation.objectIdValidation).optional(),
            sallerId: Joi.string().custom(DastafkaValidation.objectIdValidation).optional()
        });
    }

    filterByOrder() {
        return Joi.object({
            orderId: Joi.string().custom(DastafkaValidation.objectIdValidation).required()
        });
    }

    filterBySaller() {
        return Joi.object({
            sallerId: Joi.string().custom(DastafkaValidation.objectIdValidation).required()
        });
    }
}

export default new DastafkaValidation();
