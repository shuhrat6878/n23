import { Router } from 'express';
import controller from '../controllers/saller.controller.js';
import { validate } from '../middlewares/validate.js';
import SallerValidation from '../validation/SallerValidation.js';
import { AuthGuard } from "../guards/auth.guard.js";
import { RolesGuard } from "../guards/role.guard.js";
import { Roles } from '../const/index.js';
import { requestLimiter } from '../utils/request-limit.js';


const router = Router();

router
    .post('/', AuthGuard, RolesGuard(Roles.SUPERADMIN, Roles.ADMIN), validate(SallerValidation.create), controller.createSaller)
    .post('/signin', requestLimiter(60, 10), validate(SallerValidation.signin), controller.signIn)
    .post('/token', controller.generateNewToken)
    .post('/signout', controller.signOut)

    .get('/', controller.findAll)
    .get('/:id', controller.findById)

    .patch('/password/:id', AuthGuard, RolesGuard(Roles.SUPERADMIN), validate(SallerValidation.password), controller.updatePassword)
    .patch('/forget-password', validate(SallerValidation.forgetPassword), controller.forgetPassword)
    .patch('/confirm-otp', validate(SallerValidation.confirmOTP), controller.confirmOTP)
    .patch('/confirm-password', validate(SallerValidation.confirmPassword), controller.confirmPassword)
    .patch('/:id', AuthGuard, RolesGuard(Roles.SUPERADMIN,Roles.ADMIN,Roles.SALLER), validate(SallerValidation.update), controller.updateSaller)


    .delete('/:id', controller.delete)

export default router;