const baseUrl = "https://newbackend-datar-zbzgct5ujq-et.a.run.app"
const urlProduct = baseUrl + "/products"

$(document).ready(function() {
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
  let waktu = pemeliharaanTerakhir.slice(11, -5)

  $("#no-Serial").html(noSerial ?? "-");
  $("#keypoint").html(keypoint ?? "-");
  $("#merek-RTU").html(merekRTU ?? "-");
  $("#jenis-Peralatan").html(jenisPeralatan ?? "-");
  $("#komunikasi").html(komunikasi ?? "-");
  $("#link").html(link ?? "-");
  $("#tegangan-RTU").html(teganganRTU ?? "-");
  $("#pemeliharaanTerakhir").html(tanggal, waktu ?? "-");
}

// function showData(product) {
//     let noSerial = product.noSerial ? product.noSerial : '-';
//     let keypoint = product.keypoint ? product.keypoint : '-';
//     let merekRTU = product.merekRTU;
//     let jenisPeralatan = product.jenisPeralatan
//     let komunikasi = product.komunikasi
//     let link = product.link ? product.link : '-';
//     let teganganRTU = product.teganganRTU
//     let pemeliharaanTerakhir = product.pemeliharaanTerakhir;

    // if(!pemeliharaanTerakhir){
    //   pemeliharaanTerakhir = '-'
    // }
    // let pemeliharaanTerakhir = index.pemeliharaanTerakhir ? index.pemeliharaanTerakhir : '-';
    // let tanggal = pemeliharaanTerakhir.slice(0, 10)
    // let waktu = pemeliharaanTerakhir.slice(11, -5)

    
    // $("#no-Serial").html(noSerial);
    // $("#keypoint").html(keypoint);
    // $("#merek-RTU").html(merekRTU);
    // $("#jenis-Peralatan").html(jenisPeralatan);
    // $("#komunikasi").html(komunikasi);
    // $("#link").html(link);
    // $("#tegangan-RTU").html(teganganRTU);
    // $("#pemeliharaan-Terakhir").html(tanggal, waktu);

// }

