$(document).ready(function() {
	$('#SubMenu a').click(function() {
		$('#SubMenu').toggle('slow');
	});

	

	$('#menu-bar').click(function() {
		$('#SubMenu').toggle('slow');
	});

});