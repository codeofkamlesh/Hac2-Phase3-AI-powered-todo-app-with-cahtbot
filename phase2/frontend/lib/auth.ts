import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { Pool } from "pg";

// Optimized Pool for Development to fix ETIMEDOUT errors
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false // Neon DB ke liye zaroori hai
    },
    max: 1, // ⚠️ IMPORTANT: Dev mode mein isay 1 rakhein taake connections choke na hon
    connectionTimeoutMillis: 5000, // 5 second mein fail ho jaye agar connect na ho
    idleTimeoutMillis: 1000 // Agar 1 sec tak connection use na ho to foran close kar de
});

export const auth = betterAuth({
    database: pool,
    emailAndPassword: {
        enabled: true,
    },
    plugins: [nextCookies()],
    secret: process.env.BETTER_AUTH_SECRET,
});