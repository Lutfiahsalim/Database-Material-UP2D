const baseUrl = "http://localhost:5000"
const urlProduct = baseUrl + "/products"

$(document).ready(function() {
    $("#btnAdd").on('click', function (e) {
      e.preventDefault();
      $('#btnAdd').addClass('disable').prop('disable', true)
  
      let noSerial = $('#noSerial').val() ? $('#noSerial').val() : blankValue("Nomor Serial");
      let keypoint = $('#keypoint').val() ? $('#keypoint').val() : blankValue("Keypoint");
      let merk_rtu = $('#merekRTU').val() ? $('#merekRTU').val() : blankValue("Merk RTU");
      let jenis_peralatan = $('#jenis_peralatan').val() ? $('#jenis_peralatan').val() : blankValue("Jenis Peralatan");
      let komunikasi = $('#komunikasi').val() ? $('#komunikasi').val() : blankValue("Komunikasi");
      let link = $('#link').val() ? $('#link').val() : blankValue("Link");
      let tegangan_kerja = $('#teganganRTU').val() ? $('#teganganRTU').val() : blankValue("Tegangan Kerja"); 
      let pemeliharaanTerakhir = $('#pemeliharaanTerakhir').val() ? $('#pemeliharaanTerakhir').val() : blankValue("Pemeliharaan Terakhir");
  
      if(!noSerial || !keypoint || !merk_rtu || !komunikasi || !link || !tegangan_kerja){
        blankValue()
      }
      else if(noSerial && keypoint && merk_rtu && komunikasi && link && tegangan_kerja){
        Swal.fire({
          title: 'Anda yakin ingin menambahkan data?',
          showDenyButton: true,
          confirmButtonText: 'Yes',
          denyButtonText: 'Cancel',
        }).then((result) => {
          if(result.isConfirmed) {
            $('#btnAdd').removeClass('disable').prop('disabled', false)
            insertKeypoint(noSerial, keypoint, merk_rtu, jenis_peralatan, komunikasi, link, tegangan_kerja, pemeliharaanTerakhir)
          } else if(result.isDenied) {
            $('#btnAdd').removeClass('disable').prop('disabled', false)
          }
        })
      }
    })
  })

function insertKeypoint(noSerial, keypoint, merk_rtu, jenis_peralatan, komunikasi, link, tegangan_kerja, pemeliharaanTerakhir) {
    let tokenData = JSON.parse(sessionStorage.getItem("TOKEN_DATA"));
    let token = tokenData.token
  
    let dataKeypoint = {
      "noSerial": noSerial,
      "keypoint": keypoint,
      "merekRTU": merk_rtu,
      "jenisPeralatan": jenis_peralatan,
      "komunikasi": komunikasi,
      "link": link,
      "teganganRTU": tegangan_kerja,
      "pemeliharaanTerakhir": pemeliharaanTerakhir
    }
  
    const setupInsertKeypoint = {
      "url": urlProduct,
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/json",
        "Authorization": "bearer " + token
      },
      "data": JSON.stringify(dataKeypoint)
    };
  
    console.log(setupInsertKeypoint.data)
    $.ajax(setupInsertKeypoint)
    .fail(function(response){
      ajaxFailedFeedback(response)
    })
    .done(function (response) {
      console.log(response);
      if (response.status_code = 200) {
        Swal.fire({
          title: "Keypoint berhasil ditambahkan!",
          text: `${keypoint} ditambahkan`,
          icon: "success",
          showCancelButton: false,
          showConfirmButton: true,
        }).then(function () {
          window.location.href = "index.html";
        })
      }
    })
  }

function toggleDropdown() {
  var dropdownContent = document.getElementById("dropdownContent");
  dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
}

function selectOption(option) {
  document.getElementById("jenis_peralatan").value = option;
  var selectedButton = document.querySelector(".dropdown-button");
  selectedButton.innerText = option;
  toggleDropdown();
}

  function ajaxFailedFeedback(response) {
    Swal.fire({
        title: response.responseJSON.msg,
        text: "Gagal menambahkan data",
        icon: "error",
    })
    if (response.code == 404 ) {
        Swal.fire()
    }
    else if (response.code == 400) {
        Swal.fire()
    }
  }
  
  function blankValue(input){
    if(input){
      Swal.fire({
        toast: true,
        icon: 'error',
        title: `Please fill ${input}.`,
        animation: false,
        position: 'bottom',
        showConfirmButton: false,
        timer : 1500,
        timerProgressBar: true,
      });
    }
    else {
      Swal.fire({
        toast: true,
        icon: 'error',
        title: `Please fill all required data.`,
        animation: false,
        position: 'bottom',
        showConfirmButton: false,
        timer : 2000,
        timerProgressBar: true,
      });
  
    }
  
    $('#btnAdd').removeClass('disable').prop('disabled', false)
  }
