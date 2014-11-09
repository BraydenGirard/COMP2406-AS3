$(document).ready(function () {

	var startCol = $('.start');
	var deadCol = $('.dead');
	var doneCol = $('.done');
	var PATH = window.location.pathname;
	var POST;

	document.getElementById('Logout').addEventListener("click", function() {
		//document.cookie = "permission" +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	});

	/*
	// posts new desired start and dead
	function postTa(data) {
		var xmlHttp = null;		
		xmlHttp = new XMLHttpRequest();
		xmlHttp.onreadystatechange=function() {
			if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
				desiredTemperature = xmlHttp.responseText;
				tempLabel.innerHTML = desiredTemperature.toString() + "°C";
			}
		}
		xmlHttp.open( "POST", POST_TEMP_URL, true );
		xmlHttp.setRequestHeader('Content-Type', 'text/plain');
		xmlHttp.send( data );
	}
	// TA
	// as: #
	// username: ""
	// date: ""
	
	
	// prof
	// as: #
	// username: ""
	// dateStart: ""
	// dateEnd: ""
	
	function postProf(data) {
		
	}

	function pageForStudent() {
		disableElementsInArray(startCol);
		disableElementsInArray(deadCol);
		disableElementsInArray(doneCol);
	}

	function pageForTA() {
		disableElementsInArray(startCol);
		disableElementsInArray(deadCol);
	}

	function pageForProf() {
		disableElementsInArray(doneCol);
	}

	function disableElementsInSelector(selector) {
		selector.attr('disabled', 'disabled');
	}

	function enableElementsInSelector(selector) {
		selector.removeAttr('disabled'); 
	}*/
});