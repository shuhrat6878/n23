import BaseController from './bases.controller.js';
import pg from '../db/index.js';

class JoinController extends BaseController{
    async join (req,res){
        try {
            const query=
            `select u.id, u.name, d.name, m.name from users u join davlati d on d.userid = u.id left join manzili m on m.userid = u.id`
            
            const data=await pg.query(query);
            const natija=data.rows;
            return res.status(200).json({
                statusCode:200,
                message:"success",
                data:natija
            })
        } catch (error) {
            return res.status(500).json({
                statusCode:500,
                message:error
            })
        }
    }
    
}

export default new JoinController();

// const query=
            `select m.name as address, u.id as userid, u.name as userNomi, d.name as davlati  from manzili m join users u on m.userid = u.id left join davlati d on d.userid = u.id`