
listar();
function listar() {
    $.get("Periodo/listarPeriodo", function (data) {
        var arrayColumns = [];
        arrayColumns = Object.keys(data[0]);
        crearListado(arrayColumns, data);
    });
}



$("input[type='text']").on('keyup enter', function () {
    var contenido = document.querySelector('#inputText').value;
    
    
    $.get("Periodo/buscarPeriodoPorNombre/?nombrePeriodo=" + contenido, function (data) {
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

        var id = data[i].IIDPERIODO;

        contenido += '<td style="text-align:center;">';
        contenido += '<button class="btn btn-warning" onClick="openModal(' + id + ')" data-toggle="modal" data-target="#myModal">Editar</button>&nbsp&nbsp';

        contenido += '<button class="btn btn-danger" onClick="eliminar(' + id + ')" >Eliminar</button>';
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
        console.log(id)
        $.get('Periodo/recuperarInformacion/?id=' + id, function (data) {
            var id = data[0].IIDPERIODO;
            var nombre = data[0].NOMBRE;
            var fechaInicio = data[0].FECHAINICIO;
            var fechaFin = data[0].FECHAFIN;

            document.querySelector('#txtIdPeriodo').value = id;
            document.querySelector('#txtNombre').value = nombre;
            document.querySelector('#txtFechaInicio').value = fechaInicio;
            document.querySelector('#txtFechaFin').value = fechaFin;
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
        var id = document.querySelector('#txtIdPeriodo').value;
        var nombre = document.querySelector('#txtNombre').value;
        var fechaInicio = document.querySelector('#txtFechaInicio').value;
        var fechaFin = document.querySelector('#txtFechaFin').value;

        frm.append("IIDPERIODO", id);
        frm.append("NOMBRE", nombre);
        frm.append("FECHAINICIO", fechaInicio);
        frm.append("FECHAFIN", fechaFin);
        frm.append("BHABILITADO", 1);

        if (confirm('Save Changes ?')) {
            $.ajax({
                type: "POST",
                url: "Periodo/guardarDatos",
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


    return exito;
}

function eliminar(id) {
    if (confirm("Do you want to Delete?")) {
        
        console.log(id);


        //------------------------------
        var frm = new FormData();
        frm.append("IIDPERIODO", id);
        frm.append("BHABILITADO", 0);
        $.ajax({
            type: "POST",
            url: "Periodo/eliminar",
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