const baseUrl = "https://newbackend-datar-zbzgct5ujq-et.a.run.app"
const urlProduct = baseUrl + "/products"

$(document).ready(
  showData()
);

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
      console.log("tampilkan tabel")
      tableData(response.data.products)
    }
  })
}

function tableData(apiData) {
  let tabelData;
  console.log(apiData)

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
      let pemeliharaanTerakhir = index.pemeliharaanTerakhir ? index.pemeliharaanTerakhir : '-';
      tabelData += `
          <tr>
            <td>${noRow}</td>
            <td>
              <a href="./edit.html">
                <button onClick="editBtn('${index.uuid}')"><i class="fa fa-edit"></i></button>
              </a>
              <a href="#">
                <button onClick="deleteBtn('${index.uuid}')"><i class="fa fa-trash"></i></button>
              </a>
            </td>
            <td></td>
            <td class="serial-num"><a href="detail.html">${noSerial}</a></td>
            <td>${keypoint}</td>
            <td>${link}</td>
            <td>${pemeliharaanTerakhir}</td>
          </tr>`
    })
  }
  $("#tableBody").html(tabelData);
}

//-----------------------------------------fetch api
// var myHeaders = new Headers();
// myHeaders.append("Authorization", `Bearer ${token}` );

// var requestOptions = {
//   method: 'GET',
//   headers: myHeaders,
//   redirect: 'follow',
//   dataType: 'json'
// };

// fetch(urlProduct, requestOptions)
//   .then(response => response.json())
//   .then((urlProduct) => {
//     let tableData = `
//           <tr>
//             <th scope="col">No</th>
//             <th scope="col">Action</th>
//             <th scope="col">QR Code</th>
//             <th scope="col">No Serial</th>
//             <th scope="col">Keypoint</th>
//             <th scope="col">Link</th>
//             <th scope="col">Pemeliharaan terakhir</th>
//           </tr>`;
    
//     urlProduct.forEach((index) => {
//       noRow = index+1
//       tableData += `
//           <tr>
//             <td>${index.noRow}</td>
//             <td>
//               <a href="./edit.html">
//               <button onClick="editBtn('${index.uuid}')"><i class="fa-solid fa-pen-to-square"></i></button>
//               </a>
//               <a href="#">
//               <button onClick="deleteBtn('${index.uuid}')"><i class="fa-solid fa-trash"></i></button>
//               </a>
//             </td>
//             <td></td>
//             <td class="serial-num"><a href="detail.html"></a>${index.noSerial}</td>
//             <td>${index.keypoint}</td>
//             <td>${index.link}</td>
//             <td>${index.pemeliharaanTerakhir}</td>
//           </tr>`;

//           document.getElementById("tableBody").innerHTML = tableData;
//     });
//   });
































// $(document).ready(function(){
//     var callData = new Headers();
//     callData.append("Authorization", `Bearer ${token}` );
    
//     var requestOptions = {
//       method: 'GET',
//       headers: callData,
//       redirect: 'follow'
//     };
    
//     fetch(urlProduct, requestOptions)
//       .then(response => {
//         console.log(response)
//         if (response.status == 200) {
//           tableData(response.data)
//         }
//       }) 
//       .then(result => {console.log(result))
//       .catch(error => console.log('error', error));
// });

// function dataTable()

// async function loadIntoTable(urlProduct, table) {
//   const tableHead = table.querySelector("thead");
//   const tableBody = table.querySelector("tbody");
//   const response = await fetch(urlProduct);
//   const { headers, rows } = await response.json;

//   // Clear the table
//   tableHead.innerHTML = "<tr></tr>";
//   tableBody.innerHTML = "";

//   // Populate the headers
//   for (const headerText of headers) {
//     const headerElement = document.createElement("th");

//     headerElement.textContent = headerText;
//     tableHead.querySelector("tr").appendChild(headerElement);
//   }
   
//   // Populate the rows
//   for (const row of rows) {
//     const rowElement = document.createElement("tr");

//     for (const cellText of row) {
//       const cellElement = document.createElemenr("td");

//       cellElement.textContent = cellText;
//       rowElement.appendChild(cellElement);
//     }

//     tableBody.appendChild(rowElement);
//   }

// }

// loadIntoTable("urlProduct", document.querySelector("table"));
