const baseUrl = "https://newbackend-datar-zbzgct5ujq-et.a.run.app"
const urlProduct = baseUrl + "/products"

let tmp = JSON.parse(sessionStorage.getItem("INFO_USER"));
let role = tmp.role;
console.log(tmp)

$(document).ready(function () {
    $("#btnLogo").on('click', function (e) {
        e.preventDefault();
        btnBack();
    })
    hiddenFeature();
})

//fungsi untuk button logo navbar
function btnBack() {
    if (role=="adminpro") {
        window.location.href = "index.html"
    } 
    else {
        window.location.href = "detail.html"
    }
}

function hiddenFeature() {
//hide feature pada halaman detail untuk role user
    if (role=='user') {
        let btn = document.getElementById("btnWrap")
        btn.style.display = 'none'
    }
}


// DataTable
// $(document).ready( function () {
//     $('#tableBody').DataTable({
//         'ajax': urlProduct,
        // 'tableData' : [
        //     {'products' : id},
        //     {'products' : noSerial},
        //     {'products' : keypoint},
        //     {'products' : link},
        //     {'products' : pemeliharaanTerakhir},

//         ]
//     })
//   } );