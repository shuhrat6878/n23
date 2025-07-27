import { AppError } from "../error/AppError.js"

export const RolesGuard = (...roles) => {
    return async function (req, _res, next) {
        try {
            console.log(req.body)
            console.log(roles.includes(req.user?.role))
            console.log(req.user?.role)
            if ((req.user?.role && roles.includes(req.user?.role)) ||
                (roles.includes('ID') && req.params?.id === req.user?.id)) {
                return next();
            }
            throw new AppError('forbidden user',403)
        } catch (error) {
            
            next(error);
        }

    }
}