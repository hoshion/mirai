exports.run = (client, message, args) => {
	const word = args.join(" ").match(/"(.+?)"/g);
	message.channel.send(`${word[0][1]} ${word[1][1]} ${word[2][1]}`);
}
