function DisableArrowKeys() {
	var ar = new Array(37, 38, 39, 40);
	$(document).keydown(function(e) {
			var key = e.which;
			if ($.inArray(key, ar) > -1) {
					e.preventDefault();
					return false; 
		 }
			return true;
	});
}
		
function EnableArrowKeys() {
	var ar = new Array(37, 38, 39, 40);
	$(document).keydown(function(e) {
			var key = e.which;
			if ($.inArray(key, ar) > -1) {              
					return true;
			}           
	});
}