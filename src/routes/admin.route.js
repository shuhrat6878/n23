import { Router } from "express";
import controller from "../controllers/admin.controller.js"
import { AuthGuard } from "../guards/auth.guard.js";
import { RolesGuard } from "../guards/role.guard.js";
import { validate } from "../middlewares/validate.js";
import AdminValidation from "../validation/AdminValidation.js";



const router = Router();

router 
    .post('/',AuthGuard,RolesGuard('SUPPERADMIN'),validate(AdminValidation.create),controller.createAdmin)
    .post('/signin', validate(AdminValidation.signin),controller.signIn)
    .post('/token',controller.generateNewToken)
    .post('/signout',AuthGuard,controller.signOut)
    .get('/',AuthGuard,RolesGuard('SUPPERADMIN'),controller.findAll)
    .get('/id/:id',AuthGuard,RolesGuard('SUPPERADMIN','ID'),controller.findById)
    .patch('/:id',AuthGuard,RolesGuard('SUPPERADMIN'),controller.update)
    .delete('/:id',AuthGuard,RolesGuard('SUPPERADMIN'),controller.delete)


export default router;