import { AppError } from "../error/AppError";

export const validate = (schemaValid)=>{
    return function (req,res,next){
        try {
            const schema = schemaValid()
            const {error}= schema.validate(req.body);
            if(error){
                throw new AppError(error?.details[0]?.message ?? "error input validation",422);
            }
            next();
        } catch (error) {
            return res.status(500).json({
                statusCode:500,
                message:error
            })
        }
    }
}