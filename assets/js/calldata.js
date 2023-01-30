const baseUrl = "https://newbackend-datar-zbzgct5ujq-et.a.run.app"
const urlProduct = baseUrl + "/products"

let tokenData = sessionStorage.getItem("TOKEN_DATA");
// let uuidData = sessionStorage.getItem("UUID_DATA");
// let token = tokenData.token;
if (!tokenData) {
  Swal.fire({
    title: `Harap Login terlebih dahulu!`,
    icon: "error",
    showCacelButton: false,
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
      // console.log("tampilkan tabel")
      tableData(response.data.products)
    }
  })
}

function tableData(apiData) {
  let tabelData;
  // console.log(apiData)
  
  if(apiData.length == 0){
    tabelData = `
    <tr>
      <td colspan="7">We can't find your request on our Database.</td> 
    </tr>
    `;
  } 
  else {
    apiData.map((index, item) =>{
      let noRow = item + 1
      // condition if the value is null or undefined
      let noSerial = index.noSerial ? index.noSerial : '-';
      let keypoint = index.keypoint ? index.keypoint : '-';
      let link = index.link ? index.link : '-';
      let pemeliharaanTerakhir = index.pemeliharaanTerakhir;

      if(!pemeliharaanTerakhir){
        pemeliharaanTerakhir = '-'
      }
      // let pemeliharaanTerakhir = index.pemeliharaanTerakhir ? index.pemeliharaanTerakhir : '-';
      let tanggal = pemeliharaanTerakhir.slice(0, 10)
      let waktu = pemeliharaanTerakhir.slice(11, -5)
      tabelData += `
          <tr>
            <td>${noRow}</td>
            <td></td>
            <td class="serial-num">
              <a href="detail.html">
                <button onClick="detailBtn('${index.uuid}')">${noSerial}</button>
              </a>
            </td>
            <td>${keypoint}</td>
            <td>${link}</td>
            <td>${tanggal} ${waktu}</td>
          </tr>
          `
    })
  }
  $("#tableData").html(tabelData);
}

function detailBtn(uuidData) {
  // window.location.href = "../detail.html"
  // alert("1");
  console.log(uuidData)
  sessionStorage.setItem("UUID_DATA",JSON.stringify(uuidData));


  // let uuidData = JSON.parse(sessionStorage.getItem("UUID_DATA"))
  // console.log(uuidData)
}

function loader() {
  let tabel = `
  <tr>
    <td colspan="7"><img src="./assets/img/loading.svg" alt=""></td> 
  </tr>
  `
  $("#tableData").html(tabel);
}
