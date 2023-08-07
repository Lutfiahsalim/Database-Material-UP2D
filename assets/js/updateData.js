const baseUrl = "http://localhost:5000"
const urlProduct = baseUrl + "/products"


$(document).ready(function() {
  showDataDetail();
  // dataKeypointDetail();

  $("#saveEditBtn").on('click', function (e) {
    e.preventDefault();
    $('#saveEditBtn').addClass('disable').prop('disable', true)

    let noSerial = $('#noSerial').val() ? $('#noSerial').val() : blankValue("Nomor Serial");
    let keypoint = $('#keypoint').val() ? $('#keypoint').val() : blankValue("Keypoint");
    let merk_rtu = $('#merk_rtu').val() ? $('#merk_rtu').val() : blankValue("Merk RTU");
    let jenis_peralatan = $('#jenis_peralatan').val() ? $('#jenis_peralatan').val() : blankValue("Jenis Peralatan");
    let komunikasi = $('#komunikasi').val() ? $('#komunikasi').val() : blankValue("Komunikasi");
    let link = $('#link').val() ? $('#link').val() : blankValue("Link");
    let tegangan_kerja = $('#tegangan_kerja').val() ? $('#tegangan_kerja').val() : blankValue("Tegangan Kerja"); 
    let pemeliharaanTerakhir = $('#pemeliharaanTerakhir').val() ? $('#pemeliharaanTerakhir').val() : blankValue("Pemeliharaan Terakhir");

    if(!noSerial || !keypoint || !merk_rtu || !komunikasi || !link || !tegangan_kerja){
      blankValue()
    }
    else if(noSerial && keypoint && merk_rtu && komunikasi && link && tegangan_kerja){
      Swal.fire({
        title: 'Anda yakin ingin mengupdate keypoint?',
        showDenyButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: 'Cancel',
      }).then((result) => {
        if(result.isConfirmed) {
          $('#saveEditBtn').removeClass('disable').prop('disabled', false)
          updateKeypoint(noSerial, keypoint, merk_rtu, jenis_peralatan, komunikasi, link, tegangan_kerja, pemeliharaanTerakhir)
        } else if(result.isDenied) {
          $('#saveEditBtn').removeClass('disable').prop('disabled', false)
        }
      })
    }
  })
})

function showDataDetail() {
    let tokenData = JSON.parse(sessionStorage.getItem("TOKEN_DATA"));
    let token = tokenData.token

    let uuidData = JSON.parse(sessionStorage.getItem("UUID_DATA"))
    console.log(uuidData)
    
    let setupDetailKeypoint = {

      "url": urlProduct + `/${uuidData}`,
      "method": "GET",
      "timeout": 0,
      "headers": {
      "Authorization": "bearer " + token
    }
  }

  $.ajax(setupDetailKeypoint)
  .done(function (response) {
    console.log(response)
    if (response.status_code == 200) {
      dataKeypointDetail(response.data.detail_product)
    }
  })
}

function dataKeypointDetail(products) {
  let noSerial = products.noSerial ? products.noSerial : '-';
  let keypoint = products.keypoint ? products.keypoint: '-';
  let merk_rtu = products.merekRTU ? products.merekRTU: '-';
  let jenis_peralatan = products.jenis_peralatan ? products.jenis_peralatan: '-';
  let komunikasi = products.komunikasi ? products.komunikasi: '-';
  let link = products.link ? products.link: '-';
  let tegangan_kerja = products.teganganRTU ? products.teganganRTU: '-';
  let pemeliharaanTerakhir = products.pemeliharaanTerakhir ? products.pemeliharaanTerakhir: '-';

  $("#noSerial").val(noSerial);
  $("#keypoint").val(keypoint);
  $("#merk_rtu").val(merk_rtu);
  $("#jenis_peralatan").val(jenis_peralatan);
  $("#komunikasi").val(komunikasi);
  $("#link").val(link);
  $("#tegangan_kerja").val(tegangan_kerja);
  $("#pemeliharaanTerakhir").val(pemeliharaanTerakhir);
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

function updateKeypoint(noSerial, keypoint, merk_rtu, jenis_peralatan, komunikasi, link, tegangan_kerja, pemeliharaanTerakhir) {
  let tokenData = JSON.parse(sessionStorage.getItem("TOKEN_DATA"));
  let token = tokenData.token

  let uuidData = JSON.parse(sessionStorage.getItem("UUID_DATA"))
  console.log(uuidData)

  let dataKeypoint = {
    "noSerial": noSerial,
    "keypoint": keypoint,
    "merk_rtu": merk_rtu,
    "jenisPeralatan": jenis_peralatan,
    "komunikasi": komunikasi,
    "link": link,
    "tegangan_kerja":tegangan_kerja,
    "pemeliharaanTerakhir": pemeliharaanTerakhir
  }

  const setupKeypointUpdate = {
    "url": urlProduct + '/' + uuidData,
    "method": "PATCH",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/json",
      "Authorization": "bearer " + token
    },
    "data": JSON.stringify(dataKeypoint)
  };

  // console.log(setupKeypointUpdate.data)
  console.log(JSON.parse(setupKeypointUpdate.data))
  $.ajax(setupKeypointUpdate)
  .fail(function(response){
    ajaxFailedFeedback(response)
  })
  .done(function (response) {
    console.log(response);
    if (response.status_code = 200) {
      Swal.fire({
        title: "Keypoint berhasil diupdate!",
        text: `${keypoint} update`,
        icon: "success",
        showCancelButton: false,
        showConfirmButton: true,
      }) .then((result) => {
        if (result.isConfirmed) {
            // Mengarahkan pengguna ke halaman "halaman_berhasil.html" setelah berhasil menyimpan data
            window.location.href = "detail.html";
        }
      });
    } 
  }) 
} 

function ajaxFailedFeedback(response) {
  Swal.fire({
      title: response.responseJSON.msg,
      text: "Gagal melakukan update data keypoint",
      icon: "error",
  })
  if (response.code == 404 ) {
      Swal.fire()
  }
  else if (response.code == 400) {
      Swal.fire()
  }
  // console.log(response)
  // Swal.fire({
  //   type: 'error',
  //   title: 'Sorry',
  //   text: response.responseJSON.message ? response.responseJSON.message : "Sorry there was a failure on our server.",
  //   icon: 'error',
  //   showCancelButton: false,
  //   showConfirmButton: true,
  // });
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

  $('#saveEditBtn').removeClass('disable').prop('disabled', false)
}


