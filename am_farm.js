function farm() {
	lista = [];
	for (i=1, i<5, i++){
		window.location.search += '&farm_page='+i;
		$('#plunder_list').children().find('tr').each(function(b,a){lista.push(a.id)})
	}
	console.log(lista)
}
farm()