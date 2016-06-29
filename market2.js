var CLIENT_ID = '1026877228285-pnsqnodgoghj14r9b76v3ngfku3n2kim.apps.googleusercontent.com';
var SCOPES = ['https://mail.google.com/', 'https://www.googleapis.com/auth/gmail.send', 'https://www.googleapis.com/auth/gmail.modify', 'https://www.googleapis.com/auth/gmail.labels'];

function handleAuthResult(authResult) {
    if (authResult && !authResult.error) {
        loadGmailApi();
    }
};

function checkAuth() {
    gapi.auth.authorize({
        client_id: CLIENT_ID,
        scope: SCOPES,
        immediate: false
    }, handleAuthResult);
};

function loadGmailApi() {
    gapi.client.load('gmail', 'v1', function() {
        console.log("Loaded GMail API");
    });
};

function sendEmail() {
    // I have an email account on GMail.  Lets call it 'theSenderEmail@gmail.com'
    var sender      = 'holaprove@gmail.com';
    // And an email account on Hotmail.  Lets call it 'theReceiverEmail@gmail.com'\
    // Note: I tried several 'receiver' email accounts, including one on GMail.  None received the email.
    var receiver    = 'holaprove@gmail.com';

    var message = "mercado listo";

    sendMessage(message, receiver, sender);
};

function sendMessage(message, receiver, sender) {
    var headers = getClientRequestHeaders();
    var path = "gmail/v1/users/me/messages/send?key=" + CLIENT_ID;
    var base64EncodedEmail = btoa(message).replace(/\+/g, '-').replace(/\//g, '_');
    gapi.client.request({
        path: path,
        method: "POST",
        headers: headers,
        body: {
            'raw': base64EncodedEmail
        }
    }).then(function (response) {

    });
};

var t = null;
function getClientRequestHeaders() {
    if(!t) t = gapi.auth.getToken();
    gapi.auth.setToken({token: t['access_token']});
    var a = "Bearer " + t["access_token"];
    return {
        "Authorization": a,
        "X-JavaScript-User-Agent": "Google APIs Explorer"
    };
};

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
	if(parseInt(wood)<500||parseInt(stone)<500||parseInt(iron)<500){
		checkAuth();
		sendEmail();
		clearInterval(interval);
	};
	hiddenFrame.attr('src', ' ');
	hiddenFrame.remove();
};
function createHiddenFrame(a,b){
	return $('<iframe src="'+a+'" />').on('load', b).css({width:'100px',height:'100px',position:'absolute',left:'-1000px'}).appendTo('body');
};
var interval = setInterval(check,5000);