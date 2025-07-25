import token from "../utils/Token.js"
import config from "../config/index.js";

export const AuthGuard = async (req,res, next)=>{
    try {

        const auth = req.headers?.authorization;
        if(!auth){
            return res.status(401).json({
                statusCode:401,
                message:"Authorization error"
            })
        }
        const bearer = auth.split(' ')[0];
        const authtoken = auth.split(' ')[1];

        if(bearer !== 'Bearer' || !authtoken){
            
            return res.status(401).json({
                statusCode:401,
                message:"unauthorized"
            })
        }

        const user =token.verifyToken(authtoken, config.TOKEN.ACCESS_KEY);
        req.user = user;
        next();        
    } catch (error) {
        return res.status(500).json({
            statusCode:500,
            message: error.message
        })
    }
}