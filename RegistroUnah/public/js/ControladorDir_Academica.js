$(document).ready(function(){
    $('#Seccion b').html('Direccion Academica');
    $('#NavbarPrincipal #MenuBar').removeClass('d-none');
    $.ajax({
        url:'/GA/facultades',
        method:'GET',
        success:function(respuesta){
            for(var i=0;i<respuesta.length;i++){
                var numero=i+1;
                $('#table-facultades tbody').append('<tr><td>'+numero+'</td>'+
                                                    '<td>'+respuesta[i].nombre_facultad+'</td>'+
                                                    '<td>'+respuesta[i].descripcion+'</td></tr>');
                $('#registrarCarrera #select-facultad').append('<option value="'+respuesta[i].codigo_facultad+'">'+respuesta[i].nombre_facultad+'</option>');
            }
            numero=0;
        }
    });

    $.ajax({
        url:'/GA/periodos',
        method:'GET',
        success:function(respuesta){
            for(var i=0;i<respuesta.length;i++){
                var numero=i+1;
                $('#tbl-periodos tbody').append('<tr><td>'+numero+'</td>'+
                                                '<td>'+respuesta[i].nombre_periodo+'</td>'+
                                                '<td>'+respuesta[i].fecha_inicio+'</td>'+
                                                '<td>'+respuesta[i].fecha_fin+'</td>'+
                                                '<td>'+respuesta[i].tipo_periodo+'</td></tr>');
            }
        }
    });
    $.ajax({
        url:'/GA/tiposPeriodos',
        method:'GET',
        success:function(respuesta){
            for(var i=0;i<respuesta.length;i++){
                $('#registrarPeriodo #select-tipoPeriodo').append('<option value="'+respuesta[i].codigo_tipo_periodo+'">'+respuesta[i].tipo_periodo+'</option>');
            }
        }
    });

    $.ajax({
        url:'/GA/grados',
        method:'GET',
        success:function(respuesta){
            for(var i=0;i<respuesta.length;i++){
                $('#registrarCarrera #select-grado').append('<option value="'+respuesta[i].codigo_grado+'">'+respuesta[i].nombre_grado+'</option>');
            }
        }
    });

    $.ajax({
        url:'/GA/tipos_asignaturas',
        method:'GET',
        success:function(respuesta){
            for(var i=0;i<respuesta.length;i++){
                $('#registrarAsignatura #select-tipoAsignatura').append('<option value="'+respuesta[i].codigo_tipo_asignatura+'">'+respuesta[i].tipo_asignatura+'</option>');
            }
        }
    });

    $.ajax({
        url:'/GA/asignaturas',
        method:'GET',
        success:function(respuesta){
            var numero=0;
            for(var i=0;i<respuesta.length;i++){
                    numero=i+1;
                    var asignatura="";
                    asignatura='<tr><td>'+numero+'</td>'+
                    '<td>'+respuesta[i].codigo_alterno+'</td>'+
                    '<td>'+respuesta[i].nombre_asignatura+'</td>'+
                    '<td>'+respuesta[i].cantidad_unidades_valorativas+'</td>'+
                    '<td>'+respuesta[i].nombre_carrera+'</td>'+
                    '<td>'+respuesta[i].dias+'</td>'+
                    '<td>'+respuesta[i].tipo_asignatura+'</td></tr>';
                    $('#tbl-asignatura tbody').append(asignatura);
                    $('#agregarAsignatura #select-asignaturaPlan').append('<option value="'+respuesta[i].codigo_asignatura+'">'+respuesta[i].nombre_asignatura+'</option>');
            }
        }
    });
    
    $.ajax({
        url:'/GA/carreras',
        method:'GET',
        success:function(respuesta){
            for(var i=0;i<respuesta.length;i++){
                var numero=i+1;
                $('#tbl-carreras tbody').append('<tr><td>'+numero+'</td>'+
                '<td>'+respuesta[i].nombre_carrera+'</td>'+
                '<td>'+respuesta[i].cantidad_asignaturas+'</td>'+
                '<td>'+respuesta[i].cantidad_unidades_valorativas+'</td>'+
                '<td>'+respuesta[i].nombre_facultad+'</td>'+
                '<td>'+respuesta[i].nombre_grado+'</td>'+
                '<td><button class="btn btn-primary" onclick="mostrarPlanEstudios('+respuesta[i].codigo_carrera+')">Plan de Estudios</button></td></tr>');

                $('#registrarAsignatura #select-carrera').append('<option value="'+respuesta[i].codigo_carrera+'">'+respuesta[i].nombre_carrera+'</option>');
            }
            numero=0;
        }
    });
});



