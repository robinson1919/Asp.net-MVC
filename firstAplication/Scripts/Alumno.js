listar();
function listar()
{
    $.get('Alumno/listarAlumnos', function (data) {
       
        var arrayColumns = [];
        arrayColumns = Object.keys(data[0]);

        listarAlumnos(arrayColumns, data);

    });
}


$.get('Alumno/listarSexo', function (data) {    
    var dropDownID = $('#drpSexo');
    llenarCombo(data, dropDownID);
    var dropDownID = $('#sexoPopup');
    llenarCombo(data, dropDownID);
});




function llenarCombo(data, dropDownID) {
    var contenido = '';
    contenido += '<option value="0" selected>--Seleccione--</option>';
    data.forEach(element => {
        
        contenido += '<option value="' + element.IIDSEXO + '">';
        contenido += element.NOMBRE
        contenido += '</option>';

    });


    dropDownID.html(contenido);
};

$('#drpSexo').on('change', function () {
    var e = document.getElementById("drpSexo");
    var result = e.options[e.selectedIndex].value;
    var value = parseInt(result);

    if (result == 0) {
        listar();
    } else {
        listarPorSexo(value);
    }   

});

function listarPorSexo(value)
{
    $.get('Alumno/filtrarAlumnosPorSexo/?iidsexo=' + value, function (data) {

        var arrayColumns = [];
        arrayColumns = Object.keys(data[0]);

        listarAlumnos(arrayColumns, data);

    });
}




function listarAlumnos(arrayColumns, data) {

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

        var id = data[i].IIDALUMNO;

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


function eliminar(id) {
    console.log(id)
    if (confirm("Desea Eliminar?")) {
        $.get("Alumno/eliminar/?id="+id, function (data) {
            console.log(data)
            if (data == 1) {
                alert("It's all good")
                listar();
            } else {
                alert("Not that good")
            }
            
        })
    }
}




