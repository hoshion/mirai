exports.run = async (client, message, args) => {
    await message.channel.send(args.join(" "));
    await message.delete();
}
exports.help = (client, message, args) => {
    message.channel.send(`Проверка`);
}