function removerValidacionesFacultad(){
    $('#txt-nombreFacultad').val("");
    $('#txt-descripcionFacultad').val("");
    $('#txt-nombreFacultad').removeClass('is-valid');
    $('#txt-nombreFacultad').removeClass('is-invalid');
    $('#btn_registrarFacultad').html("Registrar");
    $('#registrarFacultad').modal('hide');
}


function guardarFacultad(){
    if(ValidarFacultad()==0){
        $('#btn_registrarFacultad').html(' <i class="fa fa-spinner fa-spin" style="font-size:20px"></i> Registrando...');
        var parametros=
        "facultad="+$('#txt-nombreFacultad').val()+"&"+
        "descripcion="+$('#txt-descripcionFacultad').val();
        setTimeout(
            $.ajax({
                url:'/GA/agregar_Facultad',
                method:'POST',
                data:parametros,
                success:function(respuesta){
                    var numero=$('#table-facultades tbody tr').length;
                    numero=numero+1;
                    $('#table-facultades tbody').append('<tr><td>'+numero+'</td>'+
                                                        '<td>'+respuesta[0].nombre_facultad+'</td>'+
                                                        '<td>'+respuesta[0].descripcion+'</td></tr>');
                    removerValidacionesFacultad()                                 
                }
            })
        ,2000);
    }
}

function ValidarFacultad(){
    var estado=0;
    estado=estado+validarCamposVacios('#txt-nombreFacultad');
    return estado;
}

function guardarCarrera(){
    if(ValidarCarrera()==0){
        $('#btn_registrarCarrera').html(' <i class="fa fa-spinner fa-spin" style="font-size:20px"></i> Registrando...');
        var parametros=
        "codigo="+$('#txt-codigoAuxiliar').val()+"&"+
        "nombre="+$('#txt-nombreCarrera').val()+"&"+
        "asignaturas="+$('#txt-cantAsignatura').val()+"&"+
        "uv="+$('#txt-uv').val()+"&"+
        "facultad="+$('#select-facultad').val()+"&"+
        "grado="+$('#select-grado').val();
            $.ajax({
                url:'/GA/agregar_Carrera',
                method:'POST',
                data:parametros,
                success:function(respuesta){
                    var numero=$('#table-carreras tbody tr').length;
                    numero=numero+1;
                    $('#tbl-carreras tbody').append('<tr><td>'+numero+'</td>'+
                    '<td>'+respuesta[0].nombre_carrera+'</td>'+
                    '<td>'+respuesta[0].cantidad_asignaturas+'</td>'+
                    '<td>'+respuesta[0].cantidad_unidades_valorativas+'</td>'+
                    '<td>'+respuesta[i].nombre_grado+'</td>'+
                    '<td><button class="btn btn-primary" onclick="mostrarPlanEstudios('+respuesta[i].codigo_carrera+')">Plan de Estudios</button></td></tr>');
                    removerValidacionesCarrera()                                 
                }
            });
    }
}

function ValidarCarrera(){
    var estado=0;
    estado=estado+validarCamposVacios('#registrarCarrera #txt-codigoAuxiliar');
    estado=estado+validarCamposVacios('#registrarCarrera #txt-nombreCarrera');
    estado=estado+validarSelect('#registrarCarrera #select-facultad');
    estado=estado+validarCamposVacios('#registrarCarrera #txt-cantAsignatura');
    estado=estado+validarCamposVacios('#registrarCarrera #txt-uv');
    estado=estado+validarSelect('#registrarCarrera #select-grado');
    return estado;
}

