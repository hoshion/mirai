exports.run = (client) => {
    console.log('Бот успешно включен!');
    client.user.setActivity("-помощь", {type: "WATCHING"});
    client.fetchUser('412338841651904516').then(user => user.send(`Я запустилась`));
    
    const mysql = require("mysql");
    const con = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME
    });
    
    //con.query(`SELECT`)
};
