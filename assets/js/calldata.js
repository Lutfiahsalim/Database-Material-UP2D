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
  // tableData()
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
      object.qrcode = `<img src="${object.qrcode}"/>`
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

// function tableData(apiData) {
//   let tabelData;

//   if(apiData.length == 0){
//     tabelData = `
//     <tr>
//       <td colspan="7">We can't find your request on our Database.</td> 
//     </tr>
//     `;
//   } 
//   else {
//     apiData.map((index, item) =>{
//       let noRow = item + 1
      // condition if the value is null or undefined
//       let noSerial = index.noSerial ? index.noSerial : '-';
//       let keypoint = index.keypoint ? index.keypoint : '-';
//       let link = index.link ? index.link : '-';
//       let pemeliharaanTerakhir = index.pemeliharaanTerakhir;

//       if(!pemeliharaanTerakhir){
//         pemeliharaanTerakhir = '-'
//       }
//       let waktu = pemeliharaanTerakhir.slice(11, -5)
//       tabelData += `
//           <tr>
//             <td>${noRow}</td>
//             <td></td>
//             <td class="serial-num">
//               <a href="detail.html">
//                 <button onClick="detailBtn('${index.uuid}')">${noSerial}</button>
//               </a>
//             </td>
//             <td>${keypoint}</td>
//             <td>${link}</td>
//             <td>${tanggal} ${waktu}</td>
//           </tr>a
//           `
//     })
//   }
//   $("#tableData_ShowData").html(tabelData);
// }

function detailBtn(uuidData) {
  // window.location.href = "../detail.html"
  // alert("1");
  // console.log(uuidData)
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
