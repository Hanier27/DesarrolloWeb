$(document).ready(function() {

	$('#btn-loginEstudiante').click(function(event) {
		validarCamposVacios('#user_estudiante');
		validarCamposVacios('#pass_estudiante');
		validarTamañoEstudiante('#user_estudiante');
		validarContraseña('#pass_estudiante');
		$(this).html(' <i class="fa fa-spinner fa-spin" style="font-size:20px"></i> Iniciando Sesión');
		setTimeout("location.href ='gestion_matricula'",2000);
	});

	$('#btn-loginEmpleado').click(function(event) {
		validarCamposVacios('#user_empleado');
		validarCamposVacios('#clave_empleado');
		validarContraseña('#clave_empleado');
		$(this).html(' <i class="fa fa-spinner fa-spin" style="font-size:20px"></i> Iniciando Sesión');
		setTimeout("location.href ='docente'",2000);
	});

	
});

	

	function validarEstudiante(){
		validarCamposVacios('#user_estudiante');
		validarPatron('#user_estudiante');	
		validarTamañoEstudiante('#user_estudiante');
	}

	function validarPassEstudiante(){
		validarCamposVacios('#pass_estudiante');
		validarContraseña('#pass_estudiante');
	}
	
	function validarCamposVacios(id){
		if($(id).val()==""){
			$(id).removeClass('is-valid');
			$(id).addClass('is-invalid');
		}else{
			$(id).removeClass('is-invalid');
			$(id).addClass('is-valid');

		}
	}

	function validarPatron(id){
		if(!/^([0-9])*$/.test(String($(id).val()))){
			$(id).removeClass('is-valid');
			$(id).addClass('is-invalid');
		}else{
			$(id).removeClass('is-invalid');
			$(id).addClass('is-valid');

		}
	} 

	function validarTamañoEstudiante(id){
		if($(id).val().length==11){
			$(id).removeClass('is-invalid');
			$(id).addClass('is-valid');
		}else{
			$(id).removeClass('is-valid');
			$(id).addClass('is-invalid');
		}
	}

	function validarContraseña(id){
		if($(id).val().length<=6){
			$(id).removeClass('is-valid');
			$(id).addClass('is-invalid');
		}else{
			$(id).removeClass('is-invalid');
			$(id).addClass('is-valid');
		}
	}