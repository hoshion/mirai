exports.run = (client, message, args) => {
    try { 
        if(!args[0]) return message.channel.send("Вы не ввели число!");
        const random = Math.floor(Math.random() * parseInt(args[0])) + 1;
        message.channel.send("Ваше число : **" + random + "**!");
    } catch(err){
        client.fetchUser('412338841651904516').then(user => user.send(`\`\`\`javascript\n${err.stack}\`\`\``));
    }
}
exports.help = (client, message) => {
    message.channel.send(`**Информация о команде "кубик"**\n\nПозволяет выдать вам рандомное число из указанного диапазона.\nЧтобы использовать, напишите \`-кубик число\``)
}
