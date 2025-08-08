import Joi from "joi";
import mongoose from "mongoose";

class OrderValidation {
    static objectIdValidation = (value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
            return helpers.message("Invalid ObjectId format");
        }
        return value;
    };

    create() {
        return Joi.object({
            quantity: Joi.number().integer().min(1).required(),
            totalPrice: Joi.number().min(0).optional(),
            clientId: Joi.string().custom(OrderValidation.objectIdValidation).required(),
            productId: Joi.string().custom(OrderValidation.objectIdValidation).required()
        });
    }

    update() {
        return Joi.object({
            quantity: Joi.string().optional(),
            totalPrice: Joi.number().min(0).optional(),
            clientId: Joi.string().custom(OrderValidation.objectIdValidation).optional(),
            productId: Joi.string().custom(OrderValidation.objectIdValidation).optional()
        });
    }

    filterByClient() {
        return Joi.object({
            clientId: Joi.string().custom(OrderValidation.objectIdValidation).required()
        });
    }

    filterByProduct() {
        return Joi.object({
            productId: Joi.string().custom(OrderValidation.objectIdValidation).required()
        });
    }
}

export default new OrderValidation();
