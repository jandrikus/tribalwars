function check(){
	var hiddenFrameUrl = '/game.php?village='+game_data.village.id+'&screen=market&mode=exchange';
	var hiddenFrame = createHiddenFrame(hiddenFrameUrl,TWBot.attacks.frameLoaded(hiddenFrame));
};
function frameLoaded(hiddenFrame){
	var b=hiddenFrame.contents().find('#bot_check');
	var c = hiddenFrame.contents().find('img[src="/human.png"]');
	var wood = hiddenFrame.contents().find('#premium_exchange_rate_wood').find('.premium-exchange-sep').first().text().substr(1);
	var stone = hiddenFrame.contents().find('#premium_exchange_rate_stone').find('.premium-exchange-sep').first().text().substr(1);
	var iron = hiddenFrame.contents().find('#premium_exchange_rate_iron').find('.premium-exchange-sep').first().text().substr(1);
	console.log(wood+' '+stone+' '+iron);
	console.log('here');
	if(b.size()!==0||c.size()!==0){
		console.log('Bot Protection! you need to enter a captcha somewhere... not sure what to do<br />Disabling botmode for now!');
	}
	hiddenFrame.attr('src', ' ');
	hiddenFrame.remove();
};
function createHiddenFrame(a,b){
	return $('<iframe src="'+a+'" />').load(b).css({width:'100px',height:'100px',position:'absolute',left:'-1000px'}).appendTo('body');
};
setInterval(check,30000);