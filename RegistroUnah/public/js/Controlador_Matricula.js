
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
		url:'/matricula/datos_estudiantes',
		method:'GET',
		success:function(respuesta){
			$('#profile-user #cuenta').html('Cuenta: '+respuesta[0].numero_cuenta);
			$('#profile-user #nombre').html('Nombre: '+respuesta[0].nombre+' '+respuesta[0].apellido);
			$('#profile-user #carrera').html('Carrera: '+respuesta[0].nombre_carrera);
			$('#profile-user #centro').html('Centro: '+respuesta[0].nombre_campus);
			$('#profile-user #ano').html('Año: '+respuesta[0].año);
			$('#profile-user-historial #cuenta').html('Cuenta: '+respuesta[0].numero_cuenta);
			$('#profile-user-historial #nombre').html('Nombre: '+respuesta[0].nombre+' '+respuesta[0].apellido);
			$('#profile-user-historial #carrera').html('Carrera: '+respuesta[0].nombre_carrera);
			$('#profile-user-historial #centro').html('Centro: '+respuesta[0].nombre_campus);
		}
	});

	$.ajax({
		url:'/matricula/planEstudios',
		method:'GET',
		success:function(respuesta){
			for(var i=0;i<respuesta.length;i++){
				$('#matricular #select-departamento').append('<option  value="'+respuesta[i].codigo_carrera+'">'+respuesta[i].nombre_carrera+'</option>');
			}
		}
	});

	$.ajax({
		url:'/matricula/historial',
		method:'GET',
		success:function(respuesta){
			for(var i=0;i<respuesta.length;i++){
				var historial=""
				historial+='<tr><td>'+respuesta[i].codigo_alterno+'</td>'+
				'<td>'+respuesta[i].nombre_asignatura +'</td>'+
				'<td>'+respuesta[i].cantidad_unidades_valorativas +'</td>'+
				'<td>'+respuesta[i].seccion +'</td>'+
				'<td>'+respuesta[i].ano +'</td>'+
				'<td>'+respuesta[i].nombre_periodo +'</td>'+
				'<td>'+respuesta[i].valor_nota +'</td>'+
				'<td>'+respuesta[i].nombre_tipo_evaluacion +'</td></tr>';
				$('#tbl-historial').append(historial);
			}
		}
	});

	$.ajax({
		url:'/matricula/asignaturasMatriculadas',
		method:'GET',
		success:function(respuesta){
			for(var i=0;i<respuesta.length;i++){
				var clases="";
				var forma="";
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
							'<td><button class="btn btn-danger" onclick="cancelar_clase('+respuesta[i].codigo_matricula+','+respuesta[i].codigo_seccion+')">Cancelar</button></td></tr>';
							$('#tbl-AsignaturasMatriculadas').append(clases);

							forma+='<tr><td>'+respuesta[i].codigo_alterno+'</td>'+
							'<td>'+respuesta[i].nombre_asignatura +'</td>'+
							'<td>'+respuesta[i].seccion +'</td>'+
							'<td>'+respuesta[i].hora_inicio +'</td>'+
							'<td>'+respuesta[i].hora_fin +'</td>'+
							'<td>'+respuesta[i].dias +'</td>'+
							'<td>'+respuesta[i].nombre_edificio +'</td>'+
							'<td>'+respuesta[i].nombre_aula +'</td>'+
							'<td>'+respuesta[i].cantidad_unidades_valorativas +'</td>'+
							'<td>'+respuesta[i].nombre_periodo +'</td></tr>';		
							$('#forma003').append(forma);
				}else{
					clases+='<tr><td>'+respuesta[i].codigo_alterno+'</td>'+
							'<td>'+respuesta[i].nombre_asignatura +'</td>'+
							'<td>'+respuesta[i].dias +'</td>'+
							'<td>'+respuesta[i].cantidad_unidades_valorativas +'</td>'+
							'<td>'+respuesta[i].nombre_periodo +'</td>'+
							'<td><button class="btn btn-danger" onclick="cancelar_clase('+respuesta[i].codigo_matricula+','+ respuesta[i].codigo_seccion+')>Cancelar</button></td></tr>';
							$('#tbl-AsignaturasEspera').append(clases);
							$('#En_espera').append(clases);
				}
			}
		}
	});
});

