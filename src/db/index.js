import { Pool } from "pg";
const pg = new Pool({
    connectionString: "postgres://shuhrat:6878@localhost:2000/n23"
});

pg.on("error", (err) => {
    console.log('Error databasaga ulanishda xatolik yuz berdi', err);
});
export default pg;
