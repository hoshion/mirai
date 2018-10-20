exports.run = (client, message) => {
	for(let i = 100; i < 156000;){
		i = i + i * 0.1
		console.log(i)
		for(let n = 1; n<600; n++){
			console.log(n);
		}
	}
}
