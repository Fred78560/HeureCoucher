exports.action = function(data){

	var fs = require("fs");
	var path = require('path');
 	var filePath = __dirname + '/heure_coucher.json';
	var file_content;

//var reponse1=JarvisIA.reco
//var rgxp = /HeureCoucher (.+)/i; var reponse1 = reponse1.match(rgxp)

var reg="/"+data.HeureCoucher+"(.+)/i" ; var rgxp = eval(reg) ; var temp = JarvisIA.reco.match(rgxp) ; console.log(temp)
var reponse1 = temp[1].trim() ; console.log("on envoie : ",reponse1)

var hour = reponse1[0]+reponse1[1];
var minutes = reponse1[3]+reponse1[4];
console.log(hour)
console.log(minutes)

	file_content = fs.readFileSync(filePath, 'utf8');
	file_content = JSON.parse(file_content);

	
	var heure_coucher = file_content.heure_coucher;
	var minute_coucher = file_content.minute_coucher;

	if(data.time == "settime") {
		var hour=hour;
		var minutes= minutes;

		var coucher_json = {};

		if( hour) {
			coucher_json.heure_coucher = hour;
		} else {
			coucher_json.heure_coucher = "";
		}
		if(minutes) {
			coucher_json.minute_coucher = minutes;
		} else {
			coucher_json.minute_coucher = "";
		}

		chaine = JSON.stringify(coucher_json, null, '\t');
		fs.writeFile(filePath, chaine, function (err) {
			console.log("[--Mise à jour HeureCoucher--] Nouvelle heure du coucher enregistré");
		});


		var text = "Okay... je change l'heure du coucher pour " + coucher_json.heure_coucher + " heure " + coucher_json.minute_coucher;
	} 

else {
		var date = new Date();
			
			switch(data.time) {

			case 'checktime':
				var time_rest = (heure_coucher * 3600 + minute_coucher * 60) - (date.getHours() * 3600 + date.getMinutes() * 60);
				if(time_rest <= 0) {
					var text = "Oui, il est l'heure d'aller vous coucher";
				} else {
					var time_in_hour = time_rest / 3600
					var heure_rest = parseInt(time_in_hour);
					var minute_rest = (time_in_hour - heure_rest) * 60;

					var heure_rest = heure_rest > 0 ? Math.floor(heure_rest) + " heure " : "";
					var minute_rest = minute_rest > 0 ? Math.floor(minute_rest) + " minute " : "";

					var text = "Non, vous avez encore " + heure_rest + " " + minute_rest+ " avant d'aller vous couchez";
				}
			break;

			case 'gettimeforsleep':
				//var text = "Votre heure de couché est à " + heure_coucher + " heure " + minute_coucher;
				var text = "Vous avez programmer votre heure du couché pour " + heure_coucher + " heure " + minute_coucher;
			break;
		}
	}

	console.log(text);
	JarvisIASpeech(text);
//Mathilde test 10 heure 10
};