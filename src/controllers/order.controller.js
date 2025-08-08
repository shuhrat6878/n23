import Order from "../models/order.model.js";
import { successRes } from "../utils/success-res.js";
import { BaseController } from "./base.controller.js";
import Client from "../models/client.model.js"
import Product from "../models/product.model.js";


class OrderController extends BaseController {
    constructor() {
        super(Order, ['clientId,productId']);
    }

    async createOrder(req, res, next) {

        try {
            const { clientId,productId } = req.body;
            await BaseController.checkById(Client,clientId)
            await BaseController.checkById(Product,productId)

            const order = await Order.create(req.body);
            return successRes(res, order, 201);
        } catch (error) {
            next(error);
        }
    }
}




export default new OrderController();