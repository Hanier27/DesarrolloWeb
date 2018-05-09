$(document).ready(function(){
    $('#Seccion b').html('Jefe de Departamento');
    $('#NavbarPrincipal #MenuBar').removeClass('d-none');
    $.ajax({
        url:'/JD/obtenerDatos',
        method:'GET', 
        success:function(respuesta){
            $('#carrera').html('<b>'+respuesta[0].nombre_carrera+'-'+respuesta[0].nombre_campus+'</b>');
            $('#Titulo').html('<b>Estudiantes de '+respuesta[0].nombre_carrera+'-'+respuesta[0].nombre_campus+'</b>');
            $('#TituloDocentes').html('<b>Docentes de '+respuesta[0].nombre_carrera+'-'+respuesta[0].nombre_campus+'</b>');
            $('#TituloAsignatura').html('<b>Asignaturas de '+respuesta[0].nombre_carrera+'-'+respuesta[0].nombre_campus+'</b>');
        }
    });

    $.ajax({
        url:'/JD/periodos',
        method:'GET', 
        success:function(respuesta){
            for(var i=0;i<respuesta.length;i++){
                $('#registrarSeccion #select-peridoSeccion').append('<option value="'+respuesta[i].codigo_periodo+'">'+respuesta[0].nombre_periodo+'</option>');
            }
        }
    });

    $.ajax({
        url:'/JD/secciones',
        method:'GET', 
        success:function(respuesta){
            for(var i=0;i<respuesta.length;i++){
				var contenido="";
                var numero=i+1;
				contenido=contenido+'<tr><td>'+numero+'</td>'+
                    '<td>'+respuesta[i].codigo_alterno+'</td>'+
                    '<td>'+respuesta[i].hora_inicio+'</td>'+
                    '<td>'+respuesta[i].hora_fin+'</td>'+
                    '<td>'+respuesta[i].nombre_asignatura+'</td>'+
                    '<td>'+respuesta[i].nombre+' '+respuesta[i].apellido+'</td>'+
					'<td>'+respuesta[i].nombre_edificio+'-'+respuesta[i].nombre_aula+'</td>'+
                    '<td>'+respuesta[i].dias +'</td>'+
                    '<td>'+respuesta[i].nombre_periodo +'</td>'+
					'<td>'+respuesta[i].cantidad_cupos+'</td></tr>';
					$('#tbl-secciones tbody').append(contenido);
            }
        }
    });
    
    $.ajax({
        url:'/JD/asignaturas',
        method:'GET', 
        success:function(respuesta){
            for(var i=0;i<respuesta.length;i++){
                var numero=i+1;
                    var asignatura="";
                    asignatura='<tr><td>'+numero+'</td>'+
                    '<td>'+respuesta[i].codigo_alterno+'</td>'+
                    '<td>'+respuesta[i].nombre_asignatura+'</td>'+
                    '<td>'+respuesta[i].cantidad_unidades_valorativas+'</td>'+
                    '<td>'+respuesta[i].nombre_carrera+'</td>'+
                    '<td>'+respuesta[i].dias+'</td>'+
                    '<td>'+respuesta[i].tipo_asignatura+'</td><td>';
                    if(respuesta[i].requisitos.length>0){
                        for(var j=0;j<respuesta[i].requisitos.length;j++){
                            asignatura+=respuesta[i].requisitos[j].nombre_asignatura+'<br>';
                        }
                    }else{
                        asignatura+='Ninguno';
                    }
                    asignatura+='</td></tr>';
                    $('#tbl-asignaturaFacultad tbody').append(asignatura);
                
                    $('#registrarSeccion #select-asignaturaSeccion').append('<option value="'+respuesta[i].codigo_asignatura+'">'+respuesta[i].nombre_asignatura+'</option>');
            
               }
        }
    });
    $.ajax({
            url:'/JD/aulas',
            method:'GET',
            success:function(respuesta){
                for(var i=0;i<respuesta.length;i++){
                    $('#registrarSeccion #select-aulaSeccion').append('<option value="'+respuesta[i].codigo_aula+'">'+respuesta[0].nombre_edificio+'-'+respuesta[0].nombre_aula+'</option>');
                }
            }
        });
    $.ajax({
        url:'/JD/estudiantes',
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
                    '<td>'+respuesta[i].nombre_campus +'</td>'+
					'<td>'+respuesta[i].promedio+'</td></tr>';
					$('#tbl-estudiantesXFacultad tbody').append(contenido);
            }
        }
    }); 
    $.ajax({
        url:'/JD/docentes',
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
					'<td>'+respuesta[i].nombre_titularidad+'</td>'+
					'<td>'+respuesta[i].descripcion+'</td>'+
					'<td>'+respuesta[i].salario_minimo+'</td></tr>';
                    $('#tbl-docentesFacultad').append(contenido);
                    $('#registrarSeccion #select-docenteSeccion').append('<option value="'+respuesta[i].codigo_empleado+'">'+respuesta[i].nombre+" "+respuesta[i].apellido+'</option>');
			}
        }
    });   
});

