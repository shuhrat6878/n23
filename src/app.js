import Fastify from 'fastify';
import { UserRouter } from './routes/users.routes.js';
import { GuruhRouter } from './routes/guruh.route.js';
import { MaktabRouter } from './routes/maktab.route.js';

const fastify = Fastify({
    logger: false // prod = true
});

fastify.register(UserRouter.router, { prefix: '/users' });
fastify.register(GuruhRouter.router, { prefix: '/guruh' });
fastify.register(MaktabRouter.router, { prefix: '/maktab' });

export class Aplication {
    static async start() {
        try {
            await fastify.listen({ port: 3000 });
            console.log('Server running on port', 3000);
        } catch (error) {
            fastify.log.error(error);
            process.exit(1);
        }
    }
}