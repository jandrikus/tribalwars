var TWBot={
	init:function(){
		this.helpers.init();
		this.data.init();
		this.attacks.init();
	},
	htmlsnippets:{
			captchaFrame:'<div id="captchacloser"></div><div id="captchaframe"></div>',
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
					TWBot.helpers.writeOut(i,TWBot.helpers.MESSAGETYPE_ERROR,true,3000);
				}
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
				}
				this.worldConfig=this.loadGlobally('data_worldConfig');
				this.worldConfig=this.createWorldConfig();
				if(this.worldConfig===null){
					this.worldConfig=this.createWorldConfig();
				}
				this.unitConfig=this.loadGlobally('data_unitConfig');
				this.unitConfig=this.createUnitConfig();
				if(this.unitConfig===null){
					this.unitConfig=this.createUnitConfig();
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
				}
				this.servertime=$('#serverTime').html().match(/\d+/g);
				this.serverDate=$('#serverDate').html().match(/\d+/g);
				this.serverTime=new Date(this.serverDate[1]+'/'+this.serverDate[0]+'/'+this.serverDate[2]+' '+this.servertime.join(':'));
				$('#delEverything').click(TWBot.data.delEverything).hide();
			},
			load:function(a,b){
				TWBot.helpers.writeOut('trying to load ['+a+']',b);
				if(b){
					console.log('value for ['+a+'] : ['+JSON.parse(localStorage.getItem(game_data.world+'_'+game_data.village.id+'_'+a))+']');
					return JSON.parse(localStorage.getItem(game_data.world+'_'+game_data.village.id+'_'+a))
				}
				return localStorage.getItem(game_data.world+'_'+game_data.village.id+'_'+a)
			},
			loadGlobally:function(a,b){
				if(b){
					return JSON.parse(localStorage.getItem(game_data.world+'_'+a))
				}
				return localStorage.getItem(game_data.world+'_'+a)
			},
			removeGlobally:function(a){
				localStorage.removeItem(game_data.world+'_'+a)
			},
			retrieveVillagesData:function(){
				TWBot.data.villageInfoFrameUrl='/game.php?village='+game_data.village.id+'&screen=overview_villages&rnd='+Math.random();
				TWBot.data.villageInfoHiddenFrame=$('<iframe src="'+TWBot.data.villageInfoFrameUrl+'" />').load(TWBot.data.infosLoaded).css({width:'100px',height:'100px',position:'absolute',left:'-1000px'}).appendTo('body')
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
				TWBot.helpers.writeOut('Removed all stored data! Reload the page and script!',TWBot.helpers.MESSAGETYPE_ERROR,true,3000)
			}
	},
	attacks:{attacking:false,
				continueAttack:true,
				attackId:0,
				attackTemplates:{'Prueba': {name:'Prueba2',unitsPerAttack:{'unit_input_spear': 0, 'unit_input_sword':0, 'unit_input_axe': 0, 'unit_input_spy': 1, 'unit_input_light': 0, 'unit_input_heavy': 0, 'unit_input_ram': 0, 'unit_input_catapult': 0, 'unit_input_snob':0, 'unit_input_knight':0},coords:'575|542,575|538,571|540',position:0}},
				unitPerAttack:[],
				init:function(){
					this.hiddenFrameUrl='/game.php?village='+game_data.village.id+'&screen=place';
					this.hiddenFrame=TWBot.helpers.createHiddenFrame(this.hiddenFrameUrl,TWBot.attacks.frameLoaded);			
					TWBot.attacks.loadAttack('Prueba');
				},
				frameLoaded:function(){
					var a=TWBot.attacks.hiddenFrame.contents().find('#troop_confirm_go');
					var b=TWBot.attacks.hiddenFrame.contents().find('#bot_check');
					var c=TWBot.attacks.hiddenFrame.contents().find('img[src="/human.png"]');
					var d=TWBot.attacks.hiddenFrame.contents().find('#error');
					var e=TWBot.attacks.hiddenFrame.contents().find('table.vis td:contains("Player")');
					if(b.size()!==0||c.size()!==0){
						TWBot.helpers.writeOut('Bot Protection! you need to enter a captcha somewhere... not sure what to do<br />Disabling botmode for now!',TWBot.helpers.MESSAGETYPE_ERROR,true,5000);
						TWBot.attacks.captchaFrame=TWBot.helpers.createHiddenFrame('/game.php?village='+game_data.village.id+'&screen=overview_villages',TWBot.helpers.displayCaptcha);
						TWBot.attacks.botting.attr('checked',false);
						TWBot.attacks.stopAttack()
					}
					if(a.size()===0){
						TWBot.attacks.loadAttack(TWBot.attacks.attackId);
						if(TWBot.attacks.attacking&&TWBot.attacks.continueAttack){
							TWBot.attacks.attack()
						}
					}
					else{
						TWBot.attacks.attackTemplates[TWBot.attacks.attackId].position=TWBot.attacks.getPosition()+1;
						if(TWBot.attacks.getPosition()>=TWBot.attacks.targets){
							TWBot.attacks.stopAttack()
						}
						a.click()
					}
				},
				loadAttack:function(a){
					this.attackId=a;
					var b=this.attackTemplates[a];
					for(unitType in TWBot.data.unitTypes){
						this.unitPerAttack[unitType]=b.unitsPerAttack[unitType]
					}
					this.villages=b.coords;
					this.villagearr=this.villages.split(" ");
					this.targets=this.villagearr.length;
					return b
				},
				sendUnits:function(a,b){
					var c=TWBot.attacks.unitPerAttack;
					var d=TWBot.attacks.hiddenFrame;
					console.log(a);
					console.log(c[a]);
					console.log(c);
					console.log(d);
					if(c[a]==0)return true;
					var e=d.contents().find('#'+a).siblings().last().html();
					console.log(e);
					if(parseInt(e.substr(1,e.length-2))>=parseInt(c[a])){
						d.contents().find('#'+a).val(c[a]);
						return true;
					}
					TWBot.helpers.writeOut('Not enough units of type: '+TWBot.data.unitTypes[a],TWBot.helpers.MESSAGETYPE_ERROR);
					if(b===null){
						this.stopAttack();
					}
					return false
				},
				ignoreVillage:function(){
					this.attackTemplates[this.attackId].position=this.getPosition()+1;
					if(this.getPosition()>=this.targets){
						this.stopAttack();
					}
					this.hiddenFrame.attr('src',this.hiddenFrameUrl)
				},
				attack:function(){
					coordData=TWBot.attacks.villagearr[TWBot.attacks.getPosition()];
					getCoords=coordData.split("|");
					TWBot.attacks.continueAttack=true;
					for(unitType in TWBot.attacks.unitPerAttack){
						if(TWBot.attacks.continueAttack){
							TWBot.attacks.continueAttack=TWBot.attacks.sendUnits(unitType)
						}
					}
					if(TWBot.attacks.continueAttack){
						TWBot.attacks.hiddenFrame.contents().find('#inputx').val(getCoords[0]);
						TWBot.attacks.hiddenFrame.contents().find('#inputy').val(getCoords[1]);
						TWBot.attacks.hiddenFrame.contents().find('#target_attack').click();
						TWBot.attacks.attacking=true;
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
				attackThisFrameHandler:function(){},
				getPosition:function(){
					return parseInt(this.attackTemplates[this.attackId].position)
				},
				stopAttack:function(){
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
				}
	},
	helpers:{MESSAGETYPE_ERROR:'er',
			MESSAGETYPE_NORMAL:'nor',
			MESSAGETYPE_NOTE:'note',
			messages:null,
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
				var f=d.getHours()+':'+TWBot.helpers.leadingzero(d.getMinutes())+':'+TWBot.helpers.leadingzero(d.getSeconds())+':';
				TWBot.helpers.messages = f+a;
				console.log(TWBot.helpers.messages);
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