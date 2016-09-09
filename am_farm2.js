function farm(){
	pueblo = firstt.attr('id');
	firstt.find('.farm_'pueblo).last().click();
	var b = $('#bot_check');
	var c = parseInt($('.unit-item-light').html());
	var d = parseInt($('.unit-item-spy').html());
	if (b.size() != 0 || c<10 || d==0) {
		console.log('stopped now');
		clearInterval(interval)
	}
	firstt = firstt.next();
}
var interval;
var firstt;
function farm2(templ, indexio=0){
	firstt = $('#plunder_list').children().find('tr').first().next();
	interval = setInterval(farm, 500);
}