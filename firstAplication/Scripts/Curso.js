
listar(); 
function listar() {
    //$.get("Curso/listarCurso", function (data) {


    //    var arrayColumns = [];
    //    arrayColumns = Object.keys(data[0]);
    //    crearListado(arrayColumns, data);
        
    //});
    $.ajax({
        type: "GET",
        url: "Curso/listarCurso",
        success: function (data) {
            console.log(data)
            var arrayColumns = [];
            arrayColumns = Object.keys(data[0]);
            crearListado(arrayColumns, data);
        }
    })
}





var btnBuscar = $('#btnBuscar');
//var contenido = document.querySelector('#txtNombre');
$("input[type='text']").on('keyup enter', function () {
    
    var contenido = document.querySelector('#txtNombre').value;
    var id = document.querySelector('#txtNombre').value;
    //console.log(contenido);
    
    $.get("curso/buscarCursoPorNombre/?nombre=" + contenido , function (data) {
        
        var arrayColumns = [];
        arrayColumns = Object.keys(data[0]);
        crearListado(arrayColumns, data);

    });
});

function crearListado(arrayColumns, data) {
    
    var contenido = "";
    contenido += '<table class="table table-bordered" id="data-table">';
    contenido += '<thead>';
    contenido += '<tr>';
    arrayColumns.forEach(element => {
        contenido += '<th scope="col">' + element + '</th>';
    });
    contenido += '<th scope="col">Acciones</th>';

    
    contenido += '</tr>';
    contenido += '</thead>';
    contenido += '<tbody>';
    
    
    for (var i = 0; i < data.length; i++) {
        contenido += '<tr>';
        for (var j = 0; j < arrayColumns.length; j++) {
            var countArrayColumns = arrayColumns[j]
            
            contenido += '<td>' + data[i][countArrayColumns] + '</td>';
        }
        
        var id = data[i].IIDCURSO;
        
        contenido += '<td style="text-align:center;">';
        contenido += '<button class="btn btn-warning" onClick="openModal(' + id +')" data-toggle="modal" data-target="#myModal">Editar</button>&nbsp&nbsp';

        contenido += '<button class="btn btn-danger" onClick="eliminar(' + id +')" >Eliminar</button>';
    }
        contenido += '</tr>'
    
    contenido += '</tbody>';
    contenido += '</table>';
   

    var tabla = $('#table');
    tabla.html(contenido);
    $('#data-table').dataTable();

}


function openModal(id) {
    var inputsObligatorios = document.querySelectorAll('.obligatorio');
    var nInputs = inputsObligatorios.length;

    for (var i = 0; i < nInputs; i++) {
       
        inputsObligatorios[i].classList.remove("error");
        
    }
    if (id === 0) {
        
        borrarInputs();
    } else {
        $.get('Curso/recuperarDatos/?id=' + id, function (data) {
            var id = data[0].IIDCURSO;
            var nombre = data[0].NOMBRE;
            var descripcion = data[0].DESCRIPCION;

            document.querySelector('#txtIdCurso').value = id;
            document.querySelector('#txtPopNombre').value = nombre;
            document.querySelector('#txtPopDescripcion').value = descripcion;
        });
        

    }
  
}

function borrarInputs() {
    var inputs = document.querySelectorAll('.form-control');
    var nInputs = inputs.length;

    for (var i = 0; i < nInputs; i++) {
        inputs[i].value = '';
    }
}

function agregar() {
    if (datosObligatorios() == true) {
        var frm = new FormData();
        var id = document.querySelector('#txtIdCurso').value;
        var nombre = document.querySelector('#txtPopNombre').value;
        var descripcion = document.querySelector('#txtPopDescripcion').value;
        frm.append("IIDCURSO", id);
        frm.append("NOMBRE", nombre);
        frm.append("DESCRIPCION", descripcion);
        frm.append("BHABILITADO", 1);

        if (confirm('Save Changes ?')) {
            $.ajax({
                type: "POST",
                url: "Curso/guardarDatos",
                data: frm,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data != 0) {
                        listar();
                        alert('updated');
                        document.querySelector('.close').click();
                    } else {
                        alert('Something wrong happened');
                    }
                }
            });
        }
        

    } else {

    }
    
}



function datosObligatorios() {
    var exito = true;

    var inputsObligatorios = document.querySelectorAll('.obligatorio');
    var nInputs = inputsObligatorios.length;
    
    inputsObligatorios.forEach(element => {
        if (element.value == '') {
            exito = false;            
            element.classList.add("error");
        } else {
            element.classList.remove("error");
        }
    })

    //for (var i = 0; i < nInputs; i++) {
    //    if (inputsObligatorios.reverse()[i].value == '') {
    //        exito = false;
    //        inputsObligatorios[i].focus();
    //        inputsObligatorios[i].classList.add("error");
    //    } else {
    //        inputsObligatorios[i].classList.remove("error");
    //    }
    //}

    return exito;
}

function eliminar(id) {

    if (confirm("Do you want to Delete?")) {
        var frm = new FormData();
        console.log(id);


        //------------------------------
        frm.append("IIDCURSO", id);
        frm.append("BHABILITADO", 0);
        $.ajax({
            type: "POST",
            url: "Curso/eliminarCurso",
            data: frm,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data != 0) {
                    listar();
                    alert('deleted');
                    document.querySelector('.close').click();
                } else {
                    alert('Something wrong happened');
                }
            }
        });
    }
    
}