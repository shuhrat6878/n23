import pg from "../db/index.js";

class CityService {
    async create(body) {
        const columns = Object.keys(body).join(',');
        const rows = Object.values(body);
        const values = rows.map((_, i) => `$${i + 1}`);
        const query = `insert into city(${columns}) values(${values})returning *`;
        const result = await pg.query(query, rows);
        return result.rows[0];
    }

    async findAll() {
        const data = await db.query('select ci.id id, c.nomi country, ci.name city,u.fullname user from country as c left join city as ci on c.id=ci.country_id left join users as u on ci.id=u.city_id order by c.id asc');
        return data.rows;
    }

    async findById(id) {
        const data = await db.query('select ci.id id, c.nomi country, ci.name city,u.fullname user from country as c left join city as ci on c.id=ci.country_id left join users as u on ci.id=u.city_id  where ci.id=$1', [id]);
        return data.rows;
    }

    async findOne(key, value) {
        const data = await db.query(`select * from city where ${key}=$1`, [value]);
        return data.rows[0];
    }

    async updata(id, body) {
        const keys = Object.keys(body);
        const rows = Object.values(body);
        let query = `update city set `;
        for (let i = 0; i < keys.length; i++) {
            if (i == keys.length - 1) {
                query += `${keys[i]}=$${i + 1} `;
            }
            else {
                query += `${keys[i]}=$${i + 1}, `
            }
        }
        query += `where id=${id} returning *`;
        const data = db.query(query, rows);
        return (await data).rows[0];
    }

    async delete(id) {
        const data = await db.query(`delete from city where id=$1 returning *`, [id]);
        return data.rows[0];
    }
}

export default new CityService;