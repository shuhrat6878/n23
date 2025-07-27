import token from "../utils/Token.js"
import config from "../config/index.js";
import { AppError } from "../error/AppError.js";

export const AuthGuard = async (req,_res, next)=>{
    try {

        const auth = req.headers?.authorization;
        if(!auth){
            throw new AppError('Authorization error',401)
        }
        const bearer = auth.split(' ')[0];
        const authtoken = auth.split(' ')[1];

        if(bearer !== 'Bearer' || !authtoken){
            
            throw new AppError('unauthorized',401)
        }

        const user =token.verifyToken(authtoken, config.TOKEN.ACCESS_KEY);
        req.user = user;
        next();        
    } catch (error) {
        next(error);
    }
}