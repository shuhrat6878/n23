export const RolesGuard = (...roles) => {
    return async function (req, res, next) {
        try {
            console.log(req.body)
            console.log(roles.includes(req.user?.role))
            console.log(req.user?.role)
            if ((req.user?.role && roles.includes(req.user?.role)) ||
                (roles.includes('ID') && req.params?.id === req.user?.id)) {
                return next();
            }
            return res.status(403).json({
                statusCode: 403,
                message: "forbidden user"
            });
        } catch (error) {
            
            return res.status(500).json({
                statusCode: 500,
                message: error
            })
        }

    }
}