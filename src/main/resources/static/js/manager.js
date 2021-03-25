function spread() {
	$(document).ready(function(e) {
	//用这个attr方法加入
		if ($("#s1").attr("class") == "fa fa-plus-square") {
			$("#d2").css("max-height", "80px");
			$("#s1").removeClass("fa-plus-square");
			$("#s1").addClass("fa-minus-square");
		} else {
			$("#d2").css("max-height", "0");
			$("#s1").removeClass("fa-minus-square");
			$("#s1").addClass("fa-plus-square");
		}
	});
}

function loadSeats() {
    var div=document.getElementById("content");
    div.innerHTML='<iframe align="center" width="100%" height="100%" src="seats.html" frameborder="no" border="0" marginwidth="0" marginheight="5" scrolling="no" ></iframe>'
}

function loadUsers() {
    var div=document.getElementById("content");
    div.innerHTML='<iframe align="center" width="100%" height="100%" src="users.html" frameborder="no" border="0" marginwidth="0" marginheight="20" scrolling="no"></iframe>'
}