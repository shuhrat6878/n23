import { Pool } from "pg";

const pg = new Pool({
    connectionString: "postgres://postgres:1112@localhost:5432/n23"

});


export default pg;