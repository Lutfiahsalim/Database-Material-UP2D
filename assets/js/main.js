const baseUrl = "https://newbackend-datar-zbzgct5ujq-et.a.run.app"

let tmp = JSON.parse(sessionStorage.getItem("INFO_USER"));
let role = tmp.role;
console.log(tmp)

$(document).ready(function () {
    $("#btnLogo").on('click', function (e) {
        e.preventDefault();
        btnBack();
    })
})

//fungsi untuk button logo navbar
function btnBack() {
    if (role=="adminpro") {
        window.location.href = "index.html"
    }
}

//hide feature pada halaman detail untuk role user
    if (role=='user') {
        let btn = document.getElementById("btnWrap")
        btn.style.display = 'none'
    } 


// DataTable