function removerValidacionesCarrera(){
    $('#registrarCarrera #txt-codigoAuxiliar').removeClass('is-valid');
    $('#registrarCarrera #txt-codigoAuxiliar').removeClass('is-invalid');
    $('#registrarCarrera #txt-codigoAuxiliar').val("");
    $('#registrarCarrera #txt-nombreCarrera').removeClass('is-valid');
    $('#registrarCarrera #txt-nombreCarrera').removeClass('is-invalid');
    $('#registrarCarrera #txt-nombreCarrera').val("");
    $('#registrarCarrera #select-facultad').removeClass('is-valid');
    $('#registrarCarrera #select-facultad').removeClass('is-invalid');
    $('#registrarCarrera #select-facultad').val();
    $('#registrarCarrera #txt-cantAsignatura').removeClass('is-valid');
    $('#registrarCarrera #txt-cantAsignatura').removeClass('is-invalid');
    $('#registrarCarrera #txt-cantAsignatura').val("");
    $('#registrarCarrera #txt-uv').removeClass('is-valid');
    $('#registrarCarrera #txt-uv').removeClass('is-invalid');
    $('#registrarCarrera #txt-uv').val("");
    $('#registrarCarrera #select-grado').removeClass('is-valid');
    $('#registrarCarrera #select-grado').removeClass('is-invalid');
    $('#registrarCarrera #select-grado').val();
    $('#btn_registrarCarrera').html("Registrar");
    $('#registrarCarrera').modal('hide');
}

function guardarAsignatura(){

    if(ValidarAsignatura()==0){
        $('#btn_registrarAsignatura').html(' <i class="fa fa-spinner fa-spin" style="font-size:20px"></i> Registrando...');
        var parametros=
            "codigo="+$('#txt-codigoAsignatura').val()+"&"+
            "nombre="+$('#txt-nombreAsignatura').val()+"&"+
            "carrera="+$('#select-carrera').val()+"&"+
            "uv="+$('#txt-uvAsignatura').val()+"&"+
            "dias="+$('#select-diasSemana').val()+"&"+
            "tipo="+$('#select-tipoAsignatura').val();
            $.ajax({
                url:'/GA/agregar_Asignatura',
                method:'POST',
                data:parametros,
                success:function(respuesta){
                    var numero=$('#tbl-asignatura tbody tr').length;
                    numero=numero+1;
                    var asignatura="";
                    asignatura='<tr><td>'+numero+'</td>'+
                    '<td>'+respuesta[0].codigo_alterno+'</td>'+
                    '<td>'+respuesta[0].nombre_asignatura+'</td>'+
                    '<td>'+respuesta[0].cantidad_unidades_valorativas+'</td>'+
                    '<td>'+respuesta[0].nombre_carrera+'</td>'+
                    '<td>'+respuesta[0].dias+'</td>'+
                    '<td>'+respuesta[0].tipo_asignatura+'</td><tr/>';
                    $('#tbl-asignatura tbody').append(asignatura);
                    removerValidacionesAsignatura()                                 
                }
            });
    }
}

function ValidarAsignatura(){
    var estado=0;
    estado=estado+validarCamposVacios('#txt-codigoAsignatura');
    estado=estado+validarCamposVacios('#txt-nombreAsignatura');
    estado=estado+validarCamposVacios('#txt-uvAsignatura');
    estado=estado+validarSelect('#select-carrera');
    estado=estado+validarSelect('#select-diasSemana');
    estado=estado+validarSelect('#select-tipoAsignatura');
    estado=estado+validarSelect('#select-requisitoAsignatura');
    return estado;
}

