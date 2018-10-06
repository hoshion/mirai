exports.run = (client) => {
    console.log('Бот успешно включен!');
    client.user.setActivity("за порядком", {type: "WATCHING"});
    
    const mysql = require("mysql");
    const con = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME
    });

    //con.query(`SELECT`)
};
