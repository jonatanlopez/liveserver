$(function () {  // DOCUMENT READY
    var muestra = function(){
        $('.back_shade').fadeIn(500, function(){
            $('.modalw').fadeIn();
        });
    }
    var modal_open = function(cont, page){
        $(cont).load(page);
        muestra();
    }
    var link_ext = function(ref, target){
        if(ref){
            if(target=="new"){
                window.open(ref, '_blank');
            } else {
                window.location.href=ref;
            }
        }
        return false;
    }
    var showAlert = function(text, type){
        var alrt = '<div class="p-3">' + text + '</div>';
        $('.modal_content').html(alrt);
        muestra();
    }
    
    var setUpSearchBy = function(b, elem){
        /*selects*/
        var elementos = '<select>';
         $.each(b, function(i, e) {
            /*(i==0) ? chk='checked' : chk='';*/
            elementos += '<option value="">' + i + '</option>';
            /*elementos += '<li class="va_tasas" cod="' + e.cod + '">'+ e.valor + ' ( ' + e.cod + ' ) <input class="radio_tasas" type="radio" name="ops_tasa" value="' + e.cod + '"' + chk + '></li>';*/
        });
        elementos += '</select>';
        $(elem).html(elementos);
    }
    
    var setUpSearchBox = function(b){
        // modal_open('.modalw .modal_content', $(this).attr('s_type');
        // alert(b.attr('s_type'));
        var u = b.attr('s_type');
        muestra();
        $.ajax({
            url: u,
            dataType: 'json',
            method: 'GET',
            error: function() {
                console.log("No se ha podido obtener la información");
            }
        }).done(function(data){
                console.log(data);
                showAlert("json exitoso", "success");
                setUpSearchBy(data, $('.modal_content').find('div'));
        });
        return false;
    }
    $('.x').on('click', function(){
        $(this).closest('.modalw').fadeOut();
        $('.back_shade').fadeOut();
        $(this).closest('.modalw').find('.modal_content').empty().html('<div class="spinner"></div>');
    });
/*    $('body').on('click', '.cerrar', function(){
        $(this).closest('.alert').fadeOut();
        $('.back_shade').fadeOut();
        $(this).closest('.alert').remove();
    });*/
    $('.lnk_m').on('click', function(){
        modal_open('.modalw .modal_content', $(this).attr('lnk_m'));
    });
    $('.lnk_e').on('click', function(){
        link_ext($(this).attr('lnk_e'), $(this).attr('tar'));
    });
    $('.nav-link--home').on('click', function(){
        window.location.href='/';
    });
    // Llamada a ventana de búsqueda de unidades productivas
    $('.call_search_up').on('click', function(){
        //setUpSearchBox($(this));
        muestra();
    });
    if ($('.carousel-inner').children().length === 1 ) { 
        $('.carousel-indicators, .carousel-control-prev, .carousel-control-next').hide();
    }
});