import { Sinf } from '../model/index.model.js';

class SinfController {
    async create(req, res) {
        const newSinf = await Sinf.create(req.body);
        return res.status(201).json({
            statusCode: 201,
            data: newSinf
        });
    }

    async findAll(_req, res) {
        const sinf = await Sinf.findAll({ order: [['createdAt', 'DESC']], include: {all: true} });
        return res.status(200).json({
            statusCode: 200,
            data: sinf
        });
    }

    async findOne(req, res) {
        const sinf = await Sinf.findByPk(req.params.id, {include: {all: true}});
        if (!sinf) {
            return res.status(404).json({
                error: {
                    message: 'sinf not found'
                }
            });
        }
        return res.status(200).json({
            statusCode: 200,
            data: sinf
        });
    }

    async update(req, res) {
        const sinf = await Sinf.update(req.body, { where: { id: req.params.id }, returning: true });
        if (sinf[0] === 0) {
            return res.status(404).json({
                error: {
                    message: 'sinf not found'
                }
            });
        }
        return res.status(200).json({
            statusCode: 200,
            data: sinf[1][0]
        });
    }

    async remove(req, res) {
        const sinf = await Sinf.destroy({ where: { id: req.params.id } });
        if (!sinf) {
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

export default new SinfController();