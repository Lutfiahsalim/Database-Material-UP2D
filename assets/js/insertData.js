const baseUrl = "https://newbackend-datar-zbzgct5ujq-et.a.run.app"
const urlProduct = baseUrl + "/products"

//Create Data
$('#btnAdd').on('submit', function(e) {
    e.preventDefault();
    addData();
});

function addData() {
    let payload = {};
    payload['noSerial'] = document.getElementById("noSerial").value;
    payload['keypoint'] = document.getElementById("keypoint").value;
    payload['merekRTU'] = document.getElementById("merekRTU").value;
    payload['jenisPeralatan'] = document.getElementById("jenisPeralatan").value;
    payload['komunikasi'] = document.getElementById("komunikasi").value;
    payload['link'] = document.getElementById("link").value;
    payload['teganganRTU'] = document.getElementById("teganganRTU").value;
    payload['pemeliharaanTerakhir'] = document.getElementById("pemeliharaanTerakhir").value;

    var calldata = {
        "url": urlProduct,
        "method": "POST",
        "dataType" : "json",
        "timeout": 0,
        "headers": {
           "Content-Type": "application/json",
           "Authorization": "Bearer" + token
        },
        "data": JSON.stringify({
            "noSerial" : noSerial,
            "keypoint" : keypoint,
            "merekRTU" : merekRTU,
            "jenisPeralatan" : jenisPeralatan,
            "komunikasi" : komunikasi,
            "link" : link,
            "teganganRTU" : teganganRTU,
            "pemeliharaanTerakhir" : pemeliharaanTerakhir
        }),
      };
      console.log(calldata)
      
      $.ajax(calldata)
      .fail(function (response) {
        console.log(response);
        if (response.status_code == 500) {
            // not yet
        }
      })
      .done(function (response) {
        console.log(response);


      });

}