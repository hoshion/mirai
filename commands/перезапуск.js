exports.run = (client, message, args) => {
    if(!args[0]) return message.channel.send("Введите команду для перезапуска!");
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Недостаточно прав!");

    delete require.cache[require.resolve(`./${args[0]}.js`)];
    message.channel.send(`Команда **${args[0]}** успешно перезагружена!`);
    console.log(`Команда ${args[0]} перезагружена.`)
}