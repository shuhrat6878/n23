import pg from "../db/db.js";
import BaseController from "./Base.controller.js";

class UserController extends BaseController {
    constructor() {
        super('users');
    }

    async JoinUser(req, res) {
        try {
            const query = `
                SELECT 
                    users.id, 
                    users.name AS ismi, 
                    davlati.name AS davlati, 
                    manzili.name AS manzil
                FROM users
                JOIN davlati  ON davlati.userid = users.id 
                LEFT JOIN manzili ON manzili.userid = users.id
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

export default new UserController;
