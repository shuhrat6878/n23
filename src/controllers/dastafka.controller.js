import Order from "../models/order.model.js";
import { successRes } from "../utils/success-res.js";
import { BaseController } from "./base.controller.js";
import Client from "../models/client.model.js"
import Dastafka from "../models/dastafka.model.js";


class DastafkaController extends BaseController {
    constructor() {
        super(Dastafka, ['clientId, orderId']);
    }

    async createDastafka(req, res, next) {

        try {
            const { clientId,orderId } = req.body;
            await BaseController.checkById(Client,clientId)
            await BaseController.checkById(Order,orderId)

            const dastafka = await Dastafka.create(req.body);
            return successRes(res, dastafka, 201);
        } catch (error) {
            next(error);
        }
    }
}




export default new DastafkaController();