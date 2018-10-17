exports.run = async (client, guild) => {
    const mysql = require("mysql");
	const con = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME
    });
    con.query(`CREATE TABLE ${guild.id} (type VARCHAR(128), id VARCHAR(128), xp INT(128), lvl VARCHAR(128), sex VARCHAR(128), profileback VARCHAR(128))`)
}
