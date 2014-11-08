$(document).ready(function () {

	var permission = getCookie('permission');
	var startCol = $('.start');
	var deadCol = $('.dead');
	var doneCol = $('.done');

	document.getElementById('Logout').onclick = function() {
  		document.cookie = 'permission' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	};

	function getCookie(name) {
		var value = "; " + document.cookie;
		var parts = value.split("; " + name + "=");
		if(parts.length == 2) return parts.pop().split(";").shift();
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
	}

	if(permission != undefined && permission != null && permission != 0) {
		switch(permission) {
			case 1:
				pageForProf();
				break;
			case 2: 
				pageForTA();
				break;
			case 3: 
				pageForStudent();
				break;
			default:
				console.log("Error invalid permission in cookie");
				break;
		}
	} else {
		console.log("Error permission in cookie couldn't be found");
	}

});