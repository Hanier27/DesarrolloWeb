$(document).ready(function(){
    $('#Seccion b').html('Docentes');
    $('#btn-agregarNotas').hide();
    $('#tbl-Alumnos').hide();
    $.ajax({
		url:'/Docentes/secciones',
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
                    '<td><button class="btn btn-primary" onclick="mostrarEstudiantes('+respuesta[i].codigo_seccion+')">Estudiantes</button></td></tr>';
					$('#tbl-SeccionesDocente tbody').append(contenido);
            }
        }
	});
});


function mostrarEstudiantes(id){
    $('#tbl-SeccionesDocente').hide();
    $('#btn-agregarNotas').show();
    $('#tbl-Alumnos').show();
    $.ajax({
		url:'/Docentes/estudiantes',
        method:'POST',
        data:'codigo='+id,
		success:function(respuesta){
            for(var i=0;i<respuesta.length;i++){
                var numero=i+1;
                $('#tbl-Alumnos tbody').append('<tr><td>'+numero+'</td>'+
                '<td>'+respuesta[i].numero_cuenta+'</td>'+
                '<td>'+respuesta[i].nombre+' '+respuesta[i].apellido+'</td>'+
                '<td>'+respuesta[i].correo_electronico+'</td></tr>');

                $('#modal_agregarNotas #tablaNotas tbody').append('<tr><td>'+respuesta[i].numero_cuenta+'</td>'+
                '<td>'+respuesta[i].nombre+' '+respuesta[i].apellido+'</td>'+
                '<td>'+respuesta[i].correo_electronico+'</td>'+
                '<td><input id="'+respuesta[i].numero_cuenta+'" name="nota" type="text" class="col-2 form-control"/></td></tr>');
            }
        }
    });  
}
function GuardarNotas(){
    $('#tablaNotas tr').each(function(index, element){
        var Referencia = $(element).find("td").eq(0).html();
            if(Referencia!=undefined){
                alert(Referencia+' '+$('#'+Referencia).val());
                validarCamposVacios('#'+Referencia);
            }
    });
}

function validarCamposVacios(id){
    if($(id).val()=="" || $(id).val()==undefined){
        $(id).removeClass('is-valid');
        $(id).addClass('is-invalid');
    }else{
        $(id).removeClass('is-invalid');
        $(id).addClass('is-valid');

    }
}