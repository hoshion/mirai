exports.run = async (client, message, args) => {
    await message.channel.send(args.join(" "));
    await message.delete();
}
exports.help = (client, message) => {
    message.channel.send(`**Информация о команде "скажи"**\n\nС помощью этой команды вы можете писать со стороны бота\nЧтобы воспользоваться этой командой, напишите \`-скажи текст\``);
}