function removerValidacionesAsignatura(){
    $('#registrarAsignatura #txt-codigoAsignatura').removeClass('is-valid');
    $('#registrarAsignatura #txt-codigoAsignatura').removeClass('is-invalid');
    $('#registrarAsignatura #txt-codigoAsignatura').val("");
    $('#registrarAsignatura #txt-nombreAsignatura').removeClass('is-valid');
    $('#registrarAsignatura #txt-nombreAsignatura').removeClass('is-invalid');
    $('#registrarAsignatura #txt-nombreAsignatura').val("");
    $('#registrarAsignatura #txt-uvAsignatura').removeClass('is-valid');
    $('#registrarAsignatura #txt-uvAsignatura').removeClass('is-invalid');
    $('#registrarAsignatura #txt-uvAsignatura').val("");
    $('#registrarAsignatura #select-carrera').removeClass('is-valid');
    $('#registrarAsignatura #select-carrera').removeClass('is-invalid');
    $('#registrarAsignatura #select-carrera').val(0);
    $('#registrarAsignatura #select-diasSemana').removeClass('is-valid');
    $('#registrarAsignatura #select-diasSemana').removeClass('is-invalid');
    $('#registrarAsignatura #select-diasSemana').val("");
    $('#registrarAsignatura #select-tipoAsignatura').removeClass('is-valid');
    $('#registrarAsignatura #select-tipoAsignatura').removeClass('is-invalid');
    $('#registrarAsignatura #select-tipoAsignatura').val(0);
    $('#registrarAsignatura #select-requisitoAsignatura').removeClass('is-valid');
    $('#registrarAsignatura #select-requisitoAsignatura').removeClass('is-invalid');
    $('#registrarAsignatura #select-requisitoAsignatura').val();
    $('#btn_registrarAsignatura').html("Registrar Asignatura");
    $('#registrarAsignatura').modal('hide');
}

function guardarPeriodo(){

    if(ValidarPeriodo()==0){
        $('#btn_registrarPeriodo').html(' <i class="fa fa-spinner fa-spin" style="font-size:20px"></i> Registrando...');
    
        var parametros=
            "nombre="+$('#txt-nombrePeriodo').val()+"&"+
            "inicio="+$('#txt-inicioPeriodo').val()+"&"+
            "final="+$('#txt-finalPeriodo').val()+"&"+
            "tipo="+$('#select-tipoPeriodo').val();
            $.ajax({
                url:'/GA/agregarPeriodo',
                method:'POST',
                data:parametros,
                success:function(respuesta){
                    var numero=$('#tbl-periodos tbody tr').length;
                    numero=numero+1;
                    $('#tbl-periodos tbody').append('<tr><td>'+numero+'</td>'+
                                                '<td>'+respuesta[0].nombre_periodo+'</td>'+
                                                '<td>'+respuesta[0].fecha_inicio+'</td>'+
                                                '<td>'+respuesta[0].fecha_fin+'</td>'+
                                                '<td>'+respuesta[0].tipo_periodo+'</td></tr>');
                    removerValidacionesPeriodo();                             
                }
            });
    }
}

function ValidarPeriodo(){
    var estado=0;
    estado=estado+validarCamposVacios('#txt-nombrePeriodo');
    estado=estado+validarCamposVacios('#txt-inicioPeriodo');
    estado=estado+validarCamposVacios('#txt-finalPeriodo');
    estado=estado+validarSelect('#select-tipoPeriodo');
    return estado;
}

function removerValidacionesPeriodo(){
    $('#txt-nombrePeriodo').removeClass('is-invalid');
    $('#txt-nombrePeriodo').removeClass('is-valid');
    $('#txt-nombrePeriodo').val("");
    $('#txt-inicioPeriodo').removeClass('is-invalid');
    $('#txt-inicioPeriodo').removeClass('is-valid');
    $('#txt-inicioPeriodo').val("");
    $('#txt-finalPeriodo').removeClass('is-invalid');
    $('#txt-finalPeriodo').removeClass('is-valid');
    $('#txt-finalPeriodo').val("");
    $('#select-tipoPeriodo').removeClass('is-invalid');
    $('#select-tipoPeriodo').removeClass('is-valid');
    $('#select-tipoPeriodo').val(0);
    $('#btn_registrarPeriodo').html('Registrar Periodo');
    $('#registrarPeriodo').modal('hide');
}

