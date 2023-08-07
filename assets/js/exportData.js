const baseUrl = "http://localhost:5000"
// import baseUrl from './calldata.js';
const exportProduct = baseUrl + "/products-export/excel"

$(document).ready(function () {
    $("#btnDown").on('click', function (e) {
        e.preventDefault();
        exportData();
    })
})

function exportData() {
    let tokenData = sessionStorage.getItem("TOKEN_DATA");
    let token = tokenData.token;

    const DataToExcel = {
        "url": exportProduct,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
    };
    $.ajax(DataToExcel)
    .done(function (response) {
        console.log(response.data.path);
        // // Simpan data sebagai file Excel dengan FileSaver.js
        // const blob = new Blob([response.data], 
        //     { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        // saveAs(blob, "data.xlsx"); // Nama berkas yang akan diunduh
    })
    .fail(function(response) {
        console.log(response);
        ajaxFailedFeedback(response);
    })
}

function ajaxFailedFeedback() {
    Swal.fire({
        // title: response.data.path,
        text: "Gagal mengunduh data",
        icon: "error",
    })
}