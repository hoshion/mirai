exports.run = async (client, message, args) => {
    message.channel.startTyping()
    
    const Jimp = require("jimp");
    const mysql = require("mysql");
    const con = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME
    });

    const mentionMember = message.mentions.members.first();
    const tag = message.author.tag;
    const avatar = message.author.avatarURL;
    
    con.query(`SELECT * FROM local WHERE userid = ${message.author.id} AND serverid = ${message.guild.id}`, function(err, result){
        if(args[0] == "фоны"){
            if(!args[1]) return message.channel.send("Список фонов : `autumn`, `greenleaves`");
            if(args[1]){
                Jimp.read(`images/rank/${args[1]}.png`).then(image => {
                    image.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
						if(err) return message.channel.send("Неверное название фона!")
                        message.channel.send({files: [{name: `${args[1]}.jpg`, attachment: buffer}]});
                    });
                });
            }
            return;
        };
        if(args[0] == "фон"){
            if(!args[1]) return message.channel.send("Вы не ввели название фона для установки!");
            if(args[1]){
                Jimp.read(`images/rank/${args[1]}.png`, (err, image) => {
                    if(err) return message.channel.send("Неверное название фона!");
                    con.query(`UPDATE local SET profileback = '${args[1]}' WHERE userid = ${message.author.id} AND serverid = ${message.guild.id}`)
                    return message.channel.send(`Успешно установлен фон **${args[1]}**`)
                });
            }
            return;
        }
        if(result[0].profileback == null) return message.channel.send("Вы не установили фон для ранга. \nЧтобы установить напишите `-ранг фон [название_фона]`. \nЧтобы узнать, какие фоны есть, напишите `-ранг фоны`. \nЧтобы увидеть фон, напишите `-ранг фоны [название_фона]`");
        Jimp.read(avatar).then(avatar => {
				Jimp.read(`images/another/rankframe.png`).then(rankframe => {
					Jimp.read(`images/rank/${result[0].profileback}.png`).then(background3 => {
						Jimp.loadFont('images/fonts/font1.fnt').then(font => {
							Jimp.loadFont('images/fonts/font2.fnt').then(font1 => {
								new Jimp(250, 400, '#383838', function(err, shadow1){
									new Jimp(250, 400, '#FFFFFF', function(err, background) {
										new Jimp(250, 250, "#000000", function(err, background2){
											if(err) console.log(err);
											avatar.resize(250, 250);
											background.opacity(0.8);
											shadow1.opacity(0.8);
											background2.opacity(0.8);
											rankframe.mask(background3, 0, 0);
											rankframe.composite(shadow1, 35, 295);
											rankframe.composite(background, 25, 285);
											rankframe.composite(background2, 35, 20);
											rankframe.composite(avatar, 25, 10);
											rankframe.print(font, 30, 305, `${message.author.username}`);
											rankframe.print(font, 30, 385, `Место: в разработке`)
											rankframe.print(font, 30, 345, `XP: ${result[0].xp}`);
											rankframe.write('rank.png');
											rankframe.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
												message.channel.send({files: [{name: 'rank.png', attachment: buffer}]});
											});
										});
									});
								});
							});
						});
					});
				});
		});
    });
    message.channel.stopTyping()
}
