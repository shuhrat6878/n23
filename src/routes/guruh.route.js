import controller from '../controllers/guruh.controller.js'

export class GuruhRouter {
    static router(fastify, _options) {
        fastify.post('/', controller.create)
               .get('/', controller.findAll)
                .get('/:id', controller.findById)
                .patch('/:id', controller.update)
                .delete('/:id', controller.remove)
    }
}