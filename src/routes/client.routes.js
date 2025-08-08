import { Router } from 'express';
import controller from '../controllers/client.controller.js';
import { validate } from '../middlewares/validate.js';
import ClientValidation from '../validation/ClientValidation.js';
import { AuthGuard } from "../guards/auth.guard.js";
import { RolesGuard } from "../guards/role.guard.js";
import { Roles } from '../const/index.js';
import { requestLimiter } from '../utils/request-limit.js';

const router = Router();

router
    .post('/', AuthGuard, RolesGuard(Roles.SUPERADMIN, Roles.ADMIN), validate(ClientValidation.create), controller.createClient)
    .post('/signin', requestLimiter(60, 10), validate(ClientValidation.signin), controller.signIn)
    .post('/token', controller.generateNewToken)
    .post('/signout', controller.signOut)

    .get('/', controller.findAll)
    .get('/:id', controller.findById)

    .patch('/password/:id', AuthGuard, RolesGuard(Roles.SUPERADMIN), validate(ClientValidation.password), controller.updatePasswordClient)
    .patch('/forget-password', validate(ClientValidation.forgetPassword), controller.forgetPassword)
    .patch('/confirm-otp', validate(ClientValidation.confirmOTP), controller.confirmOTP)
    .patch('/confirm-password', validate(ClientValidation.confirmPassword), controller.confirmPassword)
    .patch('/:id', AuthGuard, RolesGuard(Roles.SUPERADMIN, Roles.ADMIN, Roles.CLIENT), validate(ClientValidation.update), controller.updateClient)

    .delete('/:id', controller.delete)

export default router;