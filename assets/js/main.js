const baseUrl = "http://localhost:5000"
const urlProduct = baseUrl + "/products"

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
    if (role == "adminpro") {
        window.location.href = "index.html"
    } 
    else {
        window.location.href = "detail.html"
    }
}