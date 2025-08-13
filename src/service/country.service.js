import pg from "../db/index.js";

class CountryService {

    async create(body) {
        const columns = Object.keys(body).join(',');
        const rows = Object.values(body);
        const values = rows.map((_, i) => `$${i + 1}`);
        const query = `insert into country(${columns}) values (${values}) returning *`;
        const result = pg.query(query, rows);
        return (await result).rows[0];
    }

    async getAll() {
        const result = await pg.query('select c.id id, c.nomi country, ci.name city,u.fullname user from country as c left join city as ci on c.id=ci.country_id left join users as u on ci.id=u.city_id order by c.id asc');
        return result.rows;
    }

    async getById(id) {
        const result = await pg.query('select c.id id, c.nomi country, ci.name city,u.fullname user from country as c left join city as ci on c.id=ci.country_id left join users as u on ci.id=u.city_id  where c.id=$1', [id]);
        return result.rows[0]
    }

    async findOne(key, value) {
        const result = await pg.query(`select * from country where ${key}=$1`, [value]);
        return result.rows[0];
    }

    async updata(id, body) {
        const keys = Object.keys(body);
        const values = Object.values(body);
        let query = 'update country set ';
        for (let i = 0; i < keys.length; i++) {
            if (i == keys.length - 1) {
                query += `${keys[i]}= $${i + 1} `;
            }
            else {
                query += `${keys[i]}= $${i + 1}, `;
            }
        }
        query += `where id = ${id} returning *`;
        const result = await pg.query(query, values);
        return result.rows[0];


    }

    async delete(id) {
        const result = await pg.query(`delete from country where id=$1 returning *`, [id]);
        return result.rows[0];
    }

}
export default new CountryService();