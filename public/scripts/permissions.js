$(document).ready(function () {
	
	var PATH = window.location.pathname;
	var start = $('input[name=dateStart]');
	var end = $('input[name=dateEnd]');
	var date = $('input[name=date]');
	
	function validateForm() {
		Boolean result = false;
		if(PATH.indexOf("prof") > -1) {
			result = checkValidProfForm();
		} else if(PATH.indexOf("ta") > -1) {
			result = checkValidTaForm();
		}
		return result;
	}
	
	function checkValidProfForm() {
		if(start.value != undefined && start.value != null && end.value != undefined && end.value != null) {
			Date date1 = new Date(start.value);
			Date date2 = new Date(end.value);
			return (isValidDate(date1) && isValidDate(date2));
		} 
		return false;
	}
	
	function checkValidTaForm() {
		if(date.value != undefined && date.value != null) {
			Date date1 = new Date(start.value);
			Date date2 = new Date(end.value);
			return (isValidDate(date1) && isValidDate(date2));
		} 
		return false;
	}

	
	function isValidDate(d) {
	  if ( Object.prototype.toString.call(d) !== "[object Date]" )
	    return false;
	  return !isNaN(d.getTime());
	}
	
});