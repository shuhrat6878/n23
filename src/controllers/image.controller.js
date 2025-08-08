import Product from "../models/product.model.js";
import { successRes } from "../utils/success-res.js";
import { BaseController } from "./base.controller.js";
import Image from "../models/image.model.js"


class ImageController extends BaseController {
    constructor() {
        super(Image, ['products']);
    }

    async createImage(req, res, next) {

        try {
            const { productId } = req.body;
            await BaseController.checkById(Product,productId);

            
            const image = await Image.create({
                fileName,
                title,
                imageUri:req?.file?.fileName?? ""
            });
            return successRes(res, image, 201);
        } catch (error) {
            next(error);
        }
    }
}


export default new ImageController();