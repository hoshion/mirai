exports.run = (client) => {
    console.log('Бот успешно включен!');
    client.user.setActivity("за порядком", {type: "WATCHING"});
    
    const mysql = require("mysql");
    const con = mysql.createConnection({
        host: "db4free.net",
        user: "botdrizba",
        password: "drizba123",
        database: "drizba"
    });

    //con.query(`SELECT`)
};