function guardarSeccion(){
    if(ValidarSeccion()==0){
        $('#btn_registrarSeccion').html(' <i class="fa fa-spinner fa-spin" style="font-size:20px"></i> Registrando...');
        var Selectdias=$('#select-diasSemanaSeccion').val();
        var Dias="";
        for(var i=0;i<Selectdias.length;i++){
            var Dias=Dias+Selectdias[i];
        }
        var parametros=
        "codigo="+$('#txt-codigoSeccion').val()+"&"+
        "inicio="+$('#txt-horaInicialSeccion').val()+"&"+
        "fin="+$('#txt-horaFinalSeccion').val()+"&"+
        "dias="+Dias+"&"+
        "cupos="+$('#txt-cuposSeccion').val()+"&"+
        "aula="+$('#select-aulaSeccion').val()+"&"+
        "periodo="+$('#select-peridoSeccion').val()+"&"+
        "maestro="+$('#select-docenteSeccion').val()+"&"+
        "asignatura="+$('#select-asignaturaSeccion').val();
        console.log(parametros);
        $.ajax({
            url:'/JD/agregarSeccion',
            method:'POST',
            data:parametros,
            success:function(respuesta){
                console.log(respuesta);
                var contenido="";
                var numero=$('#tbl-secciones tbody tr').length;
                numero=numero+1;
				contenido=contenido+'<tr><td>'+numero+'</td>'+
                    '<td>'+respuesta[0].codigo_alterno+'</td>'+
                    '<td>'+respuesta[0].hora_inicio+'</td>'+
                    '<td>'+respuesta[0].hora_fin+'</td>'+
                    '<td>'+respuesta[0].nombre_asignatura+'</td>'+
                    '<td>'+respuesta[0].nombre+' '+respuesta[0].apellido+'</td>'+
					'<td>'+respuesta[0].nombre_edificio+'-'+respuesta[0].nombre_aula+'</td>'+
                    '<td>'+respuesta[0].dias +'</td>'+
                    '<td>'+respuesta[0].nombre_periodo +'</td>'+
					'<td>'+respuesta[0].cantidad_cupos+'</td></tr>';
					$('#tbl-secciones tbody').append(contenido);
                    removerValidacionesSecciones();                              
            }
        });
    }
}

function ValidarSeccion(){
    var estado=0;
    estado=estado+validarCamposVacios('#txt-codigoSeccion');
    estado=estado+validarCamposVacios('#txt-horaInicialSeccion');
    estado=estado+validarCamposVacios('#txt-horaFinalSeccion');
    estado=estado+validarCamposVacios('#txt-cuposSeccion');
    estado=estado+validarSelect('#select-aulaSeccion')
    estado=estado+validarSelect('#select-diasSemanaSeccion');
    estado=estado+validarSelect('#select-peridoSeccion');
    estado=estado+validarSelect('#select-asignaturaSeccion');
    estado=estado+validarSelect('#select-docenteSeccion');
    return estado;
}

function removerValidacionesSecciones(){
    $('#txt-codigoSeccion').removeClass('is-invalid');
    $('#txt-codigoSeccion').removeClass('is-valid');
    $('#txt-codigoSeccion').val("");
    $('#txt-horaInicialSeccion').removeClass('is-invalid');
    $('#txt-horaInicialSeccion').removeClass('is-valid');
    $('#txt-horaInicialSeccion').val("");
    $('#txt-horaFinalSeccion').removeClass('is-invalid');
    $('#txt-horaFinalSeccion').removeClass('is-valid');
    $('#txt-horaFinalSeccion').val("");
    $('#txt-cuposSeccion').removeClass('is-invalid');
    $('#txt-cuposSeccion').removeClass('is-valid');
    $('#txt-cuposSeccion').val("");
    $('#select-aulaSeccion').removeClass('is-invalid');
    $('#select-aulaSeccion').removeClass('is-valid');
    $('#select-aulaSeccion').val();
    $('#select-diasSemanaSeccion').removeClass('is-invalid');
    $('#select-diasSemanaSeccion').removeClass('is-valid');
    $('#select-diasSemanaSeccion').val();
    $('#select-peridoSeccion').removeClass('is-invalid');
    $('#select-peridoSeccion').removeClass('is-valid');
    $('#select-peridoSeccion').val();
    $('#select-asignaturaSeccion').removeClass('is-invalid');
    $('#select-asignaturaSeccion').removeClass('is-valid');
    $('#select-asignaturaSeccion').val();
    $('#select-docenteSeccion').removeClass('is-invalid');
    $('#select-docenteSeccion').removeClass('is-valid');
    $('#select-docenteSeccion').val();
    $('#btn_registrarSeccion').html('Registrar Seccion');
    $('#registrarSeccion').modal('hide'); 
}  


function validarCamposVacios(id){
    if($(id).val()==""){
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

