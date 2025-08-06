import pg from "../db/db.js";

class BaseController {
    constructor(tableName) {
        this.tableName = tableName;
    }

     create=async (req, res)=> {
        try {
            const keys = Object.keys(req.body);
            const values = Object.values(req.body);
            const placeholders = keys.map((_, idx) => `$${idx + 1}`).join(', ');

            const query = `INSERT INTO ${this.tableName} (${keys.join(', ')}) VALUES (${placeholders}) RETURNING *`;
            const result = await pg.query(query, values);

            return res.status(201).json({
                status: 'success',
                data: result.rows[0]
            });
        } catch (error) {
            return res.status(500).json({ 
                message: error.message });
        }
    }

     getAll = async (req, res)=> {
        try {
            const result = await pg.query(`SELECT * FROM ${this.tableName}`);
            return res.status(200).json({
                status: 'success',
                data: result.rows
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

     getById = async (req, res)=> {
        try {
            const result = await pg.query(`SELECT * FROM ${this.tableName} WHERE id = $1`, [req.params.id]);
            return res.status(200).json({
                status: 'success',
                data: result.rows[0]
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    update = async (req, res) => {
    try {
        const keys = Object.keys(req.body);
        const values = Object.values(req.body);

        if (!keys.length) {
            return res.status(400).json({ message: "Update body is empty" });
        }

        if (!req.params.id) {
            return res.status(400).json({ message: "Missing ID in URL" });
        }

        const updates = keys.map((key, idx) => `${key} = $${idx + 1}`).join(', ');
        const query = `UPDATE ${this.tableName} SET ${updates} WHERE id = $${keys.length + 1} RETURNING *`;

        const fullValues = [...values, Number(req.params.id)];

        const result = await pg.query(query, fullValues);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "No record found with that ID" });
        }

        return res.status(200).json({
            status: 'success',
            data: result.rows[0]
        });

    } catch (error) {
        console.error("Update Error:", error);
        return res.status(500).json({ message: error.message });
    }
};


    delete = async (req, res) =>{
        try {
            await pg.query(`DELETE FROM ${this.tableName} WHERE id = $1`, [req.params.id]);
            return res.status(200).json({
                status: 'success',
                data: {}
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}


export default BaseController;