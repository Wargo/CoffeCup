
module.exports = function(setData) {
	
	var client = Ti.Network.createHTTPClient({
		onload:function() {
			Ti.API.error(this.responseText);
			
			var result = JSON.parse(this.responseText);
			
			if (result.status = 'ok') {
				setData(result.data);
			} else {
				alert(result.message);
			}
		},
		onerror:function(e) {
			alert(e);
		},
		timeout:15000
	});
	
	client.open('POST', 'http://www.servidordeprueba.net/webs/coffecup_cake/users/json');
	
	client.send({
		w:Ti.Platform.displayCaps.platformWidth,
		h:Ti.Platform.displayCaps.platformHeight
	});
	
	/*
	setData([
		{
			id:1, img_p:'http://www.servidordeprueba.net/webs/coffecup/imgp/1.jpg',
			name:'Albert Soriano',
			charge:'CEO Artvisual',
			email:'asg.artvisual@gmail.com',
			mobile:null,
			birthday:'10-09-1980',
			talkmeabout:'Tecnología, publicidad, negocios, porno, deporte, videojuegos, internet...',
			icomefrom:'Valencia (España)'
		},
		{
			id:1, img_p:'http://www.servidordeprueba.net/webs/coffecup/imgp/2.jpg',
			name:'Albert Soriano',
			charge:'CEO Artvisual',
			email:'asg.artvisual@gmail.com',
			mobile:null,
			birthday:'10-09-1980',
			talkmeabout:'Tecnología, publicidad, negocios, porno, deporte, videojuegos, internet...',
			icomefrom:'Valencia (España)'
		},
		{
			id:1, img_p:'http://www.servidordeprueba.net/webs/coffecup/imgp/3.jpg',
			name:'Albert Soriano',
			charge:'CEO Artvisual',
			email:'asg.artvisual@gmail.com',
			mobile:null,
			birthday:'10-09-1980',
			talkmeabout:'Tecnología, publicidad, negocios, porno, deporte, videojuegos, internet...',
			icomefrom:'Valencia (España)'
		},
		{
			id:1, img_p:'http://www.servidordeprueba.net/webs/coffecup/imgp/4.jpg',
			name:'Albert Soriano',
			charge:'CEO Artvisual',
			email:'asg.artvisual@gmail.com',
			mobile:null,
			birthday:'10-09-1980',
			talkmeabout:'Tecnología, publicidad, negocios, porno, deporte, videojuegos, internet...',
			icomefrom:'Valencia (España)'
		},
		{
			id:1, img_p:'http://www.servidordeprueba.net/webs/coffecup/imgp/5.jpg',
			name:'Albert Soriano',
			charge:'CEO Artvisual',
			email:'asg.artvisual@gmail.com',
			mobile:null,
			birthday:'10-09-1980',
			talkmeabout:'Tecnología, publicidad, negocios, porno, deporte, videojuegos, internet...',
			icomefrom:'Valencia (España)'
		},
		{
			id:1, img_p:'http://www.servidordeprueba.net/webs/coffecup/imgp/6.jpg',
			name:'Albert Soriano',
			charge:'CEO Artvisual',
			email:'asg.artvisual@gmail.com',
			mobile:null,
			birthday:'10-09-1980',
			talkmeabout:'Tecnología, publicidad, negocios, porno, deporte, videojuegos, internet...',
			icomefrom:'Valencia (España)'
		},
		{
			id:1, img_p:'http://www.servidordeprueba.net/webs/coffecup/imgp/7.jpg',
			name:'Albert Soriano',
			charge:'CEO Artvisual',
			email:'asg.artvisual@gmail.com',
			mobile:null,
			birthday:'10-09-1980',
			talkmeabout:'Tecnología, publicidad, negocios, porno, deporte, videojuegos, internet...',
			icomefrom:'Valencia (España)'
		},
		{
			id:1, img_p:'http://www.servidordeprueba.net/webs/coffecup/imgp/8.jpg',
			name:'Albert Soriano',
			charge:'CEO Artvisual',
			email:'asg.artvisual@gmail.com',
			mobile:null,
			birthday:'10-09-1980',
			talkmeabout:'Tecnología, publicidad, negocios, porno, deporte, videojuegos, internet...',
			icomefrom:'Valencia (España)'
		},
		{
			id:1, img_p:'http://www.servidordeprueba.net/webs/coffecup/imgp/9.jpg',
			name:'Albert Soriano',
			charge:'CEO Artvisual',
			email:'asg.artvisual@gmail.com',
			mobile:null,
			birthday:'10-09-1980',
			talkmeabout:'Tecnología, publicidad, negocios, porno, deporte, videojuegos, internet...',
			icomefrom:'Valencia (España)'
		},
		{
			id:1, img_p:'http://www.servidordeprueba.net/webs/coffecup/imgp/10.jpg',
			name:'Albert Soriano',
			charge:'CEO Artvisual',
			email:'asg.artvisual@gmail.com',
			mobile:null,
			birthday:'10-09-1980',
			talkmeabout:'Tecnología, publicidad, negocios, porno, deporte, videojuegos, internet...',
			icomefrom:'Valencia (España)'
		},
		{
			id:1, img_p:'http://www.servidordeprueba.net/webs/coffecup/imgp/11.jpg',
			name:'Albert Soriano',
			charge:'CEO Artvisual',
			email:'asg.artvisual@gmail.com',
			mobile:null,
			birthday:'10-09-1980',
			talkmeabout:'Tecnología, publicidad, negocios, porno, deporte, videojuegos, internet...',
			icomefrom:'Valencia (España)'
		},
		{
			id:1, img_p:'http://www.servidordeprueba.net/webs/coffecup/imgp/12.jpg',
			name:'Albert Soriano',
			charge:'CEO Artvisual',
			email:'asg.artvisual@gmail.com',
			mobile:null,
			birthday:'10-09-1980',
			talkmeabout:'Tecnología, publicidad, negocios, porno, deporte, videojuegos, internet...',
			icomefrom:'Valencia (España)'
		},
		{
			id:1, img_p:'http://www.servidordeprueba.net/webs/coffecup/imgp/13.jpg',
			name:'Albert Soriano',
			charge:'CEO Artvisual',
			email:'asg.artvisual@gmail.com',
			mobile:null,
			birthday:'10-09-1980',
			talkmeabout:'Tecnología, publicidad, negocios, porno, deporte, videojuegos, internet...',
			icomefrom:'Valencia (España)'
		},
		{
			id:1, img_p:'http://www.servidordeprueba.net/webs/coffecup/imgp/14.jpg',
			name:'Albert Soriano',
			charge:'CEO Artvisual',
			email:'asg.artvisual@gmail.com',
			mobile:null,
			birthday:'10-09-1980',
			talkmeabout:'Tecnología, publicidad, negocios, porno, deporte, videojuegos, internet...',
			icomefrom:'Valencia (España)'
		},
		{
			id:1, img_p:'http://www.servidordeprueba.net/webs/coffecup/imgp/15.jpg',
			name:'Albert Soriano',
			charge:'CEO Artvisual',
			email:'asg.artvisual@gmail.com',
			mobile:null,
			birthday:'10-09-1980',
			talkmeabout:'Tecnología, publicidad, negocios, porno, deporte, videojuegos, internet...',
			icomefrom:'Valencia (España)'
		},
		{
			id:1, img_p:'http://www.servidordeprueba.net/webs/coffecup/imgp/17.jpg',
			name:'Albert Soriano',
			charge:'CEO Artvisual',
			email:'asg.artvisual@gmail.com',
			mobile:null,
			birthday:'10-09-1980',
			talkmeabout:'Tecnología, publicidad, negocios, porno, deporte, videojuegos, internet...',
			icomefrom:'Valencia (España)'
		},
	]);
	*/
	
}
