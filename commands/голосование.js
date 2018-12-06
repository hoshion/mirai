exports.run = (client, message, args) => {
	const word = args.join(" ").match(/"(.+?)"/g);
	message.channel.send(`${word[0][0]} ${word[1][0]} ${word[2][0]}`);
}
