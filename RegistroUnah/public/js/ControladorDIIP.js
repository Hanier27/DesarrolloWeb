$(document).ready(function() {
	$('#Seccion b').html('Administracion DIIP');
	$('#NavbarPrincipal #MenuBar').removeClass('d-none');
	$.ajax({
		url:'/carreras',
		method:'GET',
		success:function(respuesta){
			for(var i=0;i<respuesta.length;i++){
                $('#registrarEstudiante #select-carreras').append('<option value="'+respuesta[i].codigo_carrera+'">'+respuesta[i].nombre_carrera+'</option>');
				$('#registrarEmpleado #select-nombreArea').append('<option value="'+respuesta[i].codigo_carrera+'">'+respuesta[i].nombre_carrera+'</option>');
			}
		}
	});
	$.ajax({
		url:'/DP/especialidades',
		method:'GET',
		success:function(respuesta){
			for(var i=0;i<respuesta.length;i++){
                $('#registrarEmpleado #select-Especialidad').append('<option value="'+respuesta[i].codigo_especializacion+'">'+respuesta[i].descripcion+'</option>');
            }
		}
	});
	$.ajax({
		url:'/DP/titularidades',
		method:'GET',
		success:function(respuesta){
			for(var i=0;i<respuesta.length;i++){
                $('#registrarEmpleado #select-Titularidad').append('<option value="'+respuesta[i].codigo_titularidad+'">'+respuesta[i].nombre_titularidad+'</option>');
            }
		}
	});
	$.ajax({
		url:'/campus',
		method:'GET',
		success:function(respuesta){
			for(var i=0;i<respuesta.length;i++){
                $('#registrarEstudiante #txt-campus').append('<option value="'+respuesta[i].codigo_campus+'">'+respuesta[i].nombre_campus+'</option>');
            }
		}
	});
	$.ajax({
		url:'/DP/cargos',
		method:'GET',
		success:function(respuesta){
			for(var i=0;i<respuesta.length;i++){	
                $('#registrarEmpleado #select-cargo').append('<option value="'+respuesta[i].codigo_cargo+'">'+respuesta[i].nombre_cargo+'</option>');
            }
		}
	});
	$.ajax({
		url:'/DP/tipos_empleado',
		method:'GET',
		success:function(respuesta){
			for(var i=0;i<respuesta.length;i++){
				$('#registrarEmpleado #select-tipoEmpleado').append('<option value="'+respuesta[i].codigo_tipo_empleado+'">'+respuesta[i].nombre_tipo_empleado+'</option>');
			}
		}
	});

	$.ajax({
		url:'/DP/estudiantes',
		method:'GET',
		success:function(respuesta){
			for(var i=0;i<respuesta.length;i++){
				var contenido="";
				var numero=i+1;
				contenido=contenido+'<tr><td>'+numero+'</td>'+
                    '<td>'+respuesta[i].numero_cuenta+'</td>'+
                    '<td>'+respuesta[i].nombre+' '+respuesta[i].apellido+'</td>'+
                    '<td>'+respuesta[i].identidad+'</td>'+
                    '<td>'+respuesta[i].direccion+'</td>'+
                    '<td>'+respuesta[i].telefono+'</td>'+
					'<td>'+respuesta[i].correo_electronico+'</td>'+
					'<td>'+respuesta[i].nombre_campus +'</td><td>';
					for(var j=0;j<respuesta[i].carreras.length;j++){
						contenido+=respuesta[i].carreras[j].nombre_carrera+"<br>";
					}
					contenido=contenido+'</td><td>'+respuesta[i].promedio+'</td></tr>';
					$('#tbl-Estudiantes tbody').append(contenido);
			}
		}
	});

	$.ajax({
		url:'/DP/empleados',
		method:'GET',
		success:function(respuesta){
			for(var i=0;i<respuesta.length;i++){
				var contenido="";
				var numero=i+1;
					contenido=contenido+'<tr><td>'+numero+'</td>'+
                    '<td>'+respuesta[i].numero_empleado+'</td>'+
                    '<td>'+respuesta[i].nombre+' '+respuesta[i].apellido+'</td>'+
                    '<td>'+respuesta[i].direccion+'</td>'+
                    '<td>'+respuesta[i].telefono+'</td>'+
					'<td>'+respuesta[i].correo_electronico+'</td>'+
					'<td>'+respuesta[i].identidad+'</td>'+
					'<td>'+respuesta[i].nombre_campus+'</td>'+
					'<td>'+respuesta[i].nombre_cargo+'</td>'+
					'<td>'+respuesta[i].sueldo_base+'</td></tr>';
					$('#tbl-Empleados tbody').append(contenido);
			}
		}
	});

	$.ajax({
		url:'/DP/docentes',
		method:'GET',
		success:function(respuesta){
			for(var i=0;i<respuesta.length;i++){
				var contenido="";
				var numero=i+1;
					contenido=contenido+'<tr><td>'+numero+'</td>'+
                    '<td>'+respuesta[i].numero_empleado+'</td>'+
                    '<td>'+respuesta[i].nombre+' '+respuesta[i].apellido+'</td>'+
                    '<td>'+respuesta[i].telefono+'</td>'+
					'<td>'+respuesta[i].correo_electronico+'</td>'+
					'<td>'+respuesta[i].identidad+'</td>'+
					'<td>'+respuesta[i].nombre_campus+'</td>'+
					'<td>'+respuesta[i].nombre_titularidad+'</td>'+
					'<td>'+respuesta[i].descripcion+'</td>'+
					'<td>'+respuesta[i].salario_minimo+'</td></tr>';
					$('#tbl-Docentes tbody').append(contenido);
			}
		}
	});
	
});


