const baseUrl = "https://newbackend-datar-zbzgct5ujq-et.a.run.app"

let tmp = JSON.parse(sessionStorage.getItem("INFO_USER"));
let role = tmp.role;

function btnBack() {
    if (role=="adminpro") {
        window.location.href = "index.html"
    }
}

    // if (role=='adminpro') {
    //     console.log('ini adminpro')
    //     // btnBack.window.location.href = "index.html"
    // } 
    // else if (role=='admin') {
    //     console.log('ini admin')

    // } 
    if (role=='user') {
        let btn = document.getElementById("btnWrap")
        btn.style.display = 'none'

    } 

        
        
        // $(document).ready(function() {
        //     $("#btnWrap").hide();
        // });

        // let btnWrap = `
        // <div id=btnWrap class="btn-wrapper">
        //     <div class="editbtn">
        //         <button onclick="hiddenedit()" id="btnEdit"><i class="fa fa-edit"> Edit Data</i></button>
        //     </div>
        //     <div class="deletebtn">
        //         <button onclick="hiddendelete()" id="btnDelete"><i class="fa fa-trash"> Hapus</i></button>
        //     </div>
        // </div>
        // `
        // $('#btnWrap').html(btnWrap)