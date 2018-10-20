exports.run = async (client, member) => {
    const Jimp = require("jimp");
    const mysql = require("mysql");
	const con = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME
    });
	
	member.send("Дружок, я вижу ты зашёл на сервер ***Kyoto City***. Будь хорошим мальчиком и старайся общаться. Советуем заглянуть в комнату " + member.guild.channels.get("497834668981354497") + ", " + member.guild.channels.get("497834766679277569") + ", " + member.guild.channels.get("497836123725496322") + "и " + member.guild.channels.get("497835838147657749") + ". Получай опыт и становись выше других.");
    con.query(`SELECT * FROM local WHERE serverid = '${member.guild.id}' AND type = 'autorole'`, function(err, result){
		if(err) console.log(err);
		if(!result[0]) return;
		member.addRole(member.guild.roles.get(result[0].roleid));
    })
	con.query(`SELECT * FROM local WHERE serverid = '${member.guild.id}' AND type = 'welcome'`, function(err, result){
		member.guild.channels.get(result[0].channelid).send(parseInt(result[0].message));
	})
    /*const tag = member.user.tag;
    const avatar = member.user.avatarURL;
  	    Jimp.read(avatar).then(avatar => {
            Jimp.read(`images/another/welcome_background2.png`).then(background => {
                Jimp.loadFont('images/fonts/welcome_font7.fnt').then(font => {
                    Jimp.loadFont('images/fonts/welcome_font1.fnt').then(font1 => {
                        avatar.resize(150,150);
                       	background.composite(avatar, 625, 25);
                       	background.print(font, 25, 20,`Добро пожаловать!`);                                            
                        background.print(font1, 25, 95,`${tag}`);
                        background.write('welcome_last.png');
                        background.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
                        	defaultChannel.send({files: [{name: 'welcome_last.png', attachment: buffer}]});
                        });
                    });
                });
            });
        });*/
	console.log("Присоединился " + member.user.username);
}
