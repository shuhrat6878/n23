import { Router } from "express";
import controller from "../controllers/admin.controller.js"
import { AuthGuard } from "../guards/auth.guard.js";
import { RolesGuard } from "../guards/role.guard.js";
import { validate } from "../middlewares/validate.js";
import AdminValidation from "../validation/AdminValidation.js";
import { requestLimiter } from "../utils/request-limit.js";



const router = Router();

router 
    .post('/',AuthGuard,RolesGuard('SUPPERADMIN'),validate(AdminValidation.create),controller.createAdmin)
    .post('/signin',requestLimiter(10,3),validate(AdminValidation.signin),controller.signIn)
    .post('/token',controller.generateNewToken)
    .post('/signout',AuthGuard,controller.signOut)

    .get('/',AuthGuard,RolesGuard('SUPPERADMIN'),controller.findAll)
    .get('/id/:id',AuthGuard,RolesGuard('SUPPERADMIN','ID'),controller.findById)
    
    .patch('password/:id',AuthGuard,RolesGuard('SUPPERADMIN','ID'),validate(AdminValidation.password),controller.updatePasswordForAdmin)
    .patch('/:id',AuthGuard,RolesGuard('SUPPERADMIN','ID'),validate(AdminValidation.update),controller.updateAdmin)
    .delete('/:id',AuthGuard,RolesGuard('SUPPERADMIN'),controller.delete)


export default router;