$('#matricular #select-departamento').change(function(){
	$('#requisitos').addClass('d-none');
	var id= $(this).val();
	var historial=[];
	$('#matricular #select-asignaturas').html("");
	$('#matricular #select-secciones').html("");
	$('#btn_registrarSeccion').hide();
	$.ajax({
		url:'/matricula/historial',
		method:'GET',
		success:function(respuesta){
			historial=respuesta;
		}
	});
	$.ajax({
		url:'/matricula/planEstudios',
		method:'GET',
		success:function(respuesta){
			for(var i=0;i<respuesta.length;i++){
				if(respuesta[i].codigo_carrera==id){
					for(var x=0;x<historial.length;x++){
						for(var j=0;j<respuesta[i].asignaturas.length;j++){
							if(historial[x].codigo_alterno!=respuesta[i].asignaturas[j].codigo_alterno){
								$('#matricular #select-asignaturas').append('<option value="'+respuesta[i].asignaturas[j].codigo_asignatura+'">'+respuesta[i].asignaturas[j].codigo_alterno+'-'+respuesta[i].asignaturas[j].nombre_asignatura+'</option>');
							}
						}
					}	
				}
			}
		}
	});
});

$('#matricular #select-asignaturas').change(function(){
	var id= $(this).val();
	$('#requisitos').html("");
	var historial=[];
	var asignaturas=[];
	var requisitos=[];
	var asignaturasMatriculadas=[];
	var estado=0;
	var matricula=0;
	$('#matricular #select-secciones').html("");
	$('#btn_registrarSeccion').hide();
	$.ajax({
		url:'/matricula/historial',
		method:'GET',
		success:function(respuesta){
			historial=respuesta;
		}
	});
	$.ajax({
		url:'/matricula/asignaturasMatriculadas',
		method:'GET',
		success:function(respuesta){
			asignaturasMatriculadas=respuesta;
		}
	});
	$.ajax({
		url:'/matricula/requisitos',
		method:'GET',
		success:function(respuesta){
			for(var k=0;k<respuesta.length;k++){
				if(respuesta[k].codigo_asignatura==id){
					for(var m=0;m<respuesta[k].requisitos.length;m++){
						for(var x=0;x<historial.length;x++){
							if(respuesta[k].requisitos[m].codigo_alterno==historial[x].codigo_alterno){
								estado=0;
							}else{
								estado=1;
								requisitos=respuesta[k].requisitos[m].codigo_alterno;
							}	
						}
					}
				}
			}
			for(var y=0;y<asignaturasMatriculadas.length;y++){
				if(asignaturasMatriculadas[y].codigo_asignatura==id){
					matricula=1;
				}
			}
			if(estado==0){
						if(matricula==1){
							$('#requisitos').html("");
							$('#requisitos').append('ASIGNATURA MATRICULADA')	
							$('#requisitos').removeClass('d-none');
						}else{
							$('#requisitos').addClass('d-none');
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
						}
			}else{
				$('#requisitos').html("");
				$('#requisitos').append('FALTAN REQUISITOS ')
				for(var i=0;i<requisitos.length;i++){
					$('#requisitos').append(requisitos[i]);
				}	
				$('#requisitos').removeClass('d-none');
			}
			
		}
	});
});

$('#matricular #select-secciones').change(function(){
	$('#btn_registrarSeccion').show();
});

function reiniciar(){
	$('#matricular #select-asignaturas').html("");
	$('#matricular #select-secciones').html("");
	$('#btn_registrarSeccion').hide();
	$('#requisitos').addClass('d-none');
}

