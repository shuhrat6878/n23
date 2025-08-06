import BaseController  from "./Base.controller.js";
import pg from "../db/db.js";

 
class DavlatController extends BaseController{
    constructor(){
        super("davlati")
    }
    async JoinDavlat(req, res) {
        try {
            const query = `
                SELECT 
                    users.id, 
                    davlati.name AS davlati, 
                    users.name AS ismi, 
                    manzili.name AS manzil
                FROM davlati
                JOIN users  ON davlati.userid = users.id 
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
};


export default new DavlatController;