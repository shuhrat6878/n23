import BaseController from "./Base.controller.js";
import pg from "../db/db.js";


class ManzilController extends BaseController{
    constructor(){
        super("manzili");
    }
    async JoinManzil(req, res) {
    try {
        const query = `
            SELECT 
                users.id, 
                manzili.name AS manzil,
                davlati.name AS davlati, 
                users.name AS ismi
            FROM users
            LEFT JOIN manzili ON manzili.userid = users.id
            JOIN davlati  ON davlati.userid = users.id 
        `;

        const data = await pg.query(query);
        const natija = data.rows;

        return res.status(200).json({
            statusCode: 200,
            message: "success",
            data: natija
        });
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: error.message
        });
    }
}

}

export default new ManzilController;