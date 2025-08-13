import cityModel from "../service/city.service.js";

class CityController {
    async create(ctx) {
        const name = await cityModel.findOne('name', ctx.request.body.name);
        if (name) {
            ctx.throw(409, 'City name oldready exists');
        }
        const data = await cityModel.create(ctx.request.body);
        ctx.status = 201;
        ctx.body = data;
    }

    async findAll(ctx) {
        const data = await cityModel.findAll();
        ctx.status = 200;
        ctx.body = data;
    }

    async findById(ctx) {
        const data = await cityModel.findById(ctx.params.id);
        if (!data) {
            ctx.throw(404, 'not found');
        }
        ctx.status = 200;
        ctx.body = data;
    }

    async update(ctx) {
        const data = await cityModel.updata(ctx.params.id, ctx.request.body);
        console.log(data)
        if (!data) {
            ctx.throw(404, 'not found');
        }
        ctx.status = 200;
        ctx.body = data;
    }

    async delete(ctx) {
        const data = await cityModel.delete(ctx.params.id);
        if (!data) {
            ctx.throw(404, 'not found');
        }
        ctx.status = 200;
        ctx.body = {};
    }


}

export default new CityController;