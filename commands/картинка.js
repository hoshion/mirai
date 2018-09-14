exports.run = (client, message, args) => {
    const mysql = require("mysql");
    const con = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME
    });

    if(args[0] == "добавить"){
        if(args[1] == "поцелуй"){
            con.query(`SELECT id FROM kiss ORDER BY kiss.id DESC`, function(err, result){
                if(err) throw err;
                if(result.length == 0){
                    con.query(`INSERT INTO kiss VALUES(1,'${args[2]}')`);
                    message.channel.send("Успешно добавлено!");
                    return;
                }
                const lastID = result[0].id;
                const newID = lastID + 1;
                con.query(`INSERT INTO kiss VALUES(${newID},'${args[2]}')`);
                message.channel.send("Успешно добавлено!");
                return;
            })
        }
        if(args[1] == "объятия"){
            con.query(`SELECT id FROM hug ORDER BY hug.id DESC`, function(err, result){
                if(err) throw err;
                if(result.length == 0){
                    con.query(`INSERT INTO hug VALUES(1,'${args[2]}')`);
                    message.channel.send("Успешно добавлено!");
                    return;
                }
                const lastID = result[0].id;
                const newID = lastID + 1;
                con.query(`INSERT INTO hug VALUES(${newID},'${args[2]}')`);
                message.channel.send("Успешно добавлено!");
                return;
            })
        }
        if(args[1] == "пинок"){
            con.query(`SELECT id FROM kick ORDER BY kick.id DESC`, function(err, result){
                if(err) throw err;
                if(result.length == 0){
                    con.query(`INSERT INTO kick VALUES(1,'${args[2]}')`);
                    message.channel.send("Успешно добавлено!");
                    return;
                }
                const lastID = result[0].id;
                const newID = lastID + 1;
                con.query(`INSERT INTO kick VALUES(${newID},'${args[2]}')`);
                message.channel.send("Успешно добавлено!");
                return;
            })
        }
        if(args[1] == "удар"){
            con.query(`SELECT id FROM punch ORDER BY punch.id DESC`, function(err, result){
                if(err) throw err;
                if(result.length == 0){
                    con.query(`INSERT INTO punch VALUES(1,'${args[2]}')`);
                    message.channel.send("Успешно добавлено!");
                    return;
                }
                const lastID = result[0].id;
                const newID = lastID + 1;
                con.query(`INSERT INTO punch VALUES(${newID},'${args[2]}')`);
                message.channel.send("Успешно добавлено!");
                return;
            })
        }
    }
    console.log('Команда "картинка" использована пользователем ' + message.author.username + '. Результат - успешно');
}
