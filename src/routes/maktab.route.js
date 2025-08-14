import controller from '../controllers/maktab.controller.js'

export class MaktabRouter {
    static router(fastify, _options) {
        fastify.post('/', controller.create)
               .get('/', controller.findAll)
                .get('/:id', controller.findById)
                .patch('/:id', controller.update)
                .delete('/:id', controller.remove)
    }
}