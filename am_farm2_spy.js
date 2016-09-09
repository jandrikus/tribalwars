function farm(){
	pueblo = firstt.attr('id');	
	var b = $('#bot_check');
	var d = parseInt($('.unit-item-spy').html());
	if (b.size() != 0) {
		console.log('stopped now');
		clearInterval(interval)
	}
	if (d!=0){
		firstt.find('.farm_'+pueblo).first().click();
	}
	else {
		console.log('stopped now');
		clearInterval(interval)
	}
	firstt = firstt.next();
}
var interval;
var firstt;
function farm2(){
	firstt = $('#plunder_list').children().find('tr').first().next();
	interval = setInterval(farm, 500);
}
farm2();