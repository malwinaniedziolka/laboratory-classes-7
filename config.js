const PORT = 3000;

const DB_USER = process.env.DB_USER || "";
const DB_PASS = process.env.DB_PASS || "";

module.exports = { 
    PORT,
    DB_USER,
    DB_PASS
};
