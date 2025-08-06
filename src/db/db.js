import { Pool } from "pg";


const pg =new Pool({
    connectionString: 'postgres://postgres:6878@localhost/n23test'
});

export default pg;