function Matricular(){
	
	var id= $('#matricular #select-secciones').val();
	$.ajax({
		url:'/matricula/matricular',
		method:'POST',
		data:'codigo='+id,
		success:function(respuesta){
				var clases="";
				var forma="";
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
							'<td><button class="btn btn-danger" onclick="cancelar_clase('+respuesta[0].codigo_matricula+','+respuesta[0].codigo_seccion+')">Cancelar</button></td></tr>';
							$('#tbl-AsignaturasMatriculadas').append(clases);

							forma+='<tr><td>'+respuesta[0].codigo_alterno+'</td>'+
							'<td>'+respuesta[0].nombre_asignatura +'</td>'+
							'<td>'+respuesta[0].seccion +'</td>'+
							'<td>'+respuesta[0].hora_inicio +'</td>'+
							'<td>'+respuesta[0].hora_fin +'</td>'+
							'<td>'+respuesta[0].dias +'</td>'+
							'<td>'+respuesta[0].nombre_edificio +'</td>'+
							'<td>'+respuesta[0].nombre_aula +'</td>'+
							'<td>'+respuesta[0].cantidad_unidades_valorativas +'</td>'+
							'<td>'+respuesta[0].nombre_periodo +'</td></tr>';		
							$('#forma003').append(forma);
				}else{
					clases+='<tr><td>'+respuesta[0].codigo_alterno+'</td>'+
							'<td>'+respuesta[0].nombre_asignatura +'</td>'+
							'<td>'+respuesta[0].dias +'</td>'+
							'<td>'+respuesta[0].cantidad_unidades_valorativas +'</td>'+
							'<td>'+respuesta[0].nombre_periodo +'</td>'+
							'<td><button class="btn btn-danger" onclick="cancelar_clase('+respuesta[0].codigo_matricula+','+respuesta[0].codigo_seccion+')">Cancelar</button></td></tr>';
							$('#tbl-AsignaturasEspera').append(clases);
				}
		}
	});
	reiniciar();
}

function cancelar_clase(id,seccion){
	$('#tbl-AsignaturasMatriculadas tbody').html("");
	$('#forma003 tbody').html("");
	$('#tbl-AsignaturasEspera tbody').html("");
	$('#En_espera tbody').html("");
	$.ajax({
		url:'/matricula/cancelar_clase',
		method:'POST',
		data:'codigo='+id+'&'+'seccion='+seccion,
		success:function(respuesta){
			for(var i=0;i<respuesta.length;i++){
				var clases="";
				var forma="";
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
							'<td><button class="btn btn-danger" onclick="cancelar_clase('+respuesta[i].codigo_matricula+','+respuesta[i].codigo_seccion+')">Cancelar</button></td></tr>';
							$('#tbl-AsignaturasMatriculadas').append(clases);

							forma+='<tr><td>'+respuesta[i].codigo_alterno+'</td>'+
							'<td>'+respuesta[i].nombre_asignatura +'</td>'+
							'<td>'+respuesta[i].seccion +'</td>'+
							'<td>'+respuesta[i].hora_inicio +'</td>'+
							'<td>'+respuesta[i].hora_fin +'</td>'+
							'<td>'+respuesta[i].dias +'</td>'+
							'<td>'+respuesta[i].nombre_edificio +'</td>'+
							'<td>'+respuesta[i].nombre_aula +'</td>'+
							'<td>'+respuesta[i].cantidad_unidades_valorativas +'</td>'+
							'<td>'+respuesta[i].nombre_periodo +'</td></tr>';		
							$('#forma003').append(forma);
				}else{
					clases+='<tr><td>'+respuesta[i].codigo_alterno+'</td>'+
							'<td>'+respuesta[i].nombre_asignatura +'</td>'+
							'<td>'+respuesta[i].dias +'</td>'+
							'<td>'+respuesta[i].cantidad_unidades_valorativas +'</td>'+
							'<td>'+respuesta[i].nombre_periodo +'</td>'+
							'<td><button class="btn btn-danger" onclick="cancelar_clase('+respuesta[i].codigo_matricula+','+ respuesta[i].codigo_seccion+')>Cancelar</button></td></tr>';
							$('#tbl-AsignaturasEspera').append(clases);
							$('#En_espera').append(clases);
				}
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