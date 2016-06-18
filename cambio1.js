var TWBot={
	init:function(){
		this.helpers.init();
		this.data.init();
		this.attacks.init();
		this.remote.init();
		var j=this.data.loadGlobally('init_seensplashscreen');
		if(j===null){
			this.helpers.showSplash();
			TWBot.data.storeGlobally('init_seensplashscreen',true);
		}
		Function.prototype.Timer=function(a,b,c){
			var d=0;
			var e=this;
			var f=new Date();
			var g=function(){
				return e(f,d);
			};
			var h=function(){
				if(c){
					c(f,d,b);
				}
			};
			i=function(){
				d++;
				if(d<b&&g()!==false){
					window.setTimeout(i,a);
				}
				else{
					h();
				}
			};
			i();
		};
	},
	htmlsnippets:{
			captchaFrame:'<div id="captchacloser"></div><div id="captchaframe"></div>',
			splash:'<div id="closer"></div><div id="splashscreen"><h1>New Version of the Bot</h1><p>Yeah, it is updated, look to the right.. <br />You can pin the panel by clicking on the tack at the top.<br />Remote attacks are loaded automatically, if you want to attack either check the <b>AutoPilot</b> and enjoy the ride, or load the desired attack and Fire away as soon as the countdown tells you to do so.<br />If the remote attack is underlined it means that the attack shall arrive coordinated at the same time from all members, so it would be crucial to attack at the correct time!<br />Hovering over the remote attack name will show you a description set by our leaders<br />Hovering over the remote attack countdown will show you the estimated travel times from your different villages, for that to work you will have to start the bot at least once from every village to store the corresponding coords, etc<br /><br />So.. have fun and if you want: </p><form action="https://www.paypal.com/cgi-bin/webscr" method="post"><input type="hidden" name="cmd" value="_s-xclick"><input type="hidden" name="hosted_button_id" value="HZK34AYU8LLWG"><input type="image" src="https://www.paypalobjects.com/en_GB/i/btn/btn_donate_LG.gif" border="0" name="submit" alt="PayPal — The safer, easier way to pay online."><img alt="" border="0" src="https://www.paypalobjects.com/de_DE/i/scr/pixel.gif" width="1" height="1"></form></div>',
			panel:'<div id="panel"><span id="tack">TWBot</span><div id="newContent"><div id="loading"><img src="graphic/throbber.gif" title="Loading something please wait..." alt="Loading something please wait..." /></div><ul id="messages"><li>Initialized layout</li><li>Loading available troops</li></ul><div id="attackListWrapper"><table id="attackList"></table></div><div id="rAttackListWrapper"><table id="rAttackList"></table></div><h3 id="attackName"></h3><table id="unitTable"><tbody><tr><td valign="top"><table class="vis" width="100%"><tbody><tr><td id="attackUnits" class="nowrap"><img src="https://cdn2.tribalwars.net/graphic/command/attack.png?0019c" title="Attacked villages" alt="Attacked villages" class="" /><input id="attackedVillages" name="attackedVillages" type="text" style="width: 40px" tabindex="10" value="" class="unitsInput" disabled="disabled" /><i id="amount_of_attackedVillages">fetching...</i>&nbsp;</td></tr></tbody></table></td></tr><tr><td valign="top"><table class="vis" width="100%"><tbody><tr><td class="nowrap"><img src="https://cdn2.tribalwars.net/graphic/command/attack.png?0019c" title="Attacked villages" alt="Attacked villages" class="" /><input id="attackedVillages" name="attackedVillages" type="text" style="width: 40px" tabindex="10" value="" class="unitsInput" disabled="disabled" /><i id="amount_of_attackedVillages">fetching...</i>&nbsp;</td></tr></tbody></table></td></tr></tbody></table><div id="buttons"><button id="attackButton">Attack</button><button id="sAttackButton">Stop attacking</button><label for="continuousAttack">Don\'t stop</label> <input type="checkbox" id="continuousAttack" title="if checked the pause at the end of a cycle is omitted"/><label for="botting" title="This may get you banned! but so may using the rest of the script..">BotMode</label> <input type="checkbox" id="botting" title="if checked the page will be prevented from reloading and upon arrival of enough troops the attacks continue automagically"/><label for="ignorePlayers">Users?</label> <input type="checkbox" id="ignorePlayers" title="if checked no user village will be attacked, only Barbs get to fear you" checked="checked"/><button id="cAttackButton">New Attack</button><button id="resetAttack" title="Reset attackcounter to the first village">reset</button><button id="showSplash">Help!</button><button id="processReports">Process Reports</button><button id="delEverything" title="can not be undone!">Delete Everything</button><label for="autoPilot" title="NOT WORKING YET!!! This will try to attack the villages determined by our glorious leaders.">AutoPilot</label> <input type="checkbox" id="autoPilot" title="if checked the swarm takes over the control for some attacks!"/></div></div></div>',
			//popup:'<div id="popup_container"><div id="popup_box_bg"></div><div id="fader" onclick="$(\'#popup_container\').hide();"></div><table style="width: 500px; margin-left: 350px, margin-top:200px" id="popup_box" cellspacing="0"><tr><td class="popup_box_top_left"></td><td class="popup_box_top"></td><td class="popup_box_top_right"></td></tr><tr><td class="popup_box_left"></td><td class="popup_box_content"><a id="popup_box_close" href="#" onclick="$(\'#popup_container\').hide(); return false;">&nbsp;</a><div style="background: no-repeat url(\'/graphic/paladin_new.png\');"><h3 style="margin: 0 3px 5px 120px;">Create new attack plan</h3><table align="right" style="margin-bottom: 5px;"><tr><td class="quest-summary" width="200"><h5>Give it a name:</h5><p style="padding: 5px"><input type="text" id="template_name" /></p></td><td class="quest-summary" width="310">Enter here the new coordinates for this attack<p style="padding: 5px"><input type="text" id="template_coords" /></p></td></tr></table><div class="quest-goal"><table id="unitTableTemplate"><tbody><tr><td valign="top"><table class="vis" width="100%"><tbody><tr><td class="nowrap"><img src="https://cdn2.tribalwars.net/graphic/unit/unit_spear.png?48b3b" title="Spear fighter" alt="Spear fighter" class="" /><input id="template_unit_input_spear" name="spear" type="text" style="width: 40px" tabindex="1" value="" class="unitsInput" /></td></tr><tr><td class="nowrap"><img src="https://cdn2.tribalwars.net/graphic/unit/unit_sword.png?b389d" title="Swordsman" alt="Swordsman" class="" /><input id="template_unit_input_sword" name="sword" type="text" style="width: 40px" tabindex="2" value="" class="unitsInput" /></td></tr><tr><td class="nowrap"><img src="https://cdn2.tribalwars.net/graphic/unit/unit_axe.png?51d94" title="Axeman" alt="Axeman" class="" /><input id="template_unit_input_axe" name="axe" type="text" style="width: 40px" tabindex="3" value="" class="unitsInput" /></td></tr></tbody></table></td><td valign="top"><table class="vis" width="100%"><tbody><tr><td class="nowrap"><img src="https://cdn2.tribalwars.net/graphic/unit/unit_spy.png?eb866" title="Scout" alt="Scout" class="" /><input id="template_unit_input_spy" name="spy" type="text" style="width: 40px" tabindex="4" value="" class="unitsInput" /></td></tr><tr><td class="nowrap"><img src="https://cdn2.tribalwars.net/graphic/unit/unit_light.png?2d86d" title="Light cavalry" alt="Light cavalry" class="" /><input id="template_unit_input_light" name="light" type="text" style="width: 40px" tabindex="5" value="" class="unitsInput" /></td></tr><tr><td class="nowrap"><img src="https://cdn2.tribalwars.net/graphic/unit/unit_heavy.png?a83c9" title="Heavy cavalry" alt="Heavy cavalry" class="" /><input id="template_unit_input_heavy" name="heavy" type="text" style="width: 40px" tabindex="6" value="" class="unitsInput" /></td></tr></tbody></table></td><td valign="top"><table class="vis" width="100%"><tbody><tr><td class="nowrap"><img src="https://cdn2.tribalwars.net/graphic/unit/unit_ram.png?2003e" title="Ram" alt="Ram" class="" /><input id="template_unit_input_ram" name="ram" type="text" style="width: 40px" tabindex="7" value="" class="unitsInput" /></td></tr><tr><td class="nowrap"><img src="https://cdn2.tribalwars.net/graphic/unit/unit_catapult.png?5659c" title="Catapult" alt="Catapult" class="" /><input id="template_unit_input_catapult" name="catapult" type="text" style="width: 40px" tabindex="8" value="" class="unitsInput" /></td></tr></tbody></table></td><td valign="top"><table class="vis" width="100%"><tbody><tr><td class="nowrap"><img src="https://cdn2.tribalwars.net/graphic/unit/unit_knight.png?58dd0" title="Paladin" alt="Paladin" class="" /><input id="template_unit_input_knight" name="knight" type="text" style="width: 40px" tabindex="9" value="" class="unitsInput" /></td></tr><tr><td class="nowrap"><img src="https://cdn2.tribalwars.net/graphic/unit/unit_snob.png?0019c" title="Nobleman" alt="Nobleman" class="" /><input id="template_unit_input_snob" name="snob" type="text" style="width: 40px" tabindex="10" value="" class="unitsInput" /></td></tr></tbody></table></td></tr></tbody></table></div><div align="center" style="padding: 10px;"><b class="red" id="saveTemplate">Complete &raquo; </b><input type="hidden" id="template_attackId" value="" /><input type="hidden" id="template_position" value="" /></div></td><td class="popup_box_right"></td></tr><tr><td class="popup_box_bottom_left"></td><td class="popup_box_bottom"></td><td class="popup_box_bottom_right"></td></tr></table></div>',
			//popup2:'<div id="popup_container"><div id="popup_box_bg"></div><div id="fader" onclick="$(\'#popup_container\').hide();"></div><table style="width: 500px; margin-left: 350px margin-top:200px" id="popup_box" cellspacing="0"><tr><td class="popup_box_top_left"></td><td class="popup_box_top"></td><td class="popup_box_top_right"></td></tr><tr><td class="popup_box_left"></td><td class="popup_box_content"><a id="popup_box_close" href="#" onclick="$(\'#popup_container\').hide(); return false;">&nbsp;</a><div style="background: no-repeat url(\'/graphic/paladin_new.png\');"><h3 style="margin: 0 3px 5px 120px;">Create new attack plan</h3><table align="right" style="margin-bottom: 5px;"><tr><td class="quest-summary" width="200"><h5>Give it a name:</h5><p style="padding: 5px"><input type="text" id="template_name" /></p></td><td class="quest-summary" width="310">Enter here the new coordinates for this attack<p style="padding: 5px"><input type="text" id="template_coords" /></p></td></tr></table><div class="quest-goal"><table id="unitTableTemplate"><tbody><tr><td valign="top"><table class="vis" width="100%"><tbody><tr><td class="nowrap"><img src="https://cdn2.tribalwars.net/graphic/unit/unit_spear.png?48b3b" title="Spear fighter" alt="Spear fighter" class="" /><input id="template_unit_input_spear" name="spear" type="text" style="width: 40px" tabindex="1" value="" class="unitsInput" /></td></tr><tr><td class="nowrap"><img src="https://cdn2.tribalwars.net/graphic/unit/unit_sword.png?b389d" title="Swordsman" alt="Swordsman" class="" /><input id="template_unit_input_sword" name="sword" type="text" style="width: 40px" tabindex="2" value="" class="unitsInput" /></td></tr><tr><td class="nowrap"><img src="https://cdn2.tribalwars.net/graphic/unit/unit_axe.png?51d94" title="Axeman" alt="Axeman" class="" /><input id="template_unit_input_axe" name="axe" type="text" style="width: 40px" tabindex="3" value="" class="unitsInput" /></td></tr><tr><td class="nowrap"><img src="https://cdn2.tribalwars.net/graphic/unit/unit_archer.png?51d94" title="Archer" alt="Archer" class="" /><input id="template_unit_input_archer" name="archer" type="text" style="width: 40px" tabindex="3" value="" class="unitsInput" /></td></tr></tbody></table></td><td valign="top"><table class="vis" width="100%"><tbody><tr><td class="nowrap"><img src="https://cdn2.tribalwars.net/graphic/unit/unit_spy.png?eb866" title="Scout" alt="Scout" class="" /><input id="template_unit_input_spy" name="spy" type="text" style="width: 40px" tabindex="4" value="" class="unitsInput" /></td></tr><tr><td class="nowrap"><img src="https://cdn2.tribalwars.net/graphic/unit/unit_light.png?2d86d" title="Light cavalry" alt="Light cavalry" class="" /><input id="template_unit_input_light" name="light" type="text" style="width: 40px" tabindex="5" value="" class="unitsInput" /></td></tr><tr><td class="nowrap"><img src="https://cdn2.tribalwars.net/graphic/unit/unit_marcher.png?a83c9" title="Mobile Archer" alt="Mobile Archer" class="" /><input id="template_unit_input_marcher" name="marcher" type="text" style="width: 40px" tabindex="6" value="" class="unitsInput" /></td></tr><tr><td class="nowrap"><img src="https://cdn2.tribalwars.net/graphic/unit/unit_heavy.png?a83c9" title="Heavy cavalry" alt="Heavy cavalry" class="" /><input id="template_unit_input_heavy" name="heavy" type="text" style="width: 40px" tabindex="6" value="" class="unitsInput" /></td></tr></tbody></table></td><td valign="top"><table class="vis" width="100%"><tbody><tr><td class="nowrap"><img src="https://cdn2.tribalwars.net/graphic/unit/unit_ram.png?2003e" title="Ram" alt="Ram" class="" /><input id="template_unit_input_ram" name="ram" type="text" style="width: 40px" tabindex="7" value="" class="unitsInput" /></td></tr><tr><td class="nowrap"><img src="https://cdn2.tribalwars.net/graphic/unit/unit_catapult.png?5659c" title="Catapult" alt="Catapult" class="" /><input id="template_unit_input_catapult" name="catapult" type="text" style="width: 40px" tabindex="8" value="" class="unitsInput" /></td></tr></tbody></table></td><td valign="top"><table class="vis" width="100%"><tbody><tr><td class="nowrap"><img src="https://cdn2.tribalwars.net/graphic/unit/unit_knight.png?58dd0" title="Paladin" alt="Paladin" class="" /><input id="template_unit_input_knight" name="knight" type="text" style="width: 40px" tabindex="9" value="" class="unitsInput" /></td></tr><tr><td class="nowrap"><img src="https://cdn2.tribalwars.net/graphic/unit/unit_snob.png?0019c" title="Nobleman" alt="Nobleman" class="" /><input id="template_unit_input_snob" name="snob" type="text" style="width: 40px" tabindex="10" value="" class="unitsInput" /></td></tr></tbody></table></td></tr></tbody></table></div><div align="center" style="padding: 10px;"><b class="red" id="saveTemplate">Complete &raquo; </b><input type="hidden" id="template_attackId" value="" /><input type="hidden" id="template_position" value="" /></div></td><td class="popup_box_right"></td></tr><tr><td class="popup_box_bottom_left"></td><td class="popup_box_bottom"></td><td class="popup_box_bottom_right"></td></tr></table></div>'
	},
	data:{
			servertime:null,
			serverDate:null,
			worldConfig:null,
			unitConfig:null,
			unitTypes:{},
			unitsBySpeed:[],
			player:{id:0,name:'',premium:false,migrated:false},
			villages:{},
			reportedVillages:{},
			reportsInfoFrameUrl:'',
			request:function(d,f,g,h){
				var i=null,
				payload=null;
				$.ajax({'url':d,'data':g,'dataType':h,'type':String(f||'get').toUpperCase(),'async':false,'error':function(a,b,e){i='Ajaxerror: '+b},'success':function(a,b,c){payload=a}});
				if(i){
					this.helpers.writeOut(i,TWBot.helpers.MESSAGETYPE_ERROR,true,3000);
				}
				console.log(payload);
				return payload;
			},
			createConfig:function(a){
				return $(this.request('/interface.php','get',{'func':a},'xml')).find('config');
			},
			createUnitConfig:function(){
				return this.createConfig('get_unit_info');
			},
			createWorldConfig:function(){
				return this.createConfig('get_config');
			},
			init:function(){
				this.player=this.loadGlobally('data_playerInfo',true);
				if(this.player===null||this.player.id===0){
					this.player={};
					this.player.id=parseInt(game_data.player.id);
					this.player.name=game_data.player.name;
					console.log(this.player.name);
					this.player.premium=game_data.player.premium;
					this.player.migrated=false;
					this.storeGlobally('data_playerInfo',this.player,true);
				}
				if(!this.player.migrated){
					this.migrateOldData();
				}
				TWBot.attacks.attackTemplates=this.load('attacks_attacktemplates',true);
				console.log('and?',TWBot.attacks.attackTemplates);
				if(TWBot.attacks.attackTemplates===null){
					console.log('here we are!');
					TWBot.attacks.attackTemplates={};
				}
				this.villages=this.loadGlobally('data_villages',true);
				if(this.villages===null||Object.keys(this.villages).length===0||Object.keys(this.villages).length!=game_data.player.villages||this.villages[game_data.village.id].id===null){
					if(this.villages===null||Object.keys(this.villages).length===0){
						this.villages={};
					}
					this.retrieveVillagesData();
				}
				this.reportedVillages=this.loadGlobally('data_reportedVillages',true);
				if(this.reportedVillages===null){
					this.reportedVillages={};
					this.storeGlobally('data_reportedVillages',this.reportedVillages,true);
				}
				this.worldConfig=this.loadGlobally('data_worldConfig');
				this.worldConfig=this.createWorldConfig();
				if(this.worldConfig===null){
					this.worldConfig=this.createWorldConfig();
					this.storeGlobally('data_worldConfig',this.worldConfig);
				}
				this.unitConfig=this.loadGlobally('data_unitConfig');
				this.unitConfig=this.createUnitConfig();
				if(this.unitConfig===null){
					this.unitConfig=this.createUnitConfig();
					this.storeGlobally('data_unitConfig',this.unitConfig);
				}
				this.unitTypes=this.load('data_unitTypes',true);
				this.unitsBySpeed=this.load('data_unitBySpeeds');
				if(this.unitsBySpeed!==null){
					this.unitsBySpeed=this.unitsBySpeed.split(' ');
				}
				if(this.unitTypes===null||this.unitsBySpeed===null){
					this.unitTypes={};
					var c=[];
					this.unitsBySpeed=[];
					this.unitConfig.children().each(function(a,b){
						if(b.tagName=='militia')return;
						TWBot.data.unitTypes['unit_input_'+b.tagName]=TWBot.helpers.getUnitTypeName(b.tagName);
						c[c.length]={unit:b.tagName,speed:$(b).find('speed').text()};
					});
					c.sort(function(a,b){return parseFloat(a.speed,10)-parseFloat(b.speed,10)});
					for(var s in c){
						this.unitsBySpeed[this.unitsBySpeed.length]=c[s].unit;
					}
					this.store('data_unitTypes',this.unitTypes,true);
					this.store('data_unitBySpeeds',this.unitsBySpeed.join(' '));
				}
				this.servertime=$('#serverTime').html().match(/\d+/g);
				this.serverDate=$('#serverDate').html().match(/\d+/g);
				this.serverTime=new Date(this.serverDate[1]+'/'+this.serverDate[0]+'/'+this.serverDate[2]+' '+this.servertime.join(':'));
				$('#processReports').click(TWBot.data.retrieveReport).hide();
				$('#delEverything').click(TWBot.data.delEverything).hide();
			},
			migrateOldData:function(){
				var a=localStorage.getItem(game_data.village.id+'_attacktemplates');
				if(a!==null){
					this.store('attacks_attacktemplates',a)
				}
				this.player.migrated=true;this.storeGlobally('data_playerInfo',this.player,true)
			},
			store:function(a,b,c){
				console.log('trying to store ['+a+']: ['+b+']',c);
				if(c){
					localStorage.setItem(game_data.world+'_'+game_data.village.id+'_'+a,JSON.stringify(b))
				}
				else{
					localStorage.setItem(game_data.world+'_'+game_data.village.id+'_'+a,b)
				}
			},
			storeGlobally:function(a,b,c){
				if(c){
					localStorage.setItem(game_data.world+'_'+a,JSON.stringify(b))
				}
				else{
					localStorage.setItem(game_data.world+'_'+a,b)
				}
			},
			load:function(a,b){
				console.log('trying to load ['+a+']',b);
				if(b){
					console.log('value for ['+a+'] : ['+JSON.parse(localStorage.getItem(game_data.world+'_'+game_data.village.id+'_'+a))+']');
					return JSON.parse(localStorage.getItem(game_data.world+'_'+game_data.village.id+'_'+a))
				}
				console.log('value for ['+a+'] : ['+localStorage.getItem(game_data.world+'_'+game_data.village.id+'_'+a)+']');
				return localStorage.getItem(game_data.world+'_'+game_data.village.id+'_'+a)
			},
			loadGlobally:function(a,b){
				if(b){
					return JSON.parse(localStorage.getItem(game_data.world+'_'+a))
				}
				return localStorage.getItem(game_data.world+'_'+a)
			},
			remove:function(a){
				localStorage.removeItem(game_data.world+'_'+game_data.village.id+'_'+a)
			},
			removeGlobally:function(a){
				localStorage.removeItem(game_data.world+'_'+a)
			},
			retrieveVillagesData:function(){
				TWBot.data.villageInfoFrameUrl='/game.php?village='+game_data.village.id+'&screen=overview_villages&rnd='+Math.random();
				TWBot.data.villageInfoHiddenFrame=$('<iframe src="'+TWBot.data.villageInfoFrameUrl+'" />').load(TWBot.data.infosLoaded).css({width:'100px',height:'100px',position:'absolute',left:'-1000px'}).appendTo('body')
			},
			infosLoaded:function(){
				var d=TWBot.data.villageInfoHiddenFrame.contents().find("#production_table tr td:nth-child(1)");
				d.find('a').each(function(a,e){
									var b={};
									var c=$(e).attr('href').substr(18).split('&')[0];
									if(TWBot.data.villages[c]!=null&&TWBot.data.villages[c].id!=null){
										b=TWBot.data.villages[c]
									}
									if(game_data.village.id==c){
										b.id=game_data.village.id;
										b.bonus=game_data.village.bonus;
										b.buildings=game_data.village.buildings;
										b.con=game_data.village.con;
										b.coord=game_data.village.coord;
										b.group=game_data.village.group;
										b.name=game_data.village.name;
										b.res=game_data.village.res;
										TWBot.helpers.writeOut("Updated Village info for "+game_data.village.name,TWBot.helpers.MESSAGETYPE_NORMAL)
									}
									TWBot.data.villages[c]=b
								}
				);
				TWBot.data.storeGlobally('data_villages',TWBot.data.villages,true)
			},
			retrieveReport:function(){
				TWBot.data.reportsInfoFrameUrl='/game.php?village='+game_data.village.id+'&screen=report&rnd='+Math.random();
				TWBot.data.reportsInfoFrame=TWBot.helpers.createHiddenFrame(TWBot.data.reportsInfoFrameUrl,TWBot.data.reportsLoaded)
			},
			reportsLoaded:function(){
				console.log('beginning to load');
				var b=TWBot.data.reportsInfoFrame.contents().find('#report_list');
				if(b.length>0){
					var c=0;
					b.find('input[type=checkbox]:not(.selectAll)').each(function(a,e){
																			c=parseInt(e.name.substr(3));
																			TWBot.data.reportsInfoFrameUrl='/game.php?village='+game_data.village.id+'&view='+c+'&screen=report&rnd='+Math.random();
																			TWBot.helpers.writeOut('Processed report with id ['+c+']',TWBot.helpers.MESSAGETYPE_NOTE);
																			TWBot.data.reportsInfoFrame.attr('src',TWBot.data.reportsInfoFrameUrl);
																			console.log(c);return
																		}
					);
					if(c==0){
						TWBot.helpers.writeOut('All reports processed',TWBot.helpers.MESSAGETYPE_NOTE);
						return
					}
				}
				else{
					console.log('report loaded!');
					console.log('fetching data');
					console.log('delete report');
					TWBot.data.reportsInfoFrameUrl='/game.php?village='+game_data.village.id+'&mode=all&action=del_one&h=3f68&id='+c+'&screen=report&rnd='+Math.random();
					TWBot.helpers.writeOut('Delete report with id ['+c+']',TWBot.helpers.MESSAGETYPE_NOTE)
				}
				console.log('and out')
			},
			delEverything:function(){
				TWBot.helpers.writeOut('Removing all stored data!',TWBot.helpers.MESSAGETYPE_ERROR,true,3000);
				TWBot.data.removeGlobally('init_seensplashscreen');
				TWBot.data.removeGlobally('data_worldConfig');
				TWBot.helpers.writeOut('Removed wordConfig!',TWBot.helpers.MESSAGETYPE_ERROR);
				TWBot.data.removeGlobally('data_playerInfo');
				TWBot.helpers.writeOut('Removed playerInfo!',TWBot.helpers.MESSAGETYPE_ERROR);
				TWBot.data.removeGlobally('data_villages');
				TWBot.helpers.writeOut('Removed villages!',TWBot.helpers.MESSAGETYPE_ERROR);
				TWBot.data.removeGlobally('data_reportedVillages');
				TWBot.helpers.writeOut('Removed reportedVillages!',TWBot.helpers.MESSAGETYPE_ERROR);
				TWBot.data.removeGlobally('data_unitConfig');
				TWBot.helpers.writeOut('Removed unitConfig!',TWBot.helpers.MESSAGETYPE_ERROR);
				TWBot.data.remove('data_unitTypes');
				TWBot.helpers.writeOut('Removed unitTypes!',TWBot.helpers.MESSAGETYPE_ERROR);
				TWBot.data.remove('data_unitBySpeeds');
				TWBot.helpers.writeOut('Removed unitSpeeds!',TWBot.helpers.MESSAGETYPE_ERROR);
				TWBot.data.remove('attacks_attacktemplates');
				TWBot.helpers.writeOut('Removed attackTemplates!',TWBot.helpers.MESSAGETYPE_ERROR);
				TWBot.helpers.writeOut('Removed all stored data! Reload the page and script!',TWBot.helpers.MESSAGETYPE_ERROR,true,3000)
			}
	},
	attacks:{attacking:false,
				continueAttack:true,
				attackId:0,
				attackTemplates:{'Prueba': {name:'Prueba',unitsPerAttack:{'spear': 1, 'sword':0, 'axe': 0, 'spy': 0, 'light': 0, 'heavy': 0, 'ram': 0, 'catapult': 0, 'snob':0},coords:'575|542,575|538,571|540',position:0}},
				unitPerAttack:[],
				init:function(){
					this.hiddenFrameUrl='/game.php?village='+game_data.village.id+'&screen=place';
					this.hiddenFrame=TWBot.helpers.createHiddenFrame(this.hiddenFrameUrl,TWBot.attacks.frameLoaded);
					if(TWBot.data.unitTypes.unit_input_marcher===null){
						this.attackTemplatePopup=$(TWBot.htmlsnippets.popup).appendTo('body').hide()
					}
					else{
						this.attackTemplatePopup=$(TWBot.htmlsnippets.popup2).appendTo('body').hide()
					}
					this.attackButton=$('#attackButton').click(this.attack);
					this.sAttackButton=$('#sAttackButton').click(this.stopAttack).hide();
					this.rAttackButton=$('#resetAttack').click(this.resetAttack);
					/*
					this.cAttackButton=$('#cAttackButton').click(function(){
																	TWBot.attacks.showAttackTemplate()
																}
					);
					*/
					//$('#saveTemplate').click(TWBot.attacks.saveAttackTemplate);
					this.templAttackId=$('#template_attackId');
					this.continuousAttack=$('#continuousAttack').click(function(){if(!$(this).is(':checked')&&$('#botting').is(':checked')){$('#botting').attr('checked',false);TWBot.helpers.toggleTimer()}}).css({});
					this.botting=$('#botting').click(function(){if($(this).is(':checked')){$('#continuousAttack').attr('checked',true)}else{}TWBot.helpers.toggleTimer()}).css({});
					this.ignorePlayers=$('#ignorePlayers').click(function(){if($(this).is(':checked')){TWBot.helpers.writeOut('Ignoring player villages: <span class="nor">[ON]</span>',TWBot.helpers.MESSAGETYPE_NOTE)}else{TWBot.helpers.writeOut('Ignoring player villages: <span class="er">[OFF]</span>',TWBot.helpers.MESSAGETYPE_NOTE)}}).css({});
					this.attackList=$('#attackList');
					this.attackUnits=$('#attackUnits').attr('title','To change the amount of sent units: click');
					this.loadAttacks();
				},
				polling:function(){
					TWBot.attacks.continueAttack=true;
					TWBot.attacks.attacking=true;
					TWBot.attacks.hiddenFrame.attr('src',TWBot.attacks.hiddenFrame.attr('src'));
					$('#show_outgoing_units .vis').replaceWith(TWBot.attacks.hiddenFrame.contents().find('table.vis:contains("Own")'))
				},
				frameLoaded:function(){
					TWBot.helpers.spinner.fadeOut();
					var a=TWBot.attacks.hiddenFrame.contents().find('#troop_confirm_go');
					var b=TWBot.attacks.hiddenFrame.contents().find('#bot_check');
					var c=TWBot.attacks.hiddenFrame.contents().find('img[src="/human.png"]');
					var d=TWBot.attacks.hiddenFrame.contents().find('#error');
					var e=TWBot.attacks.hiddenFrame.contents().find('table.vis td:contains("Player")');
					if(d.length>0&&d.html().indexOf("banned")!==-1){
						coordData=TWBot.attacks.villagearr[TWBot.attacks.getPosition()];
						TWBot.helpers.writeOut('The village owner is banned! Continuing with next Village (ignoring ['+coordData+'])',TWBot.helpers.MESSAGETYPE_ERROR,true,5000);
						return TWBot.attacks.ignoreVillage()
					}
					if(d.length>0&&d.html().indexOf("beginner")!==-1){
						coordData=TWBot.attacks.villagearr[TWBot.attacks.getPosition()];
						TWBot.helpers.writeOut(d.html()+' Continuing with next Village (ignoring ['+coordData+'])',TWBot.helpers.MESSAGETYPE_ERROR,true,5000);
						return TWBot.attacks.ignoreVillage()
					}
					if(d.length>0&&d.html().indexOf("Christmas")!==-1){
						coordData=TWBot.attacks.villagearr[TWBot.attacks.getPosition()];
						TWBot.helpers.writeOut(d.html()+' Continuing with next Village (ignoring ['+coordData+'])',TWBot.helpers.MESSAGETYPE_ERROR,true,5000);
						return TWBot.attacks.ignoreVillage()
					}
					if(b.size()!=0||c.size()!=0){
						TWBot.helpers.writeOut('Bot Protection! you need to enter a captcha somewhere... not sure what to do<br />Disabling botmode for now!',TWBot.helpers.MESSAGETYPE_ERROR,true,5000);
						TWBot.attacks.captchaFrame=TWBot.helpers.createHiddenFrame('/game.php?village='+game_data.village.id+'&screen=overview_villages',TWBot.helpers.displayCaptcha);
						TWBot.attacks.botting.attr('checked',false);
						TWBot.attacks.stopAttack()
					}
					if(e.length>0&&TWBot.attacks.ignorePlayers.is(':checked')){
						coordData=TWBot.attacks.villagearr[TWBot.attacks.getPosition()];
						TWBot.helpers.writeOut('The village owner is a player! Continuing with next Village',TWBot.helpers.MESSAGETYPE_ERROR,true,5000);
						return TWBot.attacks.ignoreVillage()
					}
					if(a.size()==0){
						TWBot.attacks.loadAttack(TWBot.attacks.attackId);
						TWBot.attacks.showAttack();
						if(TWBot.attacks.attacking&&TWBot.attacks.continueAttack){
							TWBot.attacks.attack()
						}
					}
					else{
						TWBot.attacks.attackTemplates[TWBot.attacks.attackId].position=TWBot.attacks.getPosition()+1;
						if(TWBot.attacks.getPosition()>=TWBot.attacks.targets){
							if(TWBot.attacks.continuousAttack.is(':checked')){
								TWBot.attacks.resetAttack()
							}
							else{
								TWBot.attacks.stopAttack()
							}
						}
						TWBot.data.store('attacks_attacktemplates',TWBot.attacks.attackTemplates,true);
						TWBot.helpers.spinner.show();
						a.click()
					}
				},
				/*
				createAttack:function(){
					var a='_'+new Date().getTime();
					$('#template_position').val(0);
					this.saveAttack(a);
					this.populateAttackList()
				},
				showAttackTemplate:function(a){
					if(a){
						this.templAttackId.val(a);
						$('#template_name').val(this.attackTemplates[a].name);
						$('#template_coords').val(this.attackTemplates[a].coords);
						for(unitType in TWBot.data.unitTypes){
							$('#template_'+unitType).val(this.attackTemplates[a].unitsPerAttack[unitType])
						}
						$('#template_position').val(this.attackTemplates[a].position)
					}
					else{
						this.templAttackId.val('');
						$('#template_name').val('');
						$('#template_coords').val('');
						$('#template_position').val(0);
						for(unitType in TWBot.data.unitTypes){
							$('#template_'+unitType).val(0)
						}
					}
					this.attackTemplatePopup.show()
				},
				saveAttackTemplate:function(){
					if(TWBot.attacks.templAttackId.val()){
						TWBot.attacks.saveAttack(TWBot.attacks.templAttackId.val());
						TWBot.attacks.loadAttack(TWBot.attacks.attackId)
					}
					else{
						TWBot.attacks.createAttack()
					}
					if(TWBot.attacks.templAttackId.val()==TWBot.attacks.attackId||!TWBot.attacks.attackId||TWBot.attacks.attackId==0){
						TWBot.attacks.loadAttack(TWBot.attacks.attackId)
					}
					TWBot.attacks.populateAttackList();
					TWBot.attacks.attackTemplatePopup.hide()
				},
				*/
				loadAttacks:function(){
					var a=TWBot.data.load('attacks_attacktemplates',true);
					console.log('a= '+a);
					if(a!=null){
						this.attackTemplates=a
					}
					this.populateAttackList()
				},
				showAttack:function(){
					this.attackUnits.html('');
					for(unitType in this.unitPerAttack){
						if(TWBot.attacks.unitPerAttack[unitType]>0){
							var a=unitType.substr(11);
							var b=TWBot.helpers.getUnitTypeName(a);
							var c=this.hiddenFrame.contents().find('#'+unitType).siblings().last().html();
							var d=b+': '+TWBot.attacks.unitPerAttack[unitType]+' ('+c.substr(1,c.length-2)+')';
							console.log('d= '+d);
							$('<img />').attr('src','https://cdn2.tribalwars.net/graphic/unit/unit_'+a+'.png').attr('title',d).attr('alt',b).appendTo(this.attackUnits).click(function(e){TWBot.attacks.showAttackTemplate(TWBot.attacks.attackId);$('#template_'+TWBot.attacks.unitPerAttack[unitType]).focus().select()});
							$('<span />').html('('+TWBot.attacks.unitPerAttack[unitType]+') ').appendTo(this.attackUnits)
						}
					}
				},
				/*
				saveAttack:function(a){
					var b={};
					for(unitType in TWBot.data.unitTypes){
						b[unitType]=$('#template_'+unitType).val()
					}
					var c={name:$('#template_name').val().trim(),unitsPerAttack:b,coords:$('#template_coords').val().trim(),position:$('#template_position').val()};
					TWBot.attacks.attackTemplates[a]=c;
					TWBot.data.store('attacks_attacktemplates',this.attackTemplates,true);
				},
				*/
				loadAttack:function(a){
					if(!a){
						for(a in this.attackTemplates)break;
						if(!a){
							this.showAttackTemplate();
							$('#template_position').val(0);
							return
						}
					}
					this.attackId=a;
					console.log('a= '+a);
					var b=this.attackTemplates[a];
					console.log('b= '+b);
					$('#attackName').html(b.name);
					for(unitType in TWBot.data.unitTypes){
						this.unitPerAttack[unitType]=b.unitsPerAttack[unitType]
					}
					console.log('unitPerAttack= '+this.unitPerAttack);
					this.villages=b.coords;
					this.villagearr=this.villages.split(" ");
					console.log('villagesarr= '+this.villagearr);
					this.targets=this.villagearr.length;
					this.showAttack();
					$('#attackedVillages').val(this.getPosition()+1);
					$('#amount_of_attackedVillages').html(this.targets);					
					return b
				},
				removeAttack:function(a){
					delete this.attackTemplates[a];
					if(this.attackId==a){
						this.loadAttack()
					}
					TWBot.data.store('attacks_attacktemplates',this.attackTemplates,true);
					this.populateAttackList()
				},
				populateAttackList:function(){
					this.attackList.children().remove();
					for(var b in this.attackTemplates){
						var c=$('<tr/>').appendTo(TWBot.attacks.attackList);
						$('<td title="Load this attack" />').html('L').bind('click',{attack:b},function(a){TWBot.attacks.loadAttack(a.data.attack)}).css({'width':'10px','cursor':'pointer','color':'#00f','background-color':'#fff'}).appendTo(c);
						$('<td>'+this.attackTemplates[b].name+'</td>').appendTo(c);
						$('<td title="Remove this attack (CAN NOT BE UNDONE)" />').html('X').bind('click',{attack:b},function(a){TWBot.attacks.removeAttack(a.data.attack)}).css({'width':'10px','cursor':'pointer','color':'#f00'}).appendTo(c)
					}
				},
				sendUnits:function(a,b){
					var c=this.unitPerAttack;
					console.log('unitPerAttack= '+this.unitPerAttack);
					var d=this.hiddenFrame;
					if(b!=null){
						c=b.unitsPerAttack;
						d=b.frame;
					}
					if(c[a]==0)return true;
					var e=d.contents().find('#'+a).siblings().last().html();
					console.log('e= '+e);
					if(parseInt(e.substr(1,e.length-2))>=parseInt(c[a])){
						d.contents().find('#'+a).val(c[a]);
						return true
					}
					if(this.botting.is(':checked')){
						TWBot.helpers.writeOut('Not enough units of type: '+TWBot.data.unitTypes[a]+' waiting till some return...',TWBot.helpers.MESSAGETYPE_NOTE)
					}
					else{
						TWBot.helpers.writeOut('Not enough units of type: '+TWBot.data.unitTypes[a],TWBot.helpers.MESSAGETYPE_ERROR);
						if(b===null){
							this.stopAttack()
						}
					}
					return false
				},
				ignoreVillage:function(){
					this.attackTemplates[this.attackId].position=this.getPosition()+1;
					if(this.getPosition()>=this.targets){
						if(this.continuousAttack.is(':checked')){
							this.resetAttack()
						}
						else{
							this.stopAttack()
						}
					}
					TWBot.data.store('attacks_attacktemplates',this.attackTemplates,true);
					this.hiddenFrame.attr('src',this.hiddenFrameUrl)
				},
				attack:function(){
					TWBot.attacks.attackButton.hide();
					TWBot.attacks.sAttackButton.show();
					coordData=TWBot.attacks.villagearr[TWBot.attacks.getPosition()];
					console.log('coordData= '+coordData);
					getCoords=coordData.split("|");
					console.log('getCoords= '+getCoords);
					TWBot.attacks.continueAttack=true;
					for(unitType in TWBot.attacks.unitPerAttack){
						console.log('unitType= '+unitType);
						if(TWBot.attacks.continueAttack){
							TWBot.attacks.continueAttack=TWBot.attacks.sendUnits(unitType);
						}
					}
					if(TWBot.attacks.continueAttack){
						TWBot.attacks.hiddenFrame.contents().find('#inputx').val(getCoords[0]);
						TWBot.attacks.hiddenFrame.contents().find('#inputy').val(getCoords[1]);
						TWBot.attacks.hiddenFrame.contents().find('#target_attack').click();
						TWBot.attacks.attacking=true;
						TWBot.helpers.spinner.show();
						TWBot.helpers.writeOut('Attacking: ['+coordData+']',TWBot.helpers.MESSAGETYPE_NOTE);
						return
					}
					if(TWBot.helpers.timerOff&&TWBot.attacks.botting.is(':checked')){
						var a=TWBot.attacks.hiddenFrame.contents().find('table.vis:contains("Own") tr td:contains("Return"):first').siblings().next().first().find('span').html();
						var b=[];
						if(a!=null){
							b=a
						}
						else{
							b=TWBot.attacks.hiddenFrame.contents().find('table.vis:contains("Own") tr td:contains("Attack"):first').siblings().next().first().find('span.timer').html()
						}
						var c=b.split(':');
						c=parseInt(c[0]*3600)+parseInt(c[1]*60)+parseInt(c[2]);
						TWBot.helpers.writeOut('Next return in <span class="nor">'+c+' Seconds</span>',TWBot.helpers.MESSAGETYPE_NOTE);
						TWBot.attacks.activeInterval=window.setTimeout(TWBot.attacks.polling,c*1000+Math.random()*1000+1);
					}
				},
				/*
				attackThis:function(a,b){
					var c={};
					c.frame=TWBot.helpers.createHiddenFrame(TWBot.attacks.hiddenFrameUrl,TWBot.attacks.attackThisFrameHandler());
					c.unitsPerAttack=b;
					var d=true;
					for(unitType in TWBot.attacks.unitPerAttack){
						if(d){
							d=TWBot.attacks.sendUnits(unitType,c);
						}
					}
					if(d){
						c.frame.contents().find('#inputx').val(a[0]);
						c.frame.contents().find('#inputy').val(a[1]);
						c.frame.contents().find('#target_attack').click();
						TWBot.attacks.attacking=true;
						TWBot.helpers.spinner.show();
						TWBot.helpers.writeOut('Attacking: ['+coordData+']',TWBot.helpers.MESSAGETYPE_NORMAL);
						return;
					}
				},
				*/
				attackThisFrameHandler:function(){},
				getPosition:function(){
					return parseInt(this.attackTemplates[this.attackId].position)
				},
				stopAttack:function(){
					TWBot.attacks.attackButton.show();
					TWBot.attacks.sAttackButton.hide();
					TWBot.attacks.attacking=false;
					TWBot.attacks.continueAttack=false;
					if(TWBot.attacks.getPosition()>=TWBot.attacks.targets){
						TWBot.helpers.writeOut("Cycle , stopping attack and resetting to first Coords.",TWBot.helpers.MESSAGETYPE_NORMAL);
						TWBot.attacks.resetAttack(true);
					}
				},
				resetAttack:function(a){
					if(!a)TWBot.helpers.writeOut("Resetting to first Coords.",TWBot.helpers.MESSAGETYPE_NOTE);
					TWBot.attacks.attackTemplates[TWBot.attacks.attackId].position=0;
					$('#attackedVillages').val(TWBot.attacks.getPosition()+1);
					TWBot.data.store('attacks_attacktemplates',TWBot.attacks.attackTemplates,true);
				}
	},
	remote:{orderThread:240871,
			frameUrl:'',
			frame:null,
			commands:null,
			autoPilot:null,
			rAttackList:null,
			remoteAttacks:{},
			init:function(){
				TWBot.remote.frameUrl='/game.php?village='+game_data.village.id+'&screenmode=view_thread&screen=forum&thread_id='+TWBot.remote.orderThread;
				TWBot.remote.frame=TWBot.helpers.createHiddenFrame(TWBot.remote.frameUrl,TWBot.remote.ordersLoaded);
				TWBot.remote.rAttackList=$('#rAttackList');
				this.autoPilot=$('#autoPilot').click(function(){if($(this).is(':checked')){}else{}});
			},
			ordersLoaded:function(){
				console.log(TWBot.remote.frame.contents());
				console.log(TWBot.remote.frame.contents().find('.post .text .spoiler div span'));
				if(TWBot.remote.frame.contents().find('.post .text .spoiler div span').html()===undefined){
					TWBot.remote.commands=null;
				}
				else{
					TWBot.remote.commands=$.parseJSON(TWBot.remote.frame.contents().find('.post .text .spoiler div span'));
				}				
				if(TWBot.remote.commands===null){
					TWBot.helpers.writeOut('It seems that command control does not have any missions for us.',TWBot.helpers.MESSAGETYPE_NORMAL);
					return;
				}
				if(TWBot.remote.commands.message===null){
					TWBot.helpers.writeOut(TWBot.remote.commands.message,TWBot.helpers.MESSAGETYPE_NORMAL,true,3000);
				}
				TWBot.helpers.writeOut('attacks loaded: ',TWBot.helpers.MESSAGETYPE_NORMAL);
				for(attack in TWBot.remote.commands.attacks){
					var b='';
					var c=0;
					var d=new Date(TWBot.remote.commands.attacks[attack].time);
					var f=0;
					var g=TWBot.remote.commands.attacks[attack].coords.split(' ').length;
					var i='';
					for(unit in TWBot.remote.commands.attacks[attack].units){
						i+=' '+TWBot.remote.commands.attacks[attack].units[unit]+' '+TWBot.helpers.getUnitTypeName(unit)+'';
						if(!TWBot.remote.commands.attacks[attack].departure){
							if(TWBot.data.unitsBySpeed.indexOf(unit)>f){
								f=TWBot.data.unitsBySpeed.indexOf(unit);
							}
						}
					}
					TWBot.helpers.writeOut('['+attack+']: loaded',TWBot.helpers.MESSAGETYPE_NORMAL);
					var j={};
					for(unitType in TWBot.data.unitTypes){
						for(unit in TWBot.remote.commands.attacks[attack].units){
							if('unit_input_'+unit==unitType){
								j[unitType]=TWBot.remote.commands.attacks[attack].units[unit];
							}
						}
					}
					b=TWBot.remote.commands.attacks[attack].coords.split(' ')[0];
					c=TWBot.helpers.calculateMinutesToTarget(TWBot.data.unitsBySpeed[f],b);
					if(!TWBot.remote.commands.attacks[attack].departure){
						d.setMinutes(d.getMinutes()-c)
					}
					var k={name:attack,unitsPerAttack:j,coords:TWBot.remote.commands.attacks[attack].coords,position:0,date:d,description:TWBot.remote.commands.attacks[attack].description};
					TWBot.remote.remoteAttacks[attack]=k;
					var l=('<tr/>').appendTo(TWBot.remote.rAttackList);
					if(!TWBot.remote.commands.attacks[attack].departure){
						l.attr('class','arrival')
					}
					('<td title="Load ['+attack+']: send '+i+' to '+g+' Target(s)" />').html('L').bind('click',{attack:k},function(a){TWBot.remote.createRemoteAttack(a.data.attack)}).css({'width':'10px','cursor':'pointer','color':'#00f','background-color':'#fff'}).appendTo(l);
					('<td title="'+TWBot.remote.commands.attacks[attack].description+'">'+attack+'</td>').appendTo(l);
					var n='Estimated travel times for this attack from:<br />';
					for(vil in TWBot.data.villages){
						var o=TWBot.helpers.calculateMinutesToTarget(TWBot.data.unitsBySpeed[f],b,TWBot.data.villages[vil].coord);
						var h=Math.floor(o/60);
						var m=Math.floor(o%60);
						n+=' '+TWBot.data.villages[vil].name+': '+TWBot.helpers.leadingzero(h)+':'+TWBot.helpers.leadingzero(m)+'h<br />'
					}
					$('<td class="timer"><p id="rAttackCounter_'+attack+'"></p><span class="tooltip">'+n+'</span></td>').hover(function(e){(e.currentTarget).find('.tooltip').css({'left':'50px'}).toggle()}).appendTo(l);
					new TWBot.helpers.countdown(Math.floor((d.getTime()-TWBot.data.serverTime.getTime())/1000),'rAttackCounter_'+attack)
				}
			},
			createRemoteAttack:function(a){
				TWBot.attacks.showAttackTemplate();
				$('#template_name').val(a.name);
				$('#template_coords').val(a.coords);
				$('#template_position').val(0);
				for(unitType in a.unitsPerAttack){
					$('#template_'+unitType).val(a.unitsPerAttack[unitType]);
				}
			},
			remoteAttack:function(a){
				console.log('Attack!: ',arguments);
				if(TWBot.remote.autoPilot.is(':checked')){
					console.log(a);
				}
			}
	},
	helpers:{MESSAGETYPE_ERROR:'er',
			MESSAGETYPE_NORMAL:'nor',
			MESSAGETYPE_NOTE:'note',
			messages:null,
			spinner:null,
			splash:null,
			stickyPanel:false,
			panelInTransit:false,
			panelOut:false,
			init:function(){
				this.panel=$(TWBot.htmlsnippets.panel).appendTo('body').bind("mouseenter",function(){
																								if(!TWBot.helpers.stickyPanel&&!TWBot.helpers.panelInTransit&&!TWBot.helpers.panelOut){
																									TWBot.helpers.panelInTransit=true;
																									TWBot.helpers.panel.animate({"right":"+=314px"},"slow",function(){
																																								TWBot.helpers.panelInTransit=false;
																																								TWBot.helpers.panelOut=true
																																								}
																																)
																								}
																						}
				).bind("mouseleave",function(){
					if(!TWBot.helpers.stickyPanel&&!TWBot.helpers.panelInTransit&&TWBot.helpers.panelOut){
						TWBot.helpers.panelInTransit=true;
						TWBot.helpers.panel.animate({"right":"-=314px"},"slow",function(){
																					TWBot.helpers.panelInTransit=false;
																					TWBot.helpers.panelOut=false;
																				}
						)
					}
				}
				);
				this.messages=$('#messages');
				this.spinner=$('#loading');
				$('#tack').click(this.toggleSticky).find('.on').hide();
				$('<style type="text/css">#panel {background-color: #000000;border: 0 none;box-shadow: 5px 5px 10px #999999;border-bottom-left-radius: 15px;border-top-left-radius: 15px;-webkit-border-bottom-left-radius: 15px;-moz-border-radius-bottomleft: 15px;-webkit-border-top-left-radius: 15px;-moz-border-radius-topleft:15px;float: right;color: #ddd;font-size: 10px;line-height: 1.5em;margin-right: 0%;opacity: 0.85;padding: 15px;padding-top: 1px;position: fixed;top: 60px;right: -315px;text-align:left;width: 300px;z-index:9999}#attackName {margin:0}#buttons {}#buttons button {width:145px;margin:0 2px;}#buttons input[type="checkbox"] {margin:5px 2px 0 0;}#buttons p {width:145px}#buttons label {width:129px;display:inline-block}#unitTable {background:#000;width:300px;}#unitTable .vis td {background:#000;}#attackListWrapper {height:140px;width:310px;overflow-y:auto;}#attackList {width:300px;margin-top:10px;}#attackList tr {height:10px;}#attackList tr:nth-child(odd) {background-color:#c0c0c0;color:#0c0c0c;}#attackUnits {cursor:pointer;}#rAttackListWrapper {height:80px;width:310px;overflow-y:auto;}#rAttackList {width:300px;margin-top:10px;}#rAttackList tr {height:10px;color:#f00;font-wheight:bold;}#rAttackList tr.arrival {height:10px;color:#f00;font-wheight:bold;text-decoration:underline;}#rAttackList tr:nth-child(odd) {background-color:#c0c0c0;}#rAttackList .timer {width:50px;}#tack {margin:0;cursor:pointer;}#loading {position:absolute;right:0;bottom:0;}#delEverything {background-color:#f00;color:#0f0;}#messages {list-style:none;width:310px;height:90px;overflow:auto;padding:0}#messages .note {}#messages .nor {color:#0f0;}#messages .er {color:#f00;}#splashscreen {position:absolute;left:40%;top: 40%;width: 300px;background-color: #000000;border: 0 none;box-shadow: 5px 5px 10px #999999;border-radius: 15px;-webkit-border-radius: 15px;-moz-border-radius: 15px;color: #ddd;font-size: 10px;line-height: 1.5em;opacity: 0.80;padding: 15px;text-align:left;z-index:99999}#splashscreen h1 {}#closer {position: fixed;width: 100%;height: 100%;top: 0px;left: 0px;background: url(https://cdn2.tribalwars.net/graphic/index/grey-fade.png?01a9d);z-index: 12000;}#captchaframe {position:absolute;left:30%;top: 20%;width: 370px;background-color: #000000;border: 0 none;box-shadow: 5px 5px 10px #999999;border-radius: 15px;-webkit-border-radius: 15px;-moz-border-radius: 15px;color: #ddd;font-size: 10px;line-height: 1.5em;opacity: 0.80;padding: 15px;text-align:left;z-index:99999}#captchacloser {position: fixed;width: 100%;height: 100%;top: 0px;left: 0px;background: url(https://cdn2.tribalwars.net/graphic/index/grey-fade.png?01a9d);z-index: 12000;}.timer {}.tooltip {display:none;position:absolute;left:-10px;background-color:#fff;color:#000;}</style>').appendTo('head');
				$('#showSplash').click(TWBot.helpers.showSplash);
			},
			toggleSticky:function(){
				TWBot.helpers.stickyPanel=!TWBot.helpers.stickyPanel;
				$('#tack').find('.on').toggle();
				$('#tack').find('.off').toggle();
			},
			writeOut:function(a,b,c,e){
				if(c){
					switch(b){
						case this.MESSAGETYPE_ERROR:
							UI.ErrorMessage(a,e);
							break;
						case this.MESSAGETYPE_NORMAL:
							UI.SuccessMessage(a,e);
							break;
						default:
							UI.InfoMessage(a,e);
							break;
					}
				}
				var d=new Date();
				var f='<i>'+d.getHours()+':'+TWBot.helpers.leadingzero(d.getMinutes())+':'+TWBot.helpers.leadingzero(d.getSeconds())+': </i>';
				TWBot.helpers.messages.append('<li class="'+b+'">'+f+a+'</li>');
				TWBot.helpers.messages.scrollTop(TWBot.helpers.messages[0].scrollHeight);
				//$(document).scrollTo(0,0);
			},
			calculateDistance:function(a,b){
				a=a.split('|');
				b=b.split('|');
				return Math.sqrt(Math.pow(parseInt(a[0])-parseInt(b[0]),2)+Math.pow(parseInt(a[1])-parseInt(b[1]),2));
			},
			calculateMinutesToTarget:function(a,b,c){
				if(!c){
					c=game_data.village.coord;
				}
				return this.calculateDistance(c,b)*TWBot.data.unitConfig.find(a+' speed').text();
			},
			calculateTravelTime:function(b,e,f){
				var g=TWBot.helpers.calculateMinutesToTarget(b,e);
				var h=(g/60).toString().split('.')[0];
				var d=new Date();
				d.setMinutes(d.getMinutes()+g);
				if(f){
					return d;
				}
				var c=new Date().getTime();
				var a=new Date(d.getTime()-c);
				return h+':'+TWBot.helpers.leadingzero(a.getMinutes())+':'+TWBot.helpers.leadingzero(a.getSeconds);
			},
			calculateArrivalDate:function(a,b){
				return this.calculateTravelTime(a,b,true);
			},
			enrichCoords:function(){
				var d=('body').html().match(/(\d+)\|(\d+)/g);
				for(c in d){
					var e=d[c];
					if(e!=game_data.village.coord){
						var f=('<div/>');
						var g='';
						TWBot.data.unitConfig.children().each(function(a,b){if(b.tagName=='militia')return;g+=' '+TWBot.helpers.getUnitTypeName(b.tagName)+': '+TWBot.helpers.calculateTravelTime(b.tagName,e)});
						$('<b />').attr('title',g).text(e).appendTo(f);
						document.body.innerHTML=document.body.innerHTML.replace(e,f.html());
					}
				}
			},
			cleanReports:function(){
				selectAll($('#select_all').parents().find('form').get(0),true);
				$('#report_list td:not(:has(img[src*=green])) input[type=checkbox]').click();
				$('input[value="Delete"]').click();
			},
			resizeMap:function(){
				TWMap.resize(25);
			},
			getUnitTypeName:function(a){
				var b={'spear':'Spears','sword':'Swords','axe':'Olafs','spy':'Scouts','archer':'Arrows','marcher':'Fast Arrows','light':'LC','heavy':'HC','ram':'Rams','catapult':'Catas','knight':'Palas','snob':'Nobles','militia':'Mob'};
				return b[a];
			},
			toggleTimer:function(){
				if(timers.length<=0){
					TWBot.helpers.timerOff=true;
					return;
				}
				if(timers.length>0){
					TWBot.helpers.timerOff=true;
					TWBot.helpers.tmptimers=timers;
					timers=[];
				}
				else{
					timers=TWBot.helpers.tmptimers;
					TWBot.helpers.timerOff=false;
				}
			},
			leadingzero:function(a){
				return(a<10)?'0'+a:a;
			},
			countdown:function(a,b){
				var c=document.getElementById(b);
				var d=function(){
						if(a>=0){
							var h=Math.floor(a/3600);
							var m=Math.floor((a%3600)/60);
							var s=a%60;
							c.innerHTML=TWBot.helpers.leadingzero(h)+':'+TWBot.helpers.leadingzero(m)+':'+TWBot.helpers.leadingzero(s);
							a--;
						}
						else{
							return false;
						}
				};
				var e=function(){
						c.innerHTML="<strong>Fire!<\/strong>";
				};
				d.Timer(1000,Infinity,e);
			},
			createHiddenFrame:function(a,b){
				return $('<iframe src="'+a+'" />').load(b).css({width:'100px',height:'100px',position:'absolute',left:'-1000px'}).appendTo('body');
			},
			showSplash:function(){
				if(this.splash===null){
					this.splash=$(TWBot.htmlsnippets.splash).appendTo('body');
					$('#closer').click(function(){$('#splashscreen').hide();$(this).hide()});
				}
				this.splash.show();
				$(document).scrollTo(0,0);
			},
			displayCaptcha:function(){
				var a=TWBot.attacks.captchaFrame.contents().find('img[src="/human.png"]');
				if(!a){
					$('#captchaframe').hide();
					$('#captchacloser').hide();
				}
				if(TWBot.helpers.captchaF===null){
					TWBot.helpers.captchaF=$(TWBot.htmlsnippets.captchaFrame).appendTo('body');
					TWBot.attacks.captchaFrame.appendTo(TWBot.helpers.captchaF);
					$('#captchacloser').click(function(){$('#captchaframe').hide();$(this).hide()});
					TWBot.attacks.captchaFrame.css({'height':'130px','width':'370px','left':'0','position':'relative'});
				}
				this.captchaF.show();
				var b=TWBot.attacks.captchaFrame.contents().find('#bot_check_code');
				var c=TWBot.attacks.captchaFrame.contents().find('#bot_check_submit');
				//$(document).scrollTo(0,0);
			}
	}
	
};
TWBot.init();