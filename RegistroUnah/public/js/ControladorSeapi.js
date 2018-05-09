$(document).ready(function(){
    $('#Seccion b').html('Administracion SEAPI');
    $('#NavbarPrincipal #MenuBar').removeClass('d-none');
    $.ajax({
        url:'/Seapi/Campus',
        method:'GET',
        success:function(respuesta){
            var numero=0;
            for(var i=0;i<respuesta.length;i++){
                numero=i+1;
                $('#table-campus tbody').append('<tr><td>'+numero+'</td>'+
                                                        '<td>'+respuesta[i].nombre_campus+'</td>'+
                                                        '<td>'+respuesta[i].cantidad_edificios+'</td></tr>');
                $('#registrarEdificio #select-campus').append('<option value="'+respuesta[i].codigo_campus+'">'+respuesta[i].nombre_campus+'</option>');
            }
        }
    });
    $.ajax({
        url:'/Seapi/tipos_Aulas',
        method:'GET',
        success:function(respuesta){
            for(var i=0;i<respuesta.length;i++){
                $('#select-tipoAula').append('<option value="'+respuesta[i].codigo_tipo_aula+'">'+respuesta[i].tipo_aula+'</option>');
            }
        }
    });
    $.ajax({
        url:'/Seapi/Edificios',
        method:'GET',
        success:function(respuesta){
            var numero=0;
            for(var i=0;i<respuesta.length;i++){
                numero=i+1;
                $('#table-facultades tbody').append('<tr><td>'+numero+'</td>'+
                                                    '<td>'+respuesta[i].nombre_edificio+'</td>'+
                                                    '<td>'+respuesta[i].cantidad_aulas+'</td>'+
                                                    '<td>'+respuesta[i].nombre_campus+'</td>'+'</tr>');
                $('#registrarAula #select-edificio').append('<option value="'+respuesta[i].codigo_edificio+'">'+respuesta[i].nombre_edificio+'</option>');
            }
        }
    });
    $.ajax({
        url:'/Seapi/Aulas',
        method:'GET',
        success:function(respuesta){
            var numero=0;
            for(var i=0;i<respuesta.length;i++){
                numero=i+1;
                $('#table-aulas tbody').append('<tr><td>'+numero+'</td>'+
                                                '<td>'+respuesta[i].nombre_aula+'</td>'+
                                                '<td>'+respuesta[i].tipo_aula+'</td>'+
                                                '<td>'+respuesta[i].nombre_edificio+'</td>'+
                                                '<td>'+respuesta[i].nombre_campus+'</td></tr>');
            }
        }
    });
});


function guardarCampus(){
    if(ValidarCampus()==0){
        $('#btn_registrarCampus').html(' <i class="fa fa-spinner fa-spin" style="font-size:20px"></i> Registrando...');
        var parametros=
        "campus="+$('#txt-campus').val()+"&"+
        "edificios="+$('#txt-cantEdificios').val();
            $.ajax({
                url:'/Seapi/agregar_Campus',
                method:'POST',
                data:parametros,
                success:function(respuesta){
                    var numero=$('#table-campus tbody tr').length;
                    numero=numero+1;
                    $('#table-campus tbody').append('<tr><td>'+numero+'</td>'+
                                                        '<td>'+respuesta[0].nombre_campus+'</td>'+
                                                        '<td>'+respuesta[0].cantidad_edificios+'</td></tr>');
                    removerValidacionesCampus();                                 
                }
            });
    }
}

