const baseUrl = "http://localhost:5000"
const urlProduct = baseUrl + "/products"

let tokenData = sessionStorage.getItem("TOKEN_DATA");
// let uuidData = sessionStorage.getItem("UUID_DATA");
// let token = tokenData.token;
if (!tokenData) {
  Swal.fire({
    title: `Harap Login terlebih dahulu!`,
    icon: "error",
    showCancelButton: false,
    showConfirmButton: true,
  }).then(function(){
    window.location.href = "./login.html";
  })
}

$(document).ready(function() {
  loader()
  showData()
  detailBtn()
});

function showData() {
  let tokenData = JSON.parse(sessionStorage.getItem("TOKEN_DATA"));
  let token = tokenData.token;

  const callData = {
    "url": urlProduct,
    "method": "GET",
    "timeout": 0,
    "dataType": "json",
    "headers": {
      "contentType": "application/json",
      "Authorization": "Bearer " + token
    },
  };

  console.log(callData)
  $.ajax(callData)
  .done(function (response) {
    console.log(response)
    if (response.status_code == 200) {
      showDataTable(response.data.products)
    }
  })
}

function showDataTable(products) {
  products.map((object) => {
    object.noSerial = object.noSerial ? object.noSerial : '-';
    
    if (object.noSerial) {
      object.noSerial = 
      `<a href="detail.html" class="serial-num">
          <button onClick="detailBtn('${object.uuid}')">${object.noSerial}</button>
        </a>`
    }
    object.qrcode = object.qrcode ? object.qrcode : '-';

    if (object.qrcode) {
      // object.qrcode = `<img src="${object.qrcode}"/>`
      object.qrcode = `<img src="${object.qrcode}">`
    }
    object.keypoint = object.keypoint ? object.keypoint : '-';
    object.link = object.link ? object.link : '-';
    object.pemeliharaanTerakhir = object.pemeliharaanTerakhir ? object.pemeliharaanTerakhir : '-';
    // let waktu = object.pemeliharaanTerakhir.slice(11, -5)

    if (object.pemeliharaanTerakhir) {
      object.pemeliharaanTerakhir = `${object.pemeliharaanTerakhir.slice(0, -14)}`
    }

  })
  $('#tableData_Showdata').DataTable ({
        retrieve : true,
        data : products,
        columns : [
          {data : 'id'},
          {data : 'qrcode'},
          {data : 'noSerial'},
          {data : 'keypoint'},
          {data : 'link'},
          {data : 'pemeliharaanTerakhir'}
        ]
      })

}

function detailBtn(uuidData) {
  sessionStorage.setItem("UUID_DATA",JSON.stringify(uuidData));
}

function loader() {
  let tabel = `
  <tr>
    <td colspan="7"><img src="./assets/img/loading.svg" alt=""></td> 
  </tr>
  `
  $("#tableData").html(tabel);
}
