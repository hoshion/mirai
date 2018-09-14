exports.run = async (client, member) => {
	const defaultChannel = member.guild.channels.get("489469778067718155");
    defaultChannel.startTyping()
    
    const Jimp = require("jimp");
    const mysql = require("mysql");
    const con = mysql.createConnection({
        host: "db4free.net",
        user: "botdrizba",
        password: "drizba123",
        database: "drizba"
    });

	member.send("Дружок, я вижу ты зашёл на сервер ***Дружелюбная Изба***. Будь хорошим мальчиком и старайся общаться. Советуем заглянуть в комнату " + member.guild.channels.get("468154431347884032") + ", " + member.guild.channels.get("468152369293819936") + ", " + member.guild.channels.get("468146986084990976") + "и " + member.guild.channels.get("468174552225284106") + ". Получай опыт и становись выше других.");
    member.addRole("468166002622988318");
    const tag = member.user.tag;
    const avatar = member.user.avatarURL;
  	    Jimp.read(avatar).then(avatar => {
            Jimp.read(`images/another/welcome_background.png`).then(background => {
                Jimp.loadFont('images/fonts/welcome_font.fnt').then(font => {
                    Jimp.loadFont('images/fonts/font2.fnt').then(font1 => {
                                            avatar.resize(150,150);
                                            background.composite(avatar, 625, 25);
                                            background.print(font, 185, 55,`Добро пожаловать!\n${tag}`);                                            
                                            //background.print(font1, 185, 89,`XP: ${result[0].xp}`);
                                            background.write('welcome_last.png');
                                            background.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
                                                defaultChannel.send({files: [{name: 'welcome_last.png', attachment: buffer}]});
                                            });
                    });
                });
            });
        });
	console.log("Присоединился " + member.user.username);
    defaultChannel.stopTyping()
}
