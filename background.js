/*
 * @name	内涵段子.更新提醒
 * @author	Holger
 * @blog	http://ursb.org/
 * @github	https://github.com/h01/neihanduanzi
 * @update	2014/10/29
 */

var url = "http://www.neihanshequ.com";

function alert(title, body, link){
	if (localStorage['last'] == undefined || localStorage['last'] != body) {
		var n = new Notification(title, {body: body, icon: "icon.png"});n.onclick = function(){window.open(url + link, "_blank");n.close()};
		var a = document.createElement("audio");a.src = "alert.mp3";a.play();a.remove();
		localStorage['last'] = body;
	}else{
		console.log("[!] 木有更新:" + localStorage['last']);
	}
}
function start(){
	try{
		var a = new XMLHttpRequest();
		a.onreadystatechange = function(){
			if (a.readyState == 4 && a.status == 200) {
				var html = a.responseText;
				var body = html.match(/<div class="pin-context">([\s\S]*?)<\/div>/)[1].match(/<p>([\s\S]*?)<\/p>/)[1].replace(/<[^>]+>/g, "");
				var link = html.match(/class="image share_url" href="([\s\S]*?)"/)[1];
				var title= html.match(/<span rel="nofollow" class="name">([\s\S]*?)<\/span>/)[1].replace(/<[^>]+>/g, "");
				alert(title, body, link);
			};
		};
		a.open("GET", url + "/joke/hot/", false);
		a.send();
		a = null;
	}catch(e){
		console.log('[!] 出错:' + e.message);
	}
	// 设置更新时间
	setTimeout(start, 1000 * 60 * 10);
}
// localStorage.clear();
start();