
$(document).ready(function() {
	$('#Seccion b').html('Sistema de Matricula');
	$('#btn_registrarSeccion').hide();
	$('#SubMenu a').click(function() {
		$('#SubMenu').toggle('slow');
	});
	$('#menu-bar').click(function() {
		$('#SubMenu').toggle('slow');
	});

	$('#btn-cambioCarrera').click(function(){
		alert("Validaciones");
	});

	$.ajax({
		url:'/matricula/planEstudios',
		method:'GET',
		success:function(respuesta){;
			for(var i=0;i<respuesta.length;i++){
				$('#matricular #select-departamento').append('<option  value="'+respuesta[i].codigo_carrera+'">'+respuesta[i].nombre_carrera+'</option>');
			}
		}
	});

	$.ajax({
		url:'/matricula/asignaturasMatriculadas',
		method:'GET',
		success:function(respuesta){;
			console.log(respuesta);
			for(var i=0;i<respuesta.length;i++){
				var clases="";
				if(respuesta[i].codigo_estado_matricula==1){
					clases+='<tr><td>'+respuesta[i].codigo_alterno+'</td>'+
							'<td>'+respuesta[i].nombre_asignatura +'</td>'+
							'<td>'+respuesta[i].seccion +'</td>'+
							'<td>'+respuesta[i].hora_inicio +'</td>'+
							'<td>'+respuesta[i].hora_fin +'</td>'+
							'<td>'+respuesta[i].dias +'</td>'+
							'<td>'+respuesta[i].nombre_edificio +'</td>'+
							'<td>'+respuesta[i].nombre_aula +'</td>'+
							'<td>'+respuesta[i].cantidad_unidades_valorativas +'</td>'+
							'<td>'+respuesta[i].nombre_periodo +'</td>'+
							'<td><button class="btn btn-danger">Cancelar</button></td></tr>';
							$('#tbl-AsignaturasMatriculadas').append(clases);
				}else{
					clases+='<tr><td>'+respuesta[i].codigo_alterno+'</td>'+
							'<td>'+respuesta[i].nombre_asignatura +'</td>'+
							'<td>'+respuesta[i].dias +'</td>'+
							'<td>'+respuesta[i].cantidad_unidades_valorativas +'</td>'+
							'<td>'+respuesta[i].nombre_periodo +'</td>'+
							'<td><button class="btn btn-danger">Cancelar</button></td></tr>';
							$('#tbl-AsignaturasEspera').append(clases);
				}
			}
		}
	});
});

$('#matricular #select-departamento').change(function(){
	var id= $(this).val();
	$('#matricular #select-asignaturas').html("");
	$('#matricular #select-secciones').html("");
	$('#btn_registrarSeccion').hide();
	$.ajax({
		url:'/matricula/planEstudios',
		method:'GET',
		success:function(respuesta){
			asignaturas=respuesta;
			console.log(asignaturas);
			for(var i=0;i<asignaturas.length;i++){
				if(asignaturas[i].codigo_carrera==id){
					for(var j=0;j<asignaturas[i].asignaturas.length;j++){
						$('#matricular #select-asignaturas').append('<option value="'+asignaturas[i].asignaturas[j].codigo_asignatura+'">'+asignaturas[i].asignaturas[j].codigo_alterno+'-'+asignaturas[i].asignaturas[j].nombre_asignatura+'</option>');
					}
				}
			}
		}
	});
});

$('#matricular #select-asignaturas').change(function(){
	var id= $(this).val();
	$('#matricular #select-secciones').html("");
	$('#btn_registrarSeccion').hide();
	$.ajax({
		url:'/matricula/secciones',
		method:'POST',
		data:'codigo='+id,
		success:function(respuesta){
			for(var i=0;i<respuesta.length;i++){
				$('#matricular #select-secciones').append('<option value="'+respuesta[i].codigo_seccion+'">'+respuesta[i].codigo_alterno+'-'+respuesta[i].dias+'-'+respuesta[i].cantidad_cupos+'</option>');
			}
		}
	});
});

$('#matricular #select-secciones').change(function(){
	var id= $(this).val();
	$('#btn_registrarSeccion').show();
});

function reiniciar(){
	$('#matricular #select-asignaturas').html("");
	$('#matricular #select-secciones').html("");
	$('#btn_registrarSeccion').hide();
}

function Matricular(){
	var id= $('#matricular #select-secciones').val();
	$.ajax({
		url:'/matricula/matricular',
		method:'POST',
		data:'codigo='+id,
		success:function(respuesta){
			console.log(respuesta);
				var clases="";
				if(respuesta[0].codigo_estado_matricula==1){
					clases+='<tr><td>'+respuesta[0].codigo_alterno+'</td>'+
							'<td>'+respuesta[0].nombre_asignatura +'</td>'+
							'<td>'+respuesta[0].seccion +'</td>'+
							'<td>'+respuesta[0].hora_inicio +'</td>'+
							'<td>'+respuesta[0].hora_fin +'</td>'+
							'<td>'+respuesta[0].dias +'</td>'+
							'<td>'+respuesta[0].nombre_edificio +'</td>'+
							'<td>'+respuesta[0].nombre_aula +'</td>'+
							'<td>'+respuesta[0].cantidad_unidades_valorativas +'</td>'+
							'<td>'+respuesta[0].nombre_periodo +'</td>'+
							'<td><button class="btn btn-danger">Cancelar</button></td></tr>';
							$('#tbl-AsignaturasMatriculadas').append(clases);
				}else{
					clases+='<tr><td>'+respuesta[0].codigo_alterno+'</td>'+
							'<td>'+respuesta[0].nombre_asignatura +'</td>'+
							'<td>'+respuesta[0].dias +'</td>'+
							'<td>'+respuesta[0].cantidad_unidades_valorativas +'</td>'+
							'<td>'+respuesta[0].nombre_periodo +'</td>'+
							'<td><button class="btn btn-danger">Cancelar</button></td></tr>';
							$('#tbl-AsignaturasEspera').append(clases);
				}
		}
	});
}

function guardarCambioUnah(){
	validarCambioUnah();
}

function guardarCambioCarrera(){
	validarCambioCarrera();
}

function validarCambioUnah(){
	validarCamposVacios('#txt-motivoCambioUniversidad');
	validarSelect('#select-cambioUniversidad');
}

function validarCambioCarrera(){
	validarCamposVacios('#txt-motivoCambioCarrera');
	validarSelect('#select-cambioCarreras');
}

var estado=0;
function validarCamposVacios(id){
	if($(id).val()==""){
		$(id).removeClass('is-valid');
		$(id).addClass('is-invalid');
		estado=0;
	}else{
		$(id).removeClass('is-invalid');
		$(id).addClass('is-valid');
		estado=1;
	}
}
function validarSelect(id){
	if($(id).val()==0){
		$(id).removeClass('is-valid');
		$(id).addClass('is-invalid');
		estado=0;
	}else{
		$(id).removeClass('is-invalid');
		$(id).addClass('is-valid');
		estado=1;
	}
}