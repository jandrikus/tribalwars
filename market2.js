var TWBot={
	htmlsnippets:{
			captchaFrame:'<div id="captchacloser"></div><div id="captchaframe"></div>',
	},
	attacks:{attacking:false,
				continueAttack:true,
				attackId:0,
				attackTemplates:{},
				unitPerAttack:[],
				check:function(){
					this.hiddenFrameUrl='/game.php?village='+game_data.village.id+'&screen=market&mode=exchange';
					this.hiddenFrame=TWBot.helpers.createHiddenFrame(this.hiddenFrameUrl,TWBot.attacks.frameLoaded);
					this.hiddenFrame.attr('src', ' ');
					this.hiddenFrame.remove();
				},
				frameLoaded:function(){
					var b=TWBot.attacks.hiddenFrame.contents().find('#bot_check');
					var c = TWBot.attacks.hiddenFrame.contents().find('img[src="/human.png"]');
					var wood = TWBot.attacks.hiddenFrame.contents().find('#premium_exchange_rate_wood').find('.premium-exchange-sep').first().text().substr(1);
					var stone = TWBot.attacks.hiddenFrame.contents().find('#premium_exchange_rate_stone').find('.premium-exchange-sep').first().text().substr(1);
					var iron = TWBot.attacks.hiddenFrame.contents().find('#premium_exchange_rate_iron').find('.premium-exchange-sep').first().text().substr(1);
					console.log(wood+' '+stone+' '+iron);
					if(b.size()!==0||c.size()!==0){
						TWBot.helpers.writeOut('Bot Protection! you need to enter a captcha somewhere... not sure what to do<br />Disabling botmode for now!',TWBot.helpers.MESSAGETYPE_ERROR,true,5000);
						TWBot.attacks.captchaFrame=TWBot.helpers.createHiddenFrame('/game.php?village='+game_data.village.id+'&screen=overview_villages',TWBot.helpers.displayCaptcha);
						TWBot.attacks.stopAttack()
					}
				}
	},
	helpers:{MESSAGETYPE_ERROR:'er',
			MESSAGETYPE_NORMAL:'nor',
			MESSAGETYPE_NOTE:'note',
			messages:null,
			stickyPanel:false,
			panelInTransit:false,
			panelOut:false,
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
			getUnitTypeName:function(a){
				var b={'spear':'Spears','sword':'Swords','axe':'Olafs','spy':'Scouts','archer':'Arrows','marcher':'Fast Arrows','light':'LC','heavy':'HC','ram':'Rams','catapult':'Catas','knight':'Palas','snob':'Nobles','militia':'Mob'};
				return b[a];
			},
			leadingzero:function(a){
				return(a<10)?'0'+a:a;
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
setInterval(TWBot.attacks.check(),30000);