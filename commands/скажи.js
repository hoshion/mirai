exports.run = async (client, message, args) => {
    await message.channel.send(args.join(" "));
    await message.delete();
}