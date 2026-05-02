import "../config";
import { pool } from "../db";

async function testDB(){
    try {
        const res = await pool.query("SELECT NOW()");
        console.log("DB connetion successful:", res.rows[0]);
    } catch (error) {
        console.log("DB error:", error);
    } finally {
        await pool.end();
    }
}

testDB();