function mostrarPlanEstudios(id){
    $.ajax({
        url:'/GA/planEstudio',
        method:'POST',
        data:'carrera='+id,
        success:function(respuesta){ 
            console.log(respuesta);
            var carrera="";
            for(var i=0;i<respuesta.length;i++){
                numero=i+1;
                    var asignatura="";
                    carrera=respuesta[0].nombre_carrera;
                    asignatura+='<tr><td>'+numero+'</td>'+
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
                    asignatura+='</td></tr>'
                    $('#tbl-planEstudio tbody').append(asignatura);
                    $('#agregarAsignatura #select-requisitoAsignatura').append('<option value="'+respuesta[i].codigo_asignatura+'">'+respuesta[i].nombre_asignatura+'</option>');
            }
            $('#title').html('Plan de estudios '+carrera);
            $('#tbl-carreras').hide();
            $('#btn-registrar').hide();
            $('#tbl-planEstudio').removeClass('d-none');
            $('#btn-agregar').removeClass('d-none');
            $('#agregarAsignatura .modal-footer div').append('<button id="#btn_agregar_AsignaturaPlan" class="btn btn-primary" onclick="agregar_AsignaturaPlan('+id+')" type="button">Registrar Carrera</button>')
        }
    });
}

function agregar_AsignaturaPlan(carrera){
    if(ValidarPlan()==0){
        if($('#select-requisitoAsignatura').val()!='Ninguno'){
            var parametros=
            "asignatura="+$('#select-asignaturaPlan').val()+"&"+
            "carrera="+carrera+"&"+
            "requisitos="+$('#select-requisitoAsignatura').val();
        }else{
            var parametros=
            "asignatura="+$('#select-asignaturaPlan').val()+"&"+
            "carrera="+carrera+"&"+
            "requisitos=";
        }
        console.log(parametros);
        $.ajax({
            url:'/GA/agregarAsig_PlanEstudio',
            method:'POST',
            data:parametros,
            success:function(respuesta){ 
                console.log(respuesta);
                        var numero=$('#tbl-planEstudio tbody tr').length;
                        var asignatura="";
                        asignatura+='<tr><td>'+numero+'</td>'+
                        '<td>'+respuesta[0].codigo_alterno+'</td>'+
                        '<td>'+respuesta[0].nombre_asignatura+'</td>'+
                        '<td>'+respuesta[0].cantidad_unidades_valorativas+'</td>'+
                        '<td>'+respuesta[0].nombre_carrera+'</td>'+
                        '<td>'+respuesta[0].dias+'</td>'+
                        '<td>'+respuesta[0].tipo_asignatura+'</td><td>';
                        if(respuesta[0].requisitos.length>0){
                            for(var j=0;j<respuesta[0].requisitos.length;j++){
                                asignatura+=respuesta[0].requisitos[j].nombre_asignatura+'<br>';
                            }
                        }else{
                            asignatura+='Ninguno';
                        }
                        asignatura+='</td></tr>'
                        $('#tbl-planEstudio tbody').append(asignatura);
                        $('#agregarAsignatura #select-requisitoAsignatura').append('<option value="'+respuesta[0].codigo_asignatura+'">'+respuesta[0].nombre_asignatura+'</option>');
                        removerValidacionesPlan();
                    }
        });
    }
}

function ValidarPlan(){
    var estado=0;
    estado=estado+validarSelect('#select-asignaturaPlan');
    estado=estado+validarSelect('#select-requisitoAsignatura');
    return estado;
}

function removerValidacionesPlan(){
    $('#select-asignaturaPlan').removeClass('is-invalid');
    $('#select-asignaturaPlan').removeClass('is-valid');
    $('#select-asignaturaPlan').val(0);
    $('#select-requisitoAsignatura').removeClass('is-invalid');
    $('#select-requisitoAsignatura').removeClass('is-valid');
    $('#select-requisitoAsignatura').val(0)
    $('#agregarAsignatura').modal('hide');
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