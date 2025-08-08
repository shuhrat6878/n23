import Joi from "joi";
import mongoose from "mongoose";

class ProductValidation {
    static objectIdValidation = (value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
            return helpers.message("Invalid ObjectId format");
        }
        return value;
    };

    create() {
        return Joi.object({
            name: Joi.string().required(),
            description: Joi.string().optional(),
            color: Joi.string().optional(),
            price: Joi.number().min(0).required(),
            quantity: Joi.number().integer().min(0).required(),
            sallerId: Joi.string().custom(ProductValidation.objectIdValidation).required(),
            categoryId: Joi.string().custom(ProductValidation.objectIdValidation).required()
        });
    }

    update() {
        return Joi.object({
            name: Joi.string().optional(),
            description: Joi.string().optional(),
            color: Joi.string().optional(),
            price: Joi.number().min(0).optional(),
            quantity: Joi.number().integer().min(0).optional(),
            sallerId: Joi.string().custom(ProductValidation.objectIdValidation).optional(),
            categoryId: Joi.string().custom(ProductValidation.objectIdValidation).optional()
        });
    }

    updateQuantity() {
        return Joi.object({
            quantity: Joi.number().integer().min(0).required()
        });
    }

    filterByCategory() {
        return Joi.object({
            categoryId: Joi.string().custom(ProductValidation.objectIdValidation).required()
        });
    }
}

export default new ProductValidation();
