import { pool } from "./index";

async function testDB() {
    const res = await pool.query("SELECT NOW");
    console.log(res.rows)
}

testDB();