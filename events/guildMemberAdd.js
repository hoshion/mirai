exports.run = async (client, member) => {
    const Jimp = require("jimp");
    const mysql = require("mysql");
	const con = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME
    });
    con.query(`SELECT * FROM local WHERE serverid = '${member.guild.id}' AND type = 'autorole'`, function(err, result){
		if(err) return client.fetchUser('412338841651904516').then(user => user.send(`\`\`\`javascript\n${err.stack}\`\`\``));
		if(!result[0]) return;
		member.addRole(member.guild.roles.get(result[0].roleid));
    })
	con.query(`SELECT * FROM local WHERE serverid = '${member.guild.id}' AND type = 'welcome'`, function(err, result){
		if(err) return client.fetchUser('412338841651904516').then(user => user.send(`\`\`\`javascript\n${err.stack}\`\`\``));
		if(!result[0]) return;
		member.guild.channels.get(result[0].channelid).send(`${eval(result[0].message)}`);
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
