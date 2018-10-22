exports.run = (client, message, args) => {
	const word = args.join(" ").match(/"(.+?)"/g);
	message.channel.send(`${word[1]} ${word[3]} ${word[5]}`);
}
