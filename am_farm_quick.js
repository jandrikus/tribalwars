function prepare() {
	lista = load('lista', true);
	if (lista == null){
		lista = []
	}
	$('#plunder_list').children().find('tr').each(function(b,a){lista.push(a.id)});
	store('lista', lista, true);
	console.log(lista)
}
function deleteAll(){
	remove('lista');
	remove('index_farm');
}
function remove(a) {
	localStorage.removeItem(game_data.world + '_' + game_data.village.id + '_' + a)
}
var template;
var indexi;
function farm(){
	lista = load('lista', true);
	indexalt = load('index_farm', true);
	if (indexalt != 0 && indexalt != null){
		indexi = indexalt;
	}else{
		indexi=0;
	};
	if (indexi >= lista.length){
		indexi = 0;
	};
	pueblo = lista[indexi];
	if (pueblo != ""){
		coord = parseInt(pueblo.substr(8));
		console.log(coord);
		Accountmanager.farm.sendUnits(this, coord, template);
	};
	indexi++;	
	store('index_farm', indexi, true);
	var b = $('#bot_check');
	var c = parseInt($('.unit-item-light').html());
	if (b.size() != 0 || c<20) {
		console.log('stopped now');
		clearInterval(interval)
	}
}
var interval;
function farm2(templ, indexio=0){
	template = templ;
	indexi = indexio;
	interval = setInterval(farm, 500);
}
function farm3(){
	hiddenFrameUrl = '/game.php?village=8432&screen=am_farm';
	hiddenFrame = createHiddenFrame(hiddenFrameUrl,farm2(7900));
	hiddenFrameUrl = '/game.php?village=8261&screen=am_farm';
	hiddenFrame = createHiddenFrame(hiddenFrameUrl,farm2(7900));
	hiddenFrameUrl = '/game.php?village=9886&screen=am_farm';
	hiddenFrame = createHiddenFrame(hiddenFrameUrl,farm2(7900));
	hiddenFrameUrl = '/game.php?village=8790&screen=am_farm';
	hiddenFrame = createHiddenFrame(hiddenFrameUrl,farm2(7900));
	hiddenFrameUrl = '/game.php?village=9014&screen=am_farm';
	hiddenFrame = createHiddenFrame(hiddenFrameUrl,farm2(7900));
	hiddenFrameUrl = '/game.php?village=6597&screen=am_farm';
	hiddenFrame = createHiddenFrame(hiddenFrameUrl,farm2(7900));
	hiddenFrameUrl = '/game.php?village=10213&screen=am_farm';
	hiddenFrame = createHiddenFrame(hiddenFrameUrl,farm2(7900));
	hiddenFrameUrl = '/game.php?village=9416&screen=am_farm';
	hiddenFrame = createHiddenFrame(hiddenFrameUrl,farm2(7900));
	hiddenFrameUrl = '/game.php?village=7311&screen=am_farm';
	hiddenFrame = createHiddenFrame(hiddenFrameUrl,farm2(7900));
	hiddenFrameUrl = '/game.php?village=7643&screen=am_farm';
	hiddenFrame = createHiddenFrame(hiddenFrameUrl,farm2(7900));
	hiddenFrameUrl = '/game.php?village=9120&screen=am_farm';
	hiddenFrame = createHiddenFrame(hiddenFrameUrl,farm2(7900));
	hiddenFrameUrl = '/game.php?village=8895&screen=am_farm';
	hiddenFrame = createHiddenFrame(hiddenFrameUrl,farm2(7900));
	console.log('done');
}
function store(a, b, c) {
	if (c) {
		localStorage.setItem(game_data.world + '_' + game_data.village.id + '_' + a, JSON.stringify(b))
	} else {
		localStorage.setItem(game_data.world + '_' + game_data.village.id + '_' + a, b)
	}
}
function load(a, b) {
	if (b) {
		return JSON.parse(localStorage.getItem(game_data.world + '_' + game_data.village.id + '_' + a))
	}
	return localStorage.getItem(game_data.world + '_' + game_data.village.id + '_' + a)
}
function createHiddenFrame(a,b){
	return $('<iframe src="'+a+'" />').on('load', b).css({width:'100px',height:'100px',position:'absolute',left:'-1000px'}).appendTo('body');
};
farm2(7900);