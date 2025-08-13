import pg from '../db/index.js';

class UserService {
    async create(body) {
        const columns = Object.keys(body).join(',');
        const rows = Object.values(body);
        const values = rows.map((__, i) => `$${i + 1}`);
        const query = `insert into users (${columns}) values (${values}) returning *`;
        const result = await pg.query(query, rows);
        return result.rows[0];
    }

    async findAll() {
        const result = await pg.query('select u.id userId, u.fullname name, ci.name city, c.nomi country from users as u left join city as ci on u.city_id=ci.id left join country c on ci.country_id=c.id order by u.id asc');
        return result.rows;
    }

    async findById(id) {
        const result = await pg.query(`select u.id userId, u.fullname name, ci.name city, c.nomi country from users as u left join city as ci on u.city_id=ci.id left join country c on ci.country_id=c.id where u.id=$1`, [id]);
        return result.rows[0];
    }

    async findOne(key, value) {
        const result = await pg.query(`select * from users where ${key}=$1`, [value]);
        return result.rows[0];
    }

    async updata(id, body) {
        let query = "update users set ";
        const keys = Object.keys(body);
        const values = Object.values(body);
        for (let i = 0; i < keys.length; i++) {
            if (i == keys.length - 1) {
                query += `${keys[i]}= $${i + 1} `;
            }
            else {
                query += `${keys[i]}= $${i + 1}, `;
            }
        }
        query += `where id=${id} returning *`;
        const result = await pg.query(query, values);
        return result.rows[0];
    }

    async delete(id) {
        const result = await pg.query(`delete from users where id=$1 returning *`, [id]);
        return result.rows[0];
    }
}

export default new UserService;