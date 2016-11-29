/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//$('#login').click(function(){
//    console.log("in login js")
//    if($('#userName').val()==$('#userPassword').val())
//    {
//       window.location.assign("./home.html");
//    }
//    else{
//        alert("failed");
//    }
//});

$("#log").append("in js file");
var masterServiceBaseURL = "http://missionbhagiratha.telangana.gov.in/tdwsp/mastersServices/";
//var masterServiceBaseURL = "/tdwsp/mastersServices/";
$(document).ready(function () {
 $('#login').click(function (event) {
	
$("#log").append("<br/>in submit");
    var strVal = $('#password').val();
    var strMD5 = $.md5(strVal);
	$("#log").append(strMD5+"<br/>")
	var urll = masterServiceBaseURL+'GetDirectLogin?emplgid='+$('#username').val()+ "&emplgkey=" + strMD5;
	$("#log").append(urll+"<br/>")

    $.ajax({
       
        type: "GET",
        url: urll,
        success: function (data)
        {
		console.log("1111111111");
//            data = JSON.parse(data);
		
                $("#log").append(data+"<br/>");
                
            if (data == "success") {
                $("#log").append('login success'+"<br/>");
				window.location = "home.html";
            }
            else{
                $("#log").append("Invalid combination"+"<br/>");
				window.location = "index.html";
            }

        },
        error: function (x, e)
        {
		console.log("2222222");
            $("#log").append(x.readyState + " " + x.status + " " + e.msg+"<br/>");
            
        }


    });
});
});