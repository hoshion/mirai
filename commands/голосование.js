exports.run = (client, message) => {
	const args = message.content.slice(14).trim().split(`" `);
	message.channel.send(`${args[0]} ${args[1]}`)
}
