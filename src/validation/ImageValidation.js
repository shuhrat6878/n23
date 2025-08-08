import Joi from "joi";
import mongoose from "mongoose";

class ImageValidation {
    static objectIdValidation = (value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
            return helpers.message("Invalid ObjectId format");
        }
        return value;
    };

    create() {
        return Joi.object({
            title: Joi.string().required(),
            imageUri: Joi.string().uri().optional(), // URI formatda bo‘lishi kerak
            fileName: Joi.string().optional(),
            productId: Joi.string().custom(ImageValidation.objectIdValidation).required()
        });
    }

    update() {
        return Joi.object({
            title: Joi.string().optional(),
            imageUri: Joi.string().uri().optional(),
            fileName: Joi.string().optional(),
            productId: Joi.string().custom(ImageValidation.objectIdValidation).optional()
        });
    }

    filterByProduct() {
        return Joi.object({
            productId: Joi.string().custom(ImageValidation.objectIdValidation).required()
        });
    }
}

export default new ImageValidation();
