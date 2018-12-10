exports.run = (client, message, args) => {
	if(message.author.id != `412338841651904516`) return;
	const code   = args.join(` `);
	let evaled = eval(code)
    if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
	message.channel.send(clean(evaled));
}
function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}
