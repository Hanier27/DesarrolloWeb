$('#btn-guardarNotas').click(function(){
    $('#tablaDocente tr').each(function(index, element){
        var Referencia = $(element).find("td").eq(0).html()
            if(Referencia!=undefined)
            validarCamposVacios('#'+Referencia);
    });
});

function validarCamposVacios(id){
    if($(id).val()=="" || $(id).val()==undefined){
        $(id).removeClass('is-valid');
        $(id).addClass('is-invalid');
    }else{
        $(id).removeClass('is-invalid');
        $(id).addClass('is-valid');

    }
}