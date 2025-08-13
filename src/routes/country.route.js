import Router from "@koa/router";
import countryController from '../controller/country.controller.js'

const router = new Router({prefix:'/country'});

router
    .post('/',countryController.create)
    .get('/',countryController.findAll)
    .get('/:id',countryController.findById)
    .patch('/:id',countryController.updata)
    .delete('/:id',countryController.delete)


export default router;