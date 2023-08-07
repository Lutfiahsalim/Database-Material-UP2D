const baseUrl = "http://localhost:5000"
const urlProduct = baseUrl + "/products"

$(document).ready(function() {
  roleCheck()
  detailData()
  showData()
});


function detailData() {
    let tokenData = JSON.parse(sessionStorage.getItem("TOKEN_DATA"))
    let token = tokenData.token

    let uuidData = JSON.parse(sessionStorage.getItem("UUID_DATA"))
    console.log(uuidData)

    const detail = {
      "url": urlProduct + `/${uuidData}`,
      "method": "GET",
      "timeout": 0,
      "headers": {
        "Authorization": "Bearer " + token,
      },
    };

    $.ajax(detail)
    .done(function (response) {
      console.log(response);
      if (response.status_code == 200) {
        showData(response.data.detail_product)
      } 
    });
  }

function showData(product) {
  console.log(product)
  let noSerial = product?.noSerial;
  let keypoint = product?.keypoint;
  let merekRTU = product?.merekRTU;
  let jenisPeralatan = product?.jenisPeralatan;
  let komunikasi = product?.komunikasi;
  let link = product?.link;
  let teganganRTU = product?.teganganRTU;
  let pemeliharaanTerakhir = product?.pemeliharaanTerakhir;

  if(!pemeliharaanTerakhir){
    pemeliharaanTerakhir = '-'
  }

  let tanggal = pemeliharaanTerakhir.slice(0, 10)
  let waktu = pemeliharaanTerakhir.slice(0, -14)

  $("#no-Serial").html(noSerial ?? "-");
  $("#keypoint").html(keypoint ?? "-");
  $("#merek-RTU").html(merekRTU ?? "-");
  $("#jenis_peralatan").html(jenisPeralatan ?? "-");
  $("#komunikasi").html(komunikasi ?? "-");
  $("#link").html(link ?? "-");
  $("#tegangan-RTU").html(teganganRTU ?? "-");
  $("#pemeliharaanTerakhir").html(tanggal, waktu ?? "-");
}

function deleteBtn() {
  Swal.fire({
    title: 'Anda yakin ingin menghapus keypoint ini?',
    showDenyButton: false,
    showCancelButton: true,
    confirmButtonText: 'Hapus',
  }).then((result) => {
    if (result.isConfirmed) {
      removeKeypoint()
    }
  })
}

function removeKeypoint() {
  let tokenData = JSON.parse(sessionStorage.getItem("TOKEN_DATA"))
  let token = tokenData.token

  let uuidData = JSON.parse(sessionStorage.getItem("UUID_DATA"))
  console.log(uuidData)

  const deleteKeypoint = {
    "url": urlProduct + `/${uuidData}`,
    "method": "DELETE",
    "timeout": 0,
    "headers": {
      "Authorization": "Bearer " + token,
    },
  };

  $.ajax(deleteKeypoint)
  .done(function (response) {
    console.log(response);
    if (response.status_code == 200) {
      Swal.fire({
        title: "Keypoint telah dihapus!",
        icon: "success",
        timer: 1200,
        showCancelButton: false,
        showConfirmButton: false,
      })
      window.location.href = "./index.html"
    } 
  });
}

function redirectToEditPage() {
  // Redirect ke halaman edit.html menggunakan JavaScript
  window.location.href = "edit.html";
}

function roleCheck() {
  var userInfo = JSON.parse(sessionStorage.getItem("INFO_USER"))
  var role = userInfo.role

  if (role == "user") {
    $("#btnEdit").prop("disabled", true);
    $("#btnDelete").prop("disabled", true);
  } else {
    // Jika role bukan "user", biarkan button edit dan hapus aktif
    $("#btnEdit").prop("disabled", false);
    $("#btnDelete").prop("disabled", false);
  }
}


