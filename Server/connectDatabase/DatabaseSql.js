const mysql = require("mysql");

const config = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "fai23102544",
    database: "maripo",
});

// ทดสอบการเชื่อมต่อ
config.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err.message);
        return;
    }
    console.log("Connected to the MySQL database!");
});

module.exports = config;
