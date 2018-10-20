exports.run = (client, message) => {
	for(let i = 100; i < 156000;){
		i = i + i * 0.1
		let n;
		if(n >= 0){
			console.log(i);
			n = n + 1;
			console.log(n)
		} else {
		n = 0
		}
	}
}
