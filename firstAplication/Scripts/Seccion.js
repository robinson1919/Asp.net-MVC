
$.get('Seccion/listarSeccion', function (data) {
    console.log(data)
    var arrayColumns = [];
    arrayColumns = Object.keys(data[0]);
    listarSeccion(arrayColumns, data);
})



function listarSeccion(arrayColumns, data) {

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
