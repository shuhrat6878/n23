import { Maktab } from '../model/index.model.js';

class MaktabController {
    async create(req, res) {
        const newMaktab = await Maktab.create(req.body);
        return res.status(201).json({
            statusCode: 201,
            data: newMaktab
        });
    }

    async findAll(_req, res) {
        const maktab = await Maktab.findAll({ order: [['createdAt', 'DESC']], include: {all: true} });
        return res.status(200).json({
            statusCode: 200,
            data: maktab
        });
    }

    async findOne(req, res) {
        const maktab = await Maktab.findByPk(req.params.id, {include: {all: true}});
        if (!maktab) {
            return res.status(404).json({
                error: {
                    message: 'Maktab not found'
                }
            });
        }
        return res.status(200).json({
            statusCode: 200,
            data: Maktab
        });
    }

    async update(req, res) {
        const maktab = await Maktab.update(req.body, { where: { id: req.params.id }, returning: true });
        if (maktab[0] === 0) {
            return res.status(404).json({
                error: {
                    message: 'Maktab not found'
                }
            });
        }
        return res.status(200).json({
            statusCode: 200,
            data: maktab[1][0]
        });
    }

    async remove(req, res) {
        const maktab = await Maktab.destroy({ where: { id: req.params.id } });
        if (!maktab) {
            return res.status(404).json({
                error: {
                    message: 'Sinf not found'
                }
            });
        }
        return res.status(200).json({
            statusCode: 200,
            data: {}
        });
    }
}

export default new MaktabController();