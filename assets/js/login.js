const baseUrl = "http://localhost:5000"

$(document).ready(function () {
    $("#btnLogin").on('click', function (e) {
        e.preventDefault();
        login();
    })
})

function ajaxFailedFeedback(response) {
    Swal.fire({
        title: "Login Gagal",
        text: response.responseJSON.msg,
        icon: "error",
    })
    if (response.code == 404 ) {
        Swal.fire()
    }
    else if (response.code == 400) {
        Swal.fire()
    }
}

function login() {
    const username = $("#username").val();
    const password = $("#password").val();

    var setupLogin = {
        "url": baseUrl+ "/login",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/json",
        },
        "data": JSON.stringify({
          "username": username,
          "password": password
        }),
      };
      
      $.ajax(setupLogin)
      .fail(function(response) {
        console.log(response)
        ajaxFailedFeedback(response) 
        })
      .done(function (response) {
        console.log(response)
            if (response.status_code == 200) {
                const dataToken = JSON.stringify({
                    token: response.data.token
                    // refreshToken: response.refreshToken
                });
                const userInfo = JSON.stringify({
                    username: response.data.user.username,
                    role: response.data.user.role
                });
                sessionStorage.setItem("TOKEN_DATA", dataToken);
                sessionStorage.setItem("INFO_USER", userInfo);
                
                // let temp = parseJSON(sessionStorage.getItem("TOKEN_DATA"));
                let temp = JSON.parse(sessionStorage.getItem("INFO_USER"));
                console.log(temp)
                // user = $.parseJSON(temp);

                // $('#btnLogin' ).removeClass( "disable").prop('disabled', false);
                Swal.fire({
                    title: `${temp.username} login ke datar!`,
                    timer: 800,
                    icon: "success",
                    showCancelButton: false,
                    showConfirmButton: false,
                }).then(function () {
                    let role = response.data.user.role;
                        if (role == "adminpro") {
                            window.location.href = "index.html";
                        } else if (role == "admin") {
                            window.location.href = "detail.html";
                        } else if (role == "user") {
                            window.location.href = "detail.html";
                        }
                });
            } 
        })       
}

