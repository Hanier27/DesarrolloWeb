$(document).ready(function(){
    var pathname = window.location.pathname;
    if(pathname=="/Login_jefeDepartamento"){
        $('#Boton-Login').html('<button id="btn-loginEmpleado" type="button" onclick="login_JefeDepartamento()" class="btn btn-primary">Iniciar sesión</button>');
        $('#user_empleado').val("");  
        $('#clave_empleado').val(""); 
    }
    if(pathname=="/Login_DireccionAcademica"){
        $('#Boton-Login').html('<button id="btn-loginEmpleado" type="button" onclick="login_DireccionAcademica()" class="btn btn-primary">Iniciar sesión</button>');
        $('#user_empleado').val("");  
        $('#clave_empleado').val(""); 
    }
    if(pathname=="/Login_DIIP"){
        $('#Boton-Login').html('<button id="btn-loginEmpleado" type="button" onclick="login_DIIP()" class="btn btn-primary">Iniciar sesión</button>');
        $('#user_empleado').val("");  
        $('#clave_empleado').val(""); 
    }
    if(pathname=="/Login_Seapi"){
        $('#Boton-Login').html('<button id="btn-loginEmpleado" type="button" onclick="login_Seapi()" class="btn btn-primary">Iniciar sesión</button>');
        $('#user_empleado').val("");  
        $('#clave_empleado').val(""); 
    }
});

function login_JefeDepartamento(){
    if(Validar()==0){
        var parametros= 
        "numero="+$('#user_empleado').val()+"&"+
        "clave="+$('#clave_empleado').val();
        $.ajax({
            url:'/loginDepartamento',
            method:'POST',
            data:parametros,
            success:function(respuesta){
                if(respuesta.length==0){
                    $('#user_empleado').removeClass('is-valid');
                    $('#clave_empleado').removeClass('is-valid');
                    $('#user_empleado').addClass('is-invalid');
                    $('#clave_empleado').addClass('is-invalid');
                }else{
                    setTimeout('location.href="jefeDepartamento"',2000);
                }
            }
        });
    }
}

function login_DireccionAcademica(){
    if(Validar()==0){
        var parametros= 
        "numero="+$('#user_empleado').val()+"&"+
        "clave="+$('#clave_empleado').val();
        $.ajax({
            url:'/loginDireccionAcademica',
            method:'POST',
            data:parametros,
            success:function(respuesta){
                if(respuesta.length==0){
                    $('#user_empleado').removeClass('is-valid');
                    $('#clave_empleado').removeClass('is-valid');
                    $('#user_empleado').addClass('is-invalid');
                    $('#clave_empleado').addClass('is-invalid');
                }else{
                    setTimeout('location.href="direccionAcademica"',2000);
                }
            }
        });
    }
}

function login_DIIP(){
    if(Validar()==0){
        var parametros= 
        "numero="+$('#user_empleado').val()+"&"+
        "clave="+$('#clave_empleado').val();
        $.ajax({
            url:'/loginDIIP',
            method:'POST',
            data:parametros,
            success:function(respuesta){
                if(respuesta.length==0){
                    $('#user_empleado').removeClass('is-valid');
                    $('#clave_empleado').removeClass('is-valid');
                    $('#user_empleado').addClass('is-invalid');
                    $('#clave_empleado').addClass('is-invalid');
                }else{
                    setTimeout('location.href="administracion"',2000);
                }
            }
        });
    }
}

function login_Seapi(){
    if(Validar()==0){
        var parametros= 
        "numero="+$('#user_empleado').val()+"&"+
        "clave="+$('#clave_empleado').val();
        $.ajax({
            url:'/loginSEAPI',
            method:'POST',
            data:parametros,
            success:function(respuesta){
                if(respuesta.length==0){
                    $('#user_empleado').removeClass('is-valid');
                    $('#clave_empleado').removeClass('is-valid');
                    $('#user_empleado').addClass('is-invalid');
                    $('#clave_empleado').addClass('is-invalid');
                }else{
                    setTimeout('location.href="seapi"',2000);
                }
            }
        });
    }
}

function Validar(){
    var estado=0;
    estado+=validarCamposVacios('#user_empleado');
    estado+=validarCamposVacios('#clave_empleado');
    return estado;
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

