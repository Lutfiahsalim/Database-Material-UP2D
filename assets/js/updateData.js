const baseUrl = "https://newbackend-datar-zbzgct5ujq-et.a.run.app"
const urlProduct = baseUrl + "/products"

let uuidData = JSON.parse(sessionStorage.getItem("UUID_DATA"))
console.log(uuidData)



function updateData() {
  let tokenData = JSON.parse(sessionStorage.getItem("TOKEN_DATA"))
  let token = tokenData.token
  
  let uuidData = JSON.parse(sessionStorage.getItem("UUID_DATA"))
  console.log(uuidData)
  
  // const editFormData;
  const formData = formUpdateData();

    const dataResponse = {
        "url": urlProduct + `/${uuidData}`,
        "method": "PATCH",
        "timeout": 0,
        "headers": {
           "Content-Type": "application/json",
           "Authorization": "Bearer " + token
        },
        "body":JSON.stringify(formData)
      };
      console.log(dataResponse)
      
      $.ajax(dataResponse)
      .done(function (response) {
        console.log(response)
        if (response.status_code == 200) {
          clearFormData();
        }
      });
}

function formUpdateData() {
  return {
        noSerial:document.getElementById("noSerial").value,
        keypoint:document.getElementById("keypoint").value,
        merekRTU:document.getElementById("merekRTU").value,
        jenisPeralatan:document.getElementById("jenisPeralatan").value,
        komunikasi:document.getElementById("komunikasi").value,
        link:document.getElementById("link").value,
        teganganRTU:document.getElementById("teganganRTU").value,
        pemeliharaanTerakhir:document.getElementById("pemeliharaanTerakhir").value
    }
}

function clearFormData() {
    document.getElementById("noSerial").value = "";
    document.getElementById("keypoint").value = "";
    document.getElementById("merekRTU").value = "";
    document.getElementById("jenisPeralatan").value = "";
    document.getElementById("komunikasi").value = "";
    document.getElementById("link").value = "";
    document.getElementById("teganganRTU").value = "";
    document.getElementById("pemeliharaanTerakhir").value = "";
}

