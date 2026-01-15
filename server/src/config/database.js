const {Pool} = require('pg'); // import công cụ để kết nối 
//pg = thư viện PostgreSQL cho Node.js
// Pool = lớp quản lý kết nối DB

require('dotenv').config({path: "../../.env"}); // get file .env

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    database:process.env.DB_NAME,
    port: process.env.DB_PORT,
});

// Event listen connection
pool.on('error', (err, client) => {
    console.log('Lỗi không mong muốn từ client PostgreSQL', err)
    process.exit(-1);
})

module.exports = pool;