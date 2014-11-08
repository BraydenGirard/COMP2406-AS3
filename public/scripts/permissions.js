$(document).ready(function () {

	var startCol = $('.start');
	var deadCol = $('.dead');
	var doneCol = $('.done');

	document.getElementById('Logout').addEventListener("click", function() {
		document.cookie = 'permission' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	});

	function getCookie(cname) {
	    var name = cname + "=";
	    var ca = document.cookie.split(';');
	    for(var i=0; i<ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0)==' ') c = c.substring(1);
	        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
	    }
	    return "";
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

	function permissionCheck() {
		var permission = getCookie('permission');
		console.log("Permission is: " + permission);
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
	}
	
	permissionCheck();

});