import pg from 'pg'
import DaCar from './dacar.mjs';

const pool = new pg.Pool ({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: 'demo12',
    database: 'demo',
})

const daCar = new DaCar(pool);
export {daCar};
