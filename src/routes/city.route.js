import Router from "@koa/router";
import CityController from '../controller/city.controller.js'

const router = new Router({ prefix: '/city' });

router
    .post('/', CityController.create)
    .get('/', CityController.findAll)
    .get('/:id', CityController.findById)
    .patch('/:id', CityController.update)
    .delete('/:id', CityController.delete)


export default router;