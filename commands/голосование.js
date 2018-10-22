exports.run = (client, message, args) => {
	const word = args.match(/".+?"/);
	message.channel.send(`${word[0]} ${word[1]} ${word[2]}`);
}
