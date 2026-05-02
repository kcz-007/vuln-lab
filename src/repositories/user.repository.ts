import { pool } from '../db';

export const userRepository = {
    async createUser(email: string, password: string) {
        const result = await pool.query(
            `INSERT INTO users (email, password)
            VALUES ($1, $2)
            RETURNING id, email, created_at`,
            [email,password]
        );

        return result.rows[0];
    },

    async findByEmail(email: string){
        const result = await pool.query(
            `SELECT id, email, password, created_at
            FROM users
            WHERE email = $1`,
            [email]
        );
        return result.rows[0] || null;
    },

    async findById(id: number){
        const result = await pool.query(
            `SELECT id, email, created_at
            FROM users
            WHERE id = $1`,
            [id]
        );
        return result.rows[0] || null;
    }
}