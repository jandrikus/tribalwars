function check(){
	var hiddenFrameUrl = '/game.php?village='+game_data.village.id+'&screen=market&mode=exchange';
	hiddenFrame = createHiddenFrame(hiddenFrameUrl,frameLoaded);
};
function frameLoaded(){
	var b=hiddenFrame.contents().find('#bot_check');
	var c = hiddenFrame.contents().find('img[src="/human.png"]');
	var wood = hiddenFrame.contents().find('#premium_exchange_rate_wood').find('.premium-exchange-sep').first().text().substr(1);
	var stone = hiddenFrame.contents().find('#premium_exchange_rate_stone').find('.premium-exchange-sep').first().text().substr(1);
	var iron = hiddenFrame.contents().find('#premium_exchange_rate_iron').find('.premium-exchange-sep').first().text().substr(1);
	console.log(wood+' '+stone+' '+iron);
	console.log('here');
	if(b.size()!==0||c.size()!==0){
		console.log('Bot Protection! you need to enter a captcha somewhere... not sure what to do<br />Disabling botmode for now!');
	};
	if(parseInt(wood)<600||parseInt(stone)<600||parseInt(iron)<600){
		emailjs.init("user_Ns1mc9u1JZwoVmdnW3nEg");
		emailjs.send("default_service","mercado",{name: "TribalWarsMarket", notes: "A vender"});
		clearInterval(interval);
	};
	hiddenFrame.attr('src', ' ');
	hiddenFrame.remove();
};
function createHiddenFrame(a,b){
	return $('<iframe src="'+a+'" />').on('load', b).css({width:'100px',height:'100px',position:'absolute',left:'-1000px'}).appendTo('body');
};
/*
function sendEmail(){
	$.ajax({
	url: "https://rawgit.com/jandrikus/prueba/master/email.py",
	type: 'POST',
	success: function(response){
		console.log(response);
		console.log('good');
	},
	error: function(response){
		console.log(response);
		console.log('wrong');
	}
});
};
*/
var interval = setInterval(check,5000);