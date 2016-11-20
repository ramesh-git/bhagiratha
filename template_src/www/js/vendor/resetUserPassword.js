/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var masterServiceBaseURL = "/tdwsp/mastersServices/";
var employeeServiceBaseURL = "/tdwsp/employeeServices/";
var userData = JSON.parse(sessionStorage.getItem("userData"));
var t = new Date().getTime();
function genHashValue() {
    hasval = $.md5(document.getElementById("emplgkey").value);
    var hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, hasval);
    hmac.update(document.getElementById("emplgid").value + t);
    hash = hmac.finalize();
    return hash.toString();
}



$('#reset').click(function (e) {
    console.log($('#reset').val())
    console.log("after validation");
    var strVal = $('#newpassword').val();
    var strpwd = $.md5(strVal);
    console.log("logic gos hear");
    var dataToSubmit = {};
    //dataToSubmit.emp_id = userData[0].emp_id;
    var userData = JSON.parse(sessionStorage.getItem("userData"));
    dataToSubmit.user_id = userData.user_id;
    dataToSubmit.dob = $('#dob').val();
    //dataToSubmit.userid = $('#user_name').val();
    dataToSubmit.password = strpwd;
    $.ajax({
        type: "POST",
        headers: {
            "emp_value": s,
            "signature": hmacHash,
            "timestamp": t
        },
        url: employeeServiceBaseURL + 'ResetUserPassword',
        contentType: 'application/json',
        data: JSON.stringify(dataToSubmit),
        dataType: 'json',
        success: function (response) {
            if (response.auditstatus != undefined && response.auditstatus == "failure") {
                sessionStorage.removeItem("userData")
                alert("Invalid Attempt");
                window.location = "/Login.html";
            }

            if (response.status == "success") {
                console.log("in if");
                alert("Password Updated successfully");
                window.location = "/HomePage.html";


            } else if (response.status == "failure") {
                console.log("in else");
                alert("DOB doesnot match.Please enter correct Date of Birth");
                $('#dob').val('');
                $('#remove').removeAttr('disabled');
            }
        }
    });


});



$(document).ready(function () {

    $('#newpassword').on('change', function (e) {

        if ($('#newpassword').val().length < 7) {
            alert("Password must be grater than 7 charecters");
//            $('#newpassword').val('');
//            $('#newpassword1').val('');
            $('#remove').addAttr('disabled');

//        e.preventDefault();
//         return false;

        }

    });
    $('#newpassword1').on('change', function (e) {
        if ($('#newpassword').val() == $('#newpassword1').val() && $('#newpassword1').val().length > 6) {
            $('#reset').removeAttr('disabled');
        } else {
//            $('#newpassword').length < 7
            console.log("in else");
            alert("Password Length doesnot match ");
            $('#newpassword').val('');
            $('#newpassword1').val('');
            $('#remove').addAttr('disabled');
        }
    });

})