function guardarEdificio(){
    if(ValidarEdificio()==0){
        $('#btn_registrarEdificio').html(' <i class="fa fa-spinner fa-spin" style="font-size:20px"></i> Registrando...');
        var parametros=
        "edificio="+$('#txt-edificio').val()+"&"+
        "campus="+$('#select-campus').val()+"&"+
        "aulas="+$('#txt-cantAulas').val();
        $.ajax({
            url:'/Seapi/agregar_Edificio',
            method:'POST',
            data:parametros,
            success:function(respuesta){
                var numero=$('#table-facultades tbody tr').length;
                numero=numero+1;
                $('#table-facultades tbody').append('<tr><td>'+numero+'</td>'+
                                                    '<td>'+respuesta[0].nombre_edificio+'</td>'+
                                                    '<td>'+respuesta[0].cantidad_aulas+'</td>'+
                                                    '<td>'+respuesta[0].nombre_campus+'</td>'+'</tr>');
                removerValidacionesEdificio();                                 
            }
        });
    }
}

function guardarula(){
    if(ValidarAula()==0){
        $('#btn_registrarAula').html(' <i class="fa fa-spinner fa-spin" style="font-size:20px"></i> Registrando...');
        var parametros=
        "aula="+$('#txt-numeroAula').val()+"&"+
        "tipo="+$('#select-tipoAula').val()+"&"+
        "edificio="+$('#select-edificio').val();
        console.log(parametros);
        $.ajax({
            url:'/Seapi/agregar_Aula',
            method:'POST',
            data:parametros,
            success:function(respuesta){
                var numero=$('#table-aulas tbody tr').length;
                numero=numero+1;
                $('#table-aulas tbody').append('<tr><td>'+numero+'</td>'+
                                                    '<td>'+respuesta[0].nombre_aula+'</td>'+
                                                    '<td>'+respuesta[0].tipo_aula+'</td>'+
                                                    '<td>'+respuesta[0].nombre_edificio+'</td>'+
                                                    '<td>'+respuesta[0].nombre_campus+'</td></tr>');
                removerValidacionesAula();                                 
            }
        });
    }
}

function ValidarCampus(){
    var estado=0;
    estado=estado+validarCamposVacios('#txt-campus');
    estado=estado+validarCamposVacios('#txt-cantEdificios');
    return estado;
}

function removerValidacionesCampus(){
    $('#txt-campus').removeClass('is-invalid');
    $('#txt-campus').removeClass('is-valid');
    $('#txt-campus').val("");
    $('#txt-cantEdificios').removeClass('is-invalid');
    $('#txt-cantEdificios').removeClass('is-valid');
    $('#txt-cantEdificios').val("");
    $('#btn_registrarCampus').html("Registrar Campus");
    $('#registrarCampus').modal('hide');
}

function ValidarEdificio(){
    var estado=0;
    estado=estado+validarCamposVacios('#txt-edificio');
    estado=estado+validarCamposVacios('#txt-cantAulas');
    estado=estado+validarSelect('#select-campus');
    return estado;
}

function removerValidacionesEdificio(){
    $('#txt-edificio').removeClass('is-invalid');
    $('#txt-edificio').removeClass('is-valid');
    $('#txt-edificio').val("");
    $('#txt-cantAulas').removeClass('is-invalid');
    $('#txt-cantAulas').removeClass('is-valid');
    $('#txt-cantAulas').val("");
    $('#select-campus').removeClass('is-invalid');
    $('#select-campus').removeClass('is-valid');
    $('#btn_registrarEdificio').html("Registrar Edificio");
    $('#registrarEdificio').modal('hide');
}

function ValidarAula(){
    var estado=0;
    estado=estado+validarCamposVacios('#txt-numeroAula');
    estado=estado+validarSelect('#select-tipoAula');
    estado=estado+validarSelect('#select-edificio');
    return estado;
}

function removerValidacionesAula(){
    $('#txt-numeroAula').removeClass('is-invalid');
    $('#txt-numeroAula').removeClass('is-valid');
    $('#txt-numeroAula').val("");
    $('#select-tipoAula').removeClass('is-invalid');
    $('#select-tipoAula').removeClass('is-valid');
    $('#select-edificio').removeClass('is-invalid');
    $('#select-edificio').removeClass('is-valid');
    $('#btn_registrarAula').html("Registrar Aula");
    $('#registrarAula').modal('hide');
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