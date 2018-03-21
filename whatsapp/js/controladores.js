$(document).ready(function() {
	$.ajax({
		url: './Ajax/amigos.php',
		type: 'POST',
		data: {user: $("#slc-usuario").val()},
		success: function (argument) {
			$('#allmensajes').fadeOut( function() {
					$('#conversacion').fadeIn();
				});
			$('#amigos').html(argument);
		}
	});

	$("#slc-usuario").change(function(){
		$.ajax({
			url: './Ajax/amigos.php',
			type: 'POST',
			data: {user: $("#slc-usuario").val()},
			success: function (argument) {
				$('#conversacion').fadeIn();
				$('#amigos').html(argument);
				$('#allmensajes').fadeOut();	
			}
		});
	});


	$("#btn-enviar").click(function() {
		$.ajax({
			url: './Ajax/enviarMensaje.php',
			type: 'POST',
			data: {mensaje:  $("#txta-mensaje").val(),
				   user: $("#slc-usuario").val(),
				   receptor: $('.heading-name-meta').val() },
			success: function (argument) {
				mostrarChat($('.heading-name-meta').val());
				$("#txta-mensaje").val('Write message...');
			}
		});	
	});

});

function mostrarChat(amigo) {
	$.ajax({
		url: './Ajax/mostrarChat.php',
		type: 'POST',
		data: {user:$("#slc-usuario").val(),
			   chat: amigo},
		success:function (argument) {
			
				$('#conversacion').fadeOut(function(){
					$('#allmensajes').fadeIn();
					$('.heading-name-meta').html(amigo);
					$('.heading-name-meta').val(amigo);
					$('#conversation').html(argument);
				});
			}
		
	});
	
}