function CambiarPaneles(){
	if($('#select-cargo').val()==1 || $('#select-cargo').val()==2){
		$('#tab-doc3').removeClass('d-none');
		$('#btn-continuarDocente').removeClass('d-none');
		$('#btn-guardarEmpleado').addClass('d-none');
		$('#salario').addClass('d-none');
	}else{
		$('#tab-doc3').addClass('d-none');
		$('#btn-continuarDocente').addClass('d-none');
		$('#btn-guardarEmpleado').removeClass('d-none');
		$('#salario').removeClass('d-none');
	}
}

function ValidarDatosPersonales(){
	var estado=0;
	estado=estado+ValidarNombre();
	estado=estado+ValidarApellido();
	estado=estado+validarIde();
	estado=estado+validarFechaNac();
	estado=estado+validarLugNac();
	estado=estado+validarMunNac();
	estado=estado+validarLugRes();
	estado=estado+validarMunRes();
	estado=estado+validarDireccion();
	estado=estado+validarTelefono();
	estado=estado+validarCorreo();
	if(estado==0){
		$('#btn-continuarEstudiante').html('<i class="fa fa-spinner fa-spin" style="font-size:20px"></i> Cargando...');
		setTimeout(function(){
			$('#datospersonales').removeClass('active');
			$('#datos_estudiantes').addClass('active');
			$('#tab-1').removeClass('active').addClass('disabled');
			$('#tab-2').removeClass('disabled').addClass('active');
		},2000);
	}
}
function ValidarDatosPersonalesDocente(){
	var estado=0;
	estado=estado+ValidarNombre();
	estado=estado+ValidarApellido();
	estado=estado+validarIde();
	estado=estado+validarFechaNac();
	estado=estado+validarLugNac();
	estado=estado+validarMunNac();
	estado=estado+validarLugRes();
	estado=estado+validarMunRes();
	estado=estado+validarDireccion();
	estado=estado+validarTelefono();
	estado=estado+validarCorreo();
	if(estado==0){
		$('#btn-continuarEmpleado').html('<i class="fa fa-spinner fa-spin" style="font-size:20px"></i> Cargando...');
		setTimeout(function(){
			$('#datospersonales').removeClass('active');
			$('#datos_empleado').addClass('active');
			$('#tab-doc1').removeClass('active').addClass('disabled');
			$('#tab-doc2').removeClass('disabled').addClass('active');
		},2000);
		
	}
}

function AgregarEstudiante(){
	var estado=0;
	estado=estado+validarCuentaEstudiante();
	estado=estado+validarPassEstudiante();
	estado=estado+validarContraseñas();
	estado=estado+validarCampus();
	estado=estado+validarSelect('#select-carreras');
	if(estado==0){
		$('#btn-guardarEstudiante').html('<i class="fa fa-spinner fa-spin" style="font-size:20px"></i> Cargando...');
		
			var parametros=
			"nombre="+$('#registrarEstudiante #txt-nombre_estudiante').val()+"&"+
			"apellido="+$('#registrarEstudiante #txt-apellido_estudiante').val()+"&"+
			"ide="+$('#registrarEstudiante #txt-identificacion').val()+"&"+
			"fechaNac="+$('#registrarEstudiante #txt-fecha_nacimiento').val()+"&"+
			"lugarNac="+$('#registrarEstudiante #txt-lugar_nacimiento').val()+"&"+
			"lugarRes="+$('#registrarEstudiante #txt-lugar_residencia').val()+"&"+
			"municipioNac="+$('#registrarEstudiante #txt-municipio_nacimiento').val()+"&"+
			"municipioRes="+$('#registrarEstudiante #txt-municipio_residencia').val()+"&"+
			"genero="+$('#registrarEstudiante input[name=Radios_Genero]').val()+"&"+
			"estado="+$('#registrarEstudiante input[name=Radios_EstadoCivil]').val()+"&"+
			"direccion="+$('#registrarEstudiante #txt-direccion').val()+"&"+
			"telefono="+$('#registrarEstudiante #txt-telefono').val()+"&"+
			"correo="+$('#registrarEstudiante #txt-correo').val()+"&"+
			"cuenta="+$('#registrarEstudiante #txt-numeroCuenta').val()+"&"+
			"pass="+$('#registrarEstudiante #pass_estudiante').val()+"&"+
			"campus="+$('#registrarEstudiante #txt-campus').val()+"&"+
			"carreras="+$('#registrarEstudiante #select-carreras').val();

			$.ajax({
				url:'/DP/guardarEstudiante',
				method:'POST',
				data:parametros,
				success:function(respuesta){
					var contenido="";
					var numero=$('#tbl-Estudiantes  tbody tr').length;
					numero=numero+1;
					contenido=contenido+'<tr><td>'+numero+'</td>'+
                    '<td>'+respuesta[0].numero_cuenta+'</td>'+
                    '<td>'+respuesta[0].nombre+' '+respuesta[0].apellido+'</td>'+
                    '<td>'+respuesta[0].identidad+'</td>'+
                    '<td>'+respuesta[0].direccion+'</td>'+
                    '<td>'+respuesta[0].telefono+'</td>'+
					'<td>'+respuesta[0].correo_electronico+'</td>'+
					'<td>'+respuesta[0].nombre_campus+'</td><td>';
					for(var i=0;i<respuesta[0].carreras.length;i++){
						contenido=contenido+respuesta[0].carreras[i].nombre_carrera+"<br>";
					}
					contenido=contenido+'</td><td>'+respuesta[0].promedio+'</td></tr>';
					console.log(contenido);
					$('#tbl-Estudiantes tbody').append(contenido);
					removerValidacionesEstudiantes();
				}
			});
	}
}

function AgregarEmpleado(){
	var estado=0;
	estado=estado+ValidarNumeroEmpleado();
	estado=estado+ValidarClave();
	estado=estado+ValidarClaves();
	estado=estado+validarSelect('#select-cargo');
	estado=estado+validarSelect('#select-tipoEmpleado');
	estado=estado+validarSelect('#txt-campus');
	estado=estado+validarCamposVacios('#txt-salario');
	if(estado==0){
		$('#btn-guardarEmpleado').html('<i class="fa fa-spinner fa-spin" style="font-size:20px"></i> Guardando...');

		var parametros=
			"nombre="+$('#registrarEmpleado #txt-nombre_estudiante').val()+"&"+
			"apellido="+$('#registrarEmpleado #txt-apellido_estudiante').val()+"&"+
			"ide="+$('#registrarEmpleado #txt-identificacion').val()+"&"+
			"fechaNac="+$('#registrarEmpleado #txt-fecha_nacimiento').val()+"&"+
			"lugarNac="+$('#registrarEmpleado #txt-lugar_nacimiento').val()+"&"+
			"lugarRes="+$('#registrarEmpleado #txt-lugar_residencia').val()+"&"+
			"municipioNac="+$('#registrarEmpleado #txt-municipio_nacimiento').val()+"&"+
			"municipioRes="+$('#registrarEmpleado #txt-municipio_residencia').val()+"&"+
			"genero="+$('#registrarEmpleado input[name=Radios_Genero]').val()+"&"+
			"estado="+$('#registrarEmpleado input[name=Radios_EstadoCivil]').val()+"&"+
			"direccion="+$('#registrarEmpleado #txt-direccion').val()+"&"+
			"telefono="+$('#registrarEmpleado #txt-telefono').val()+"&"+
			"correo="+$('#registrarEmpleado #txt-correo').val()+"&"+
			"numero="+$('#registrarEmpleado #txt-numeroEmpleado').val()+"&"+
			"clave="+$('#registrarEmpleado #clave_empleado').val()+"&"+
			"campus="+$('#registrarEmpleado #txt-campus').val()+"&"+
			"cargo="+$('#registrarEmpleado #select-cargo').val()+"&"+
			"tipo="+$('#registrarEmpleado #select-tipoEmpleado').val()+"&"+
			"salario="+$('#registrarEmpleado #txt-salario').val();

			console.log(parametros);
			$.ajax({
				url:'/DP/guardarEmpleado',
				method:'POST',
				data:parametros,
				success:function(respuesta){
					var contenido="";
					var numero=$('#tbl-Empleados  tbody tr').length;
					numero=numero+1;
					contenido=contenido+'<tr><td>'+numero+'</td>'+
                    '<td>'+respuesta[0].numero_empleado+'</td>'+
                    '<td>'+respuesta[0].nombre+' '+respuesta[0].apellido+'</td>'+
                    '<td>'+respuesta[0].direccion+'</td>'+
                    '<td>'+respuesta[0].telefono+'</td>'+
					'<td>'+respuesta[0].correo_electronico+'</td>'+
					'<td>'+respuesta[0].identidad+'</td>'+
					'<td>'+respuesta[0].nombre_campus+'</td>'+
					'<td>'+respuesta[0].nombre_cargo+'</td>'+
					'<td>'+respuesta[0].sueldo_base+'</td></tr>';
					$('#tbl-Empleados tbody').append(contenido);
					removerValidacionesDocentes();
				}
			});
		
	}
}

function removerValidacionesEmpleados(){
	$('#registrarEmpleado #txt-nombre_estudiante').removeClass('is-valid');
	$('#registrarEmpleado #txt-apellido_estudiante').removeClass('is-valid');
	$('#registrarEmpleado #txt-identificacion').removeClass('is-valid');
	$('#registrarEmpleado #txt-fecha_nacimiento').removeClass('is-valid');
	$('#registrarEmpleado #txt-lugar_nacimiento').removeClass('is-valid');
	$('#registrarEmpleado #txt-lugar_residencia').removeClass('is-valid');
	$('#registrarEmpleado #txt-municipio_nacimiento').removeClass('is-valid');
	$('#registrarEmpleado #txt-municipio_residencia').removeClass('is-valid');
	$('#registrarEmpleado input[name=Radios_Genero]').removeClass('is-valid');
	$('#registrarEmpleado input[name=Radios_EstadoCivil]').removeClass('is-valid');
	$('#registrarEmpleado #txt-direccion').removeClass('is-valid');
	$('#registrarEmpleado #txt-telefono').removeClass('is-valid');
	$('#registrarEmpleado #txt-correo').removeClass('is-valid');
	$('#registrarEmpleado #txt-numeroEmpleado').removeClass('is-valid');
	$('#registrarEmpleado #clave_empleado').removeClass('is-valid');
	$('#registrarEmpleado #txt-campus').removeClass('is-valid');
	$('#registrarEmpleado #select-cargo').removeClass('is-valid');
	$('#registrarEmpleado #select-tipoEmpleado').removeClass('is-valid');
	$('#registrarEmpleado #txt-salario').removeClass('is-valid');

	$('#registrarEmpleado#txt-nombre_estudiante').removeClass('is-invalid');
	$('#registrarEmpleado #txt-apellido_estudiante').removeClass('is-invalid');
	$('#registrarEmpleado #txt-identificacion').removeClass('is-invalid');
	$('#registrarEmpleado #txt-fecha_nacimiento').removeClass('is-invalid');
	$('#registrarEmpleado #txt-lugar_nacimiento').removeClass('is-invalid');
	$('#registrarEmpleado #txt-lugar_residencia').removeClass('is-invalid');
	$('#registrarEmpleado #txt-municipio_nacimiento').removeClass('is-invalid');
	$('#registrarEmpleado #txt-municipio_residencia').removeClass('is-invalid');
	$('#registrarEmpleado input[name=Radios_Genero]').removeClass('is-invalid');
	$('#registrarEmpleado input[name=Radios_EstadoCivil]').removeClass('is-invalid');
	$('#registrarEmpleado #txt-direccion').removeClass('is-invalid');
	$('#registrarEmpleado #txt-telefono').removeClass('is-invalid');
	$('#registrarEmpleado #txt-correo').removeClass('is-invalid');
	$('#registrarEmpleado #txt-numeroEmpleado').removeClass('is-invalid');
	$('#registrarEmpleado #clave_empleado').removeClass('is-invalid');
	$('#registrarEmpleado #txt-campus').removeClass('is-invalid');
	$('#registrarEmpleado #select-cargo').removeClass('is-invalid');
	$('#registrarEmpleado #select-tipoEmpleado').removeClass('is-invalid');
	$('#registrarEmpleado #txt-salario').removeClass('is-invalid');

	$('#registrarEmpleado #txt-nombre_estudiante').val("");
	$('#registrarEmpleado #txt-apellido_estudiante').val("");
	$('#registrarEmpleado #txt-identificacion').val("");
	$('#registrarEmpleado #txt-fecha_nacimiento').val("");
	$('#registrarEmpleado #txt-direccion').val("");
	$('#registrarEmpleado #txt-telefono').val("");
	$('#registrarEmpleado #txt-correo').val("");
	$('#registrarEmpleado #txt-numeroEmpleado').val("");
	$('#registrarEmpleado #clave_empleado').val("");
	$('#registrarEmpleado #txt-salario').val("");

	$('#datospersonales').addClass('active');
	$('#datos_empleado').removeClass('active');
	$('#docente').removeClass('active');
	$('#tab-doc1').removeClass('disabled').addClass('active');
	$('#tab-doc2').removeClass('active').addClass('disabled');
	$('#tab-doc3').removeClass('active').addClass('disabled');

	$('#btn-continuarEmpleado').html('Continuar');
	$('#registrarEmpleado #btn-guardarEmpleado').html("Registrar Empleado");
    $('#registrarEmpleado').modal('hide');
}

function removerValidacionesDocentes(){
	$('#registrarEmpleado #txt-nombre_estudiante').removeClass('is-valid');
	$('#registrarEmpleado #txt-apellido_estudiante').removeClass('is-valid');
	$('#registrarEmpleado #txt-identificacion').removeClass('is-valid');
	$('#registrarEmpleado #txt-fecha_nacimiento').removeClass('is-valid');
	$('#registrarEmpleado #txt-lugar_nacimiento').removeClass('is-valid');
	$('#registrarEmpleado #txt-lugar_residencia').removeClass('is-valid');
	$('#registrarEmpleado #txt-municipio_nacimiento').removeClass('is-valid');
	$('#registrarEmpleado #txt-municipio_residencia').removeClass('is-valid');
	$('#registrarEmpleado input[name=Radios_Genero]').removeClass('is-valid');
	$('#registrarEmpleado input[name=Radios_EstadoCivil]').removeClass('is-valid');
	$('#registrarEmpleado #txt-direccion').removeClass('is-valid');
	$('#registrarEmpleado #txt-telefono').removeClass('is-valid');
	$('#registrarEmpleado #txt-correo').removeClass('is-valid');
	$('#registrarEmpleado #txt-numeroEmpleado').removeClass('is-valid');
	$('#registrarEmpleado #clave_empleado').removeClass('is-valid');
	$('#registrarEmpleado #txt-campus').removeClass('is-valid');
	$('#registrarEmpleado #select-cargo').removeClass('is-valid');
	$('#registrarEmpleado #select-tipoEmpleado').removeClass('is-valid');
	$('#registrarEmpleado #select-Titularidad').removeClass('is-valid');
	$('#registrarEmpleado #select-Especialidad').removeClass('is-valid');
	$('#registrarEmpleado #select-nombreArea').removeClass('is-valid');

	$('#registrarEmpleado#txt-nombre_estudiante').removeClass('is-invalid');
	$('#registrarEmpleado #txt-apellido_estudiante').removeClass('is-invalid');
	$('#registrarEmpleado #txt-identificacion').removeClass('is-invalid');
	$('#registrarEmpleado #txt-fecha_nacimiento').removeClass('is-invalid');
	$('#registrarEmpleado #txt-lugar_nacimiento').removeClass('is-invalid');
	$('#registrarEmpleado #txt-lugar_residencia').removeClass('is-invalid');
	$('#registrarEmpleado #txt-municipio_nacimiento').removeClass('is-invalid');
	$('#registrarEmpleado #txt-municipio_residencia').removeClass('is-invalid');
	$('#registrarEmpleado input[name=Radios_Genero]').removeClass('is-invalid');
	$('#registrarEmpleado input[name=Radios_EstadoCivil]').removeClass('is-invalid');
	$('#registrarEmpleado #txt-direccion').removeClass('is-invalid');
	$('#registrarEmpleado #txt-telefono').removeClass('is-invalid');
	$('#registrarEmpleado #txt-correo').removeClass('is-invalid');
	$('#registrarEmpleado #txt-numeroEmpleado').removeClass('is-invalid');
	$('#registrarEmpleado #clave_empleado').removeClass('is-invalid');
	$('#registrarEmpleado #txt-campus').removeClass('is-invalid');
	$('#registrarEmpleado #select-cargo').removeClass('is-invalid');
	$('#registrarEmpleado #select-tipoEmpleado').removeClass('is-invalid');
	$('#registrarEmpleado #select-Titularidad').removeClass('is-invalid');
	$('#registrarEmpleado #select-Especialidad').removeClass('is-invalid');
	$('#registrarEmpleado #select-nombreArea').removeClass('is-invalid');

	$('#registrarEmpleado #txt-nombre_estudiante').val("");
	$('#registrarEmpleado #txt-apellido_estudiante').val("");
	$('#registrarEmpleado #txt-identificacion').val("");
	$('#registrarEmpleado #txt-fecha_nacimiento').val("");
	$('#registrarEmpleado #txt-direccion').val("");
	$('#registrarEmpleado #txt-telefono').val("");
	$('#registrarEmpleado #txt-correo').val("");
	$('#registrarEmpleado #txt-numeroEmpleado').val("");
	$('#registrarEmpleado #clave_empleado').val("");

	$('#datospersonales').addClass('active');
	$('#datos_empleado').removeClass('active');
	$('#docente').removeClass('active');
	$('#tab-doc1').removeClass('disabled').addClass('active');
	$('#tab-doc2').removeClass('active').addClass('disabled');
	$('#tab-doc3').removeClass('active').addClass('disabled');

	$('#btn-continuarEmpleado').html('Continuar');
	$('#btn-continuarDocente').html('Continuar');	
	$('#registrarEmpleado #btn-guardarEmpleado').html("Registrar Empleado");
    $('#registrarEmpleado').modal('hide');
}

function ValidarDatosEmpleadoContinuar(){
	var estado=0;
	estado=estado+ValidarNumeroEmpleado();
	estado=estado+ValidarClave();
	estado=estado+ValidarClaves();
	estado=estado+validarSelect('#select-cargo');
	estado=estado+validarSelect('#txt-campus');
	estado=estado+validarSelect('#select-tipoEmpleado');
	if(estado==0){

		$('#btn-continuarDocente').html('<i class="fa fa-spinner fa-spin" style="font-size:20px"></i>Cargando...');
		setTimeout(function(){
			$('#tab-doc2').removeClass('d-none');
			$('#datos_empleado').removeClass('active');
			$('#docente').addClass('active');
			$('#tab-doc2').removeClass('active').addClass('disabled');
			$('#tab-doc3').removeClass('disabled').addClass('active');
		},2000);
	}
}

function AgregarDocente(){
	var estado=0;
	estado=estado+validarSelect('#registrarEmpleado #select-Titularidad');
	estado=estado+validarSelect('#registrarEmpleado #select-Especialidad');
	estado=estado+validarSelect('#select-nombreArea');
	if(estado==0){
		$('#btn-guardarDocente').html('<i class="fa fa-spinner fa-spin" style="font-size:20px"></i> Guardando...');
		
		var parametros=
			"nombre="+$('#registrarEmpleado #txt-nombre_estudiante').val()+"&"+
			"apellido="+$('#registrarEmpleado #txt-apellido_estudiante').val()+"&"+
			"ide="+$('#registrarEmpleado #txt-identificacion').val()+"&"+
			"fechaNac="+$('#registrarEmpleado #txt-fecha_nacimiento').val()+"&"+
			"lugarNac="+$('#registrarEmpleado #txt-lugar_nacimiento').val()+"&"+
			"lugarRes="+$('#registrarEmpleado #txt-lugar_residencia').val()+"&"+
			"municipioNac="+$('#registrarEmpleado #txt-municipio_nacimiento').val()+"&"+
			"municipioRes="+$('#registrarEmpleado #txt-municipio_residencia').val()+"&"+
			"genero="+$('#registrarEmpleado input[name=Radios_Genero]').val()+"&"+
			"estado="+$('#registrarEmpleado input[name=Radios_EstadoCivil]').val()+"&"+
			"direccion="+$('#registrarEmpleado #txt-direccion').val()+"&"+
			"telefono="+$('#registrarEmpleado #txt-telefono').val()+"&"+
			"correo="+$('#registrarEmpleado #txt-correo').val()+"&"+
			"numero="+$('#registrarEmpleado #txt-numeroEmpleado').val()+"&"+
			"clave="+$('#registrarEmpleado #clave_empleado').val()+"&"+
			"campus="+$('#registrarEmpleado #txt-campus').val()+"&"+
			"cargo="+$('#registrarEmpleado #select-cargo').val()+"&"+
			"tipo="+$('#registrarEmpleado #select-tipoEmpleado').val()+"&"+
			"titularidad="+$('#registrarEmpleado #select-Titularidad').val()+"&"+
			"especialidad="+$('#registrarEmpleado #select-Especialidad').val()+"&"+
			"area="+$('#registrarEmpleado #select-nombreArea').val();

			console.log(parametros);
			$.ajax({
				url:'/DP/guardarDocente',
				method:'POST',
				data:parametros,
				success:function(respuesta){
					console.log(respuesta);
					var contenido="";
					var numero=$('#tbl-Docentes tbody tr').length;
					numero=numero+1;
					contenido=contenido+'<tr><td>'+numero+'</td>'+
                    '<td>'+respuesta[0].numero_empleado+'</td>'+
                    '<td>'+respuesta[0].nombre+' '+respuesta[0].apellido+'</td>'+
                    '<td>'+respuesta[0].telefono+'</td>'+
					'<td>'+respuesta[0].correo_electronico+'</td>'+
					'<td>'+respuesta[0].identidad+'</td>'+
					'<td>'+respuesta[0].nombre_campus+'</td>'+
					'<td>'+respuesta[0].nombre_titularidad+'</td>'+
					'<td>'+respuesta[0].descripcion+'</td>'+
					'<td>'+respuesta[0].salario_minimo+'</td></tr>';
					console.log(contenido);
					$('#tbl-Docentes tbody').append(contenido);
					removerValidacionesDocentes();
				}
			});
	}
}

function ValidarNombre(){
	var estado=0;
	estado=estado+validarCamposVacios('#txt-nombre_estudiante');
	estado=estado+validarPatron('#txt-nombre_estudiante');
	return estado;
}

function ValidarApellido(){
	var estado=0;
	estado=estado+validarCamposVacios('#txt-apellido_estudiante');
	estado=estado+validarPatron('#txt-apellido_estudiante');
	return estado;
}

function validarIde(){
	var estado=0;
	estado+=validarCamposVacios('#txt-identificacion');
	estado+=validarIdentidadHND('#txt-identificacion');
	return estado;
}

function removerValidacionesEstudiantes(){
	$('#registrarEstudiante #txt-nombre_estudiante').removeClass('is-valid');
	$('#registrarEstudiante #txt-apellido_estudiante').removeClass('is-valid');
	$('#registrarEstudiante #txt-identificacion').removeClass('is-valid');
	$('#registrarEstudiante #txt-fecha_nacimiento').removeClass('is-valid');
	$('#registrarEstudiante #txt-lugar_nacimiento').removeClass('is-valid');
	$('#registrarEstudiante #txt-lugar_residencia').removeClass('is-valid');
	$('#registrarEstudiante #txt-municipio_nacimiento').removeClass('is-valid');
	$('#registrarEstudiante #txt-municipio_residencia').removeClass('is-valid');
	$('#registrarEstudiante input[name=Radios_Genero]').removeClass('is-valid');
	$('#registrarEstudiante input[name=Radios_EstadoCivil]').removeClass('is-valid');
	$('#registrarEstudiante #txt-direccion').removeClass('is-valid');
	$('#registrarEstudiante #txt-telefono').removeClass('is-valid');
	$('#registrarEstudiante #txt-correo').removeClass('is-valid');
	$('#registrarEstudiante #txt-numeroCuenta').removeClass('is-valid');
	$('#registrarEstudiante #pass_estudiante').removeClass('is-valid');
	$('#registrarEstudiante #txt-campus').removeClass('is-valid');
	$('#registrarEstudiante #select-carreras').removeClass('is-valid');

	$('#registrarEstudiante #txt-nombre_estudiante').removeClass('is-invalid');
	$('#registrarEstudiante #txt-apellido_estudiante').removeClass('is-invalid');
	$('#registrarEstudiante #txt-identificacion').removeClass('is-invalid');
	$('#registrarEstudiante #txt-fecha_nacimiento').removeClass('is-invalid');
	$('#registrarEstudiante #txt-lugar_nacimiento').removeClass('is-invalid');
	$('#registrarEstudiante #txt-lugar_residencia').removeClass('is-invalid');
	$('#registrarEstudiante #txt-municipio_nacimiento').removeClass('is-invalid');
	$('#registrarEstudiante #txt-municipio_residencia').removeClass('is-invalid');
	$('#registrarEstudiante input[name=Radios_Genero]').removeClass('is-invalid');
	$('#registrarEstudiante input[name=Radios_EstadoCivil]').removeClass('is-invalid');
	$('#registrarEstudiante #txt-direccion').removeClass('is-invalid');
	$('#registrarEstudiante #txt-telefono').removeClass('is-invalid');
	$('#registrarEstudiante #txt-correo').removeClass('is-invalid');
	$('#registrarEstudiante #txt-numeroCuenta').removeClass('is-invalid');
	$('#registrarEstudiante #pass_estudiante').removeClass('is-invalid');
	$('#registrarEstudiante #txt-campus').removeClass('is-invalid');
	$('#registrarEstudiante #select-carreras').removeClass('is-invalid');

	$('#registrarEstudiante #txt-nombre_estudiante').val("");
	$('#registrarEstudiante #txt-apellido_estudiante').val("");
	$('#registrarEstudiante #txt-identificacion').val("");
	$('#registrarEstudiante #txt-fecha_nacimiento').val("");
	$('#registrarEstudiante #txt-lugar_nacimiento').val();
	$('#registrarEstudiante #txt-lugar_residencia').val();
	$('#registrarEstudiante #txt-municipio_nacimiento').val();
	$('#registrarEstudiante #txt-municipio_residencia').val();
	$('#registrarEstudiante #txt-direccion').val("");
	$('#registrarEstudiante #txt-telefono').val("");
	$('#registrarEstudiante #txt-correo').val("");
	$('#registrarEstudiante #txt-numeroCuenta').val("");
	$('#registrarEstudiante #pass_estudiante').val("");

	$('#datospersonales').addClass('active');
	$('#datos_estudiantes').removeClass('active');
	$('#tab-1').removeClass('disabled').addClass('active');
	$('#tab-2').removeClass('active').addClass('disabled');
	
	$('#btn-continuarEstudiante').html('Continuar')
	$('#registrarEstudiante #btn-guardarEstudiante').html("Registrar Estudiante");
    $('#registrarEstudiante').modal('hide');
}

function validarFechaNac(){
	var estado=0;
	estado=estado+validarCamposVacios('#txt-fecha_nacimiento');
	estado=estado+validarFecha('#txt-fecha_nacimiento');
	return estado;
}

function validarLugNac(){
	var estado=0;
	estado=estado+validarSelect('#txt-lugar_nacimiento');
	return estado;
}

function validarMunNac(){
	var estado=0;
	estado=estado+validarSelect('#txt-municipio_nacimiento');
	return estado;
}

function validarLugRes(){
	var estado=0;
	estado=estado+validarSelect('#txt-lugar_residencia');
	return estado;
}

function validarMunRes(){
	var estado=0;
	estado=estado+validarSelect('#txt-municipio_residencia');
	return estado;
}

function validarDireccion(){
	var estado=0;
	estado=estado+validarCamposVacios('#txt-direccion');
	estado=estado+validarTamañoDireccion('#txt-direccion');
	return estado;
}

function validarTelefono(){
	var estado=0;
	estado=estado+validarCamposVacios('#txt-telefono');
	estado=estado+validarPhone('#txt-telefono');
	return estado;
}

function validarCorreo(){
	var estado=0;
	estado=estado+validarCamposVacios('#txt-correo');
	estado=estado+validarEmails('#txt-correo');
	return estado;
}

function validarCuentaEstudiante(){
	var estado=0;
	estado=estado+validarCamposVacios('#txt-numeroCuenta');
	estado=estado+validarTamañoEstudiante('#txt-numeroCuenta');
	estado=estado+validarPatronCuenta('#txt-numeroCuenta');
	return estado;
}

function ValidarNumeroEmpleado(){
	var estado=0;
	estado=estado+validarCamposVacios('#txt-numeroEmpleado');
	estado=estado+validarTamañoEstudiante('#txt-numeroEmpleado');
	estado=estado+validarPatronCuenta('#txt-numeroEmpleado');
	return estado;
}

function validarCampus(){
	var estado=0;
	estado=estado+validarSelect('#txt-campus');
	return estado;
}

function validarPassEstudiante(){
	var estado=0
	estado=estado+validarCamposVacios('#pass_estudiante');
	estado=estado+validarContraseña('#pass_estudiante');
	return estado;
}

function ValidarClave(){
	var estado=0
	estado=estado+validarCamposVacios('#clave_empleado');
	estado=estado+validarContraseña('#clave_empleado');
	return estado;
}

function validarContraseñas(){
	var estado=0
	estado=estado+contraseñasIguales('#re_pass_estudiante');
	return estado;
}

function ValidarClaves(){
	var estado=0
	estado=estado+clavesIguales('#re_clave_empleado');
	return estado;
}

function contraseñasIguales(id){
	if($('#pass_estudiante').val()!=0){
		if(!($('#pass_estudiante').val() == $(id).val())){
			$(id).removeClass('is-valid');
			$(id).addClass('is-invalid');
			return 1;
		}else{
			$(id).removeClass('is-invalid');
			$(id).addClass('is-valid');
			return 0;
		}
	}else{
		$(id).removeClass('is-valid');
			$(id).addClass('is-invalid');
			return 1;
	}	
}

function clavesIguales(id){
	if($('#clave_empleado').val()!=0){
		if(!($('#clave_empleado').val() == $(id).val())){
			$(id).removeClass('is-valid');
			$(id).addClass('is-invalid');
			return 1;
		}else{
			$(id).removeClass('is-invalid');
			$(id).addClass('is-valid');
			return 0;
		}
	}else{
		$(id).removeClass('is-valid');
			$(id).addClass('is-invalid');
			return 1;
	}	
}


function validarCamposVacios(id){
	if($(id).val().length==0){
		$(id).removeClass('is-valid');
		$(id).addClass('is-invalid');
		return 1;
	}else{
		$(id).removeClass('is-invalid');
		$(id).addClass('is-valid');
		return 0;
	}
}

function validarSelect(id){
	if($(id).val()==0){
		$(id).removeClass('is-valid');
		$(id).addClass('is-invalid');
		return 1;
	}else{
		$(id).removeClass('is-invalid');
		$(id).addClass('is-valid');
		return 0;
	}
}

function validarPatron(id){
	if($(id).val().length>0){
		if(!/^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/.test(String($(id).val()))){
			$(id).removeClass('is-valid');
			$(id).addClass('is-invalid');
			return 1;
		}else{
			$(id).removeClass('is-invalid');
			$(id).addClass('is-valid');
			return 0;
		}
	}else{
		return 1;	
	}		
} 

function validarPatronCuenta(id){
	if(($(id).val().length>0)){
		if(!/^([0-9])*$/.test(String($(id).val()))){
			$(id).removeClass('is-valid');
			$(id).addClass('is-invalid');
			return 1;
		}else{
			$(id).removeClass('is-invalid');
			$(id).addClass('is-valid');
			return 0;
		
		}
	}else{
		return 1;
	}
} 

function validarTamañoEstudiante(id){
	if($(id).val().length==11){
		$(id).removeClass('is-invalid');
		$(id).addClass('is-valid');
		return 0;
	}else{
		$(id).removeClass('is-valid');
		$(id).addClass('is-invalid');
		return 1;
	}
}

function validarIdentidadHND(id){
	if($(id).val().length>0){
		if(!/^\d{4}-\d{4}-\d{5}$/.test(String($(id).val()))){
			$(id).removeClass('is-valid');
			$(id).addClass('is-invalid');
			return 1;
		}else{
			$(id).removeClass('is-invalid');
			$(id).addClass('is-valid');
			return 0;
		}
	}else{
		return 1;
	}	
}

function validarFecha(id){
	var valor=$(id).val().split("-")[0];
	var año=parseInt(valor);
	var añoActual = parseInt((new Date).getFullYear());
	var añoMenor = parseInt((new Date).getFullYear()-16);
	var añoLimite=parseInt('1900');
	if($(id).val().length>0){
		if(año<=añoLimite || año>=añoMenor){
			$(id).removeClass('is-valid');
			$(id).addClass('is-invalid');
			return 1;
		}else{
			$(id).removeClass('is-invalid');
			$(id).addClass('is-valid');
			return 0;
		}
	}else{
		return 1;
	}
}

function validarPhone(id){
	if($(id).val().length>0){
		if(!/^\d{4}-\d{4}$/.test(String($(id).val()))){
			$(id).removeClass('is-valid');
			$(id).addClass('is-invalid');
			return 1;
		}else{
			$(id).removeClass('is-invalid');
			$(id).addClass('is-valid');
			return 0;
		}
	}else{
		return 1;
	}	
}

function validarEmails(id){
	if($(id).val().length>0){
		if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(String($(id).val()))){
			$(id).removeClass('is-valid');
			$(id).addClass('is-invalid');
			return 1;
		}else{
			$(id).removeClass('is-invalid');
			$(id).addClass('is-valid');
			return 0;
		}
	}else{
		return 1;	
	}
		
}

function validarTamañoDireccion(id){
	if($(id).val().length<10){
		$(id).removeClass('is-valid');
		$(id).addClass('is-invalid');
		return 1;
	}else{
		$(id).removeClass('is-invalid');
		$(id).addClass('is-valid');
		return 0;
	}
}

function validarContraseña(id){
	if($(id).val().length<=6){
		$(id).removeClass('is-valid');
		$(id).addClass('is-invalid');
		return 1;
	}else{
		$(id).removeClass('is-invalid');
		$(id).addClass('is-valid');
		return 0;
	}
}

