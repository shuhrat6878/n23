import Cashelok from "../models/cashelok.model.js";
import Client from "../models/client.model.js";
import Saller from "../models/saller.model.js";
import { successRes } from "../utils/success-res.js";
import { BaseController } from "./base.controller.js";


class CashelokController extends BaseController {
    constructor() {
        super(Cashelok);
    }

    async createCashelok(req, res, next) {

        try {
            const {clientId,sallerId}= req.body;
            await BaseController.checkById(Client,clientId);
            await BaseController.checkById(Saller, sallerId);

            const cashelok = await Cashelok.create(req.body);
            return successRes(res, cashelok,201);
        } catch (error) {
            next(error)
        }
    }
}


export default new CashelokController();

