
listar();
function listar() {
    $.get("Docente/listarDocente", function (data) {
        var arrayColumns = [];
        arrayColumns = Object.keys(data[0]);

        crearListado(arrayColumns, data);
    });
}

$.get('Docente/listarModalidadContacto', function (data) {
    
    var dropDownID = $('#dropModalidad');
    llenarCombo(data, dropDownID);

    // Para el popup
    var dropDownID = $('#dropPopModalidad');
    llenarCombo(data, dropDownID);
});

function llenarCombo(data, dropDownID) {
    var contenido = '';
    contenido += '<option value="0" style="text-align:center;" selected>--Seleccione--</option>';
    data.forEach(element => {

        contenido += '<option value="' + element.IID + '">';
        contenido += element.NOMBRE
        contenido += '</option>';

    });


    dropDownID.html(contenido);
};

$.get('Alumno/listarSexo', function (data) {
  
    var dropDownID = $('#dropPopSexo');
    llenarComboSexo(data, dropDownID);
});




function llenarComboSexo(data, dropDownID) {
    var contenido = '';
    contenido += '<option value="0" selected>--Seleccione--</option>';
    data.forEach(element => {

        contenido += '<option value="' + element.IIDSEXO + '">';
        contenido += element.NOMBRE
        contenido += '</option>';

    });


    dropDownID.html(contenido);
};

$('#dropPopSexo').on('change', function () {
    var e = document.getElementById("dropPopSexo");
    var result = e.options[e.selectedIndex].value;
    var value = parseInt(result);
    
    

});



$('#dropModalidad').on('change', function () {
    var e = document.getElementById("dropModalidad");
    var result = e.options[e.selectedIndex].value;
    var value = parseInt(result);

    
    if (result == 0) {
        listar();
    } else {
        filtrarDocente(value);
    }

});

function filtrarDocente(value) {
    $.get("Docente/filtrarDocente/?iidmodalidad=" + value, function (data) {
        var arrayColumns = [];
        arrayColumns = Object.keys(data[0]);

        crearListado(arrayColumns, data);
    });
}



$('#dropModalidad').on('change', function () {
    var e = document.getElementById("dropModalidad");
    var result = e.options[e.selectedIndex].value;
    var value = parseInt(result);


    console.log(value)

    //if (result == 0) {
    //    listar();
    //} else {
    //    listarPorSexo(value);
    //}

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
        contenido += '<td style="text-align:center;">';
        contenido += '<button class="btn btn-warning pr-2" data-toggle="modal" data-target="#myModal">Editar</button>&nbsp&nbsp';

        contenido += '<button class="btn btn-danger" data-toggle="modal" data-target="#myModal">Eliminar</button>';
        contenido += '</td>';
    }
    contenido += '</tr>'

    contenido += '</tbody>';
    contenido += '</table>';
    

    var tabla = $('#table');
    tabla.html(contenido);
    $('#data-table').dataTable();

}