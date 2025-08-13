import countryModel from '../service/country.service.js';

class CountryController {
    async create(ctx) {
        const nomi = await countryModel.findOne('nomi', ctx.request.body.nomi);
        if (nomi) {
            ctx.throw(409, 'Country name oldready exists');
        }
        const newCountry = await countryModel.create(ctx.request.body);
        ctx.status = 201;
        ctx.body = newCountry;
    }

    async findAll(ctx) {
        const data = await countryModel.getAll()
        ctx.status = 200;
        ctx.body = data;
    }

    async findById(ctx) {
        const data = await countryModel.getById(ctx.params.id);
        if (!data) {
            ctx.throw(404, 'not found');
        }
        ctx.status = 200;
        ctx.body = data;
    }

    async updata(ctx) {
        const data = await countryModel.updata(ctx.params.id, ctx.request.body);
        if (!data) {
            ctx.throw(404, 'Not found');
        }
        ctx.status = 200;
        ctx.body = data;
    }

    async delete(ctx) {
        const data = await countryModel.delete(ctx.params.id);
        if (!data) {
            ctx.throw(404, 'not found');
        }
        ctx.status = 200;
        ctx.body = {};
    }
}

export default new CountryController();