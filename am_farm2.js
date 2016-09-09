function farm(){
	pueblo = firstt.attr('id');	
	var b = $('#bot_check');
	var c = parseInt($('.unit-item-light').html());
	var d = parseInt($('.unit-item-spy').html());
	var e = parseInt($('.unit-item-heavy').html());
	if (b.size() != 0) {
		console.log('stopped now');
		clearInterval(interval)
	}
	if (c!=0 || d!=0 || e!=0){
		firstt.find('.farm_'+pueblo).last().click();
	}
	else if (d!=0){
		firstt.find('.farm_'+pueblo).first().click();
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