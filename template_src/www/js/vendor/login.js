var masterServiceBaseURL = "/tdwsp/mastersServices/";
var employeeServiceBaseURL = "/tdwsp/employeeServices/";
var reportServiceBaseURL = "/tdwsp/publicReportServices/";
var t = new Date().getTime();
function genHashValue() {
    hasval = $.md5(document.getElementById("emplgkey").value);
    var hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, hasval);
    hmac.update(document.getElementById("emplgid").value + t);
    hash = hmac.finalize();
    return hash.toString();
}

$('#close').click(function () {
    $("#gisreport").hide();
    $("#ofcaddr").show();
});
$('#showgis').click(function () {
    $("#gisreport").show();
    $("#ofcaddr").hide();
});
$('.services-grid1 div').click(function () {
    $('#myModal .modal-title').html($(this).parent().find("h4").html());
    $('#myModal .modal-body').html($(this).parent().find("h4").siblings('.modalContent').html());
    $('#myModal').modal("show");
});
$('#submit').click(function (e) {
    console.log($('#submit').val())
    var strVal = $('#emplgkey').val();
    var strpwd = $.md5(strVal);
    console.log("logic gos hear");
    var pwd = genHashValue();
    console.log(pwd);
    $.ajax({
        headers: {
            "emp_value": document.getElementById("emplgid").value,
            "signature": pwd,
            "timestamp": t,
//            "g-recaptcha-response": document.getElementById("g-recaptcha-response").value
        },
        type: "POST",
        contentType: "application/json",
        url: masterServiceBaseURL + 'ValidateLogin/',
        success: function (data)
        {
            data = JSON.parse(data);
            console.log(data.status)
            if (data.status == "Success") {
                //                        alert('login success');
                sessionStorage.setItem("userData", JSON.stringify(data));
                window.location = "/HomePage.html";
            }
            if (data.status == "F") {
                console.log("login status==F")
                sessionStorage.setItem("userData", JSON.stringify(data));

                window.location = "/PassworReset.html";
            } else if (data.status == "Failure") {
                alert("Invalid User ID & Password combination - Please try again..");
                window.location = "/Login.html";
            } else if (data.status == "URLModified") {
                alert("Invalid Attempt");
                window.location = "/Login.html";
            }

        },
        error: function (x, e)
        {
            alert(x.readyState + " " + x.status + " " + e.msg);
        }


    });
});

$('#reset').click(function (e) {
    console.log($('#reset').val())


    var strVal = $('#newpassword').val();
    var strpwd = $.md5(strVal);
    console.log("logic gos hear");
    var dataToSubmit = {};
    //dataToSubmit.emp_id = userData[0].emp_id;
    var userData = JSON.parse(sessionStorage.getItem("userData"));
    dataToSubmit.user_id = userData.user_id;
    //dataToSubmit.userid = $('#user_name').val();
    dataToSubmit.password = strpwd;
    $.ajax({
        type: "POST",
        headers: {
            "emp_value": s,
            "signature": hmacHash,
            "timestamp": t
        },
        url: employeeServiceBaseURL + 'ResetPassword',
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
                alert("Something went wrong - Please try again");
                $('#remove').removeAttr('disabled');
            }
        }
    });


});

$('#forget').click(function (e) {
    window.location = "/ForgetPassword.html";
});

function saveMails() {
    if ($('#Name').val() == null || $('#Name').val() == "" || $('#Email').val() == null || $('#Email').val() == "" || $('#Subject').val() == null || $('#Subject').val() == "" || $('#Message').val() == null || $('#Message').val() == "") {
        alert("Enter all fields to proceed");
        e.preventDefault();
        return false;
    }
    var dataToSubmit = {};
    dataToSubmit.name = $('#Name').val();
    dataToSubmit.email = $('#Email').val();
    dataToSubmit.subject = $('#Subject').val();
    dataToSubmit.message = $('#Message').val();
    $.ajax({
        type: "POST",
        url: masterServiceBaseURL + 'SaveMails',
        contentType: 'application/json',
        data: JSON.stringify(dataToSubmit),
        dataType: 'json',
        success: function (response) {
            if (response.status == "success") {
                console.log("in if");
                alert("Request submited successfully");
                document.getElementById("Name").value = "";
                document.getElementById("Email").value = "";
                document.getElementById("Subject").value = "";
                document.getElementById("Message").value = "";
                $('#mail_us').removeAttr('disabled');

            } else if (response.status == "failure") {
                console.log("in else");
                alert("Something went wrong - Please try again");
                $('#mail_us').removeAttr('disabled');
            }
        }
    });

}
var selectedItemToDownload;
$('.downloadcenter li').click(function (event) {
    event.preventDefault();
    selectedItemToDownload = $(this).index();
    $('#myModalNorm').modal("show");
});
$(function () {

    $(".downloadcenter li a").click(function () {

        $(".selcted_file").text($(this).text());
        $(".selcted_file").val($(this).text());

    });

});

$('#download_sumit').click(function () {
    var dataToSubmit = {};
    dataToSubmit.name = $('#requested_Name').val();
    dataToSubmit.email = $('#EmailID').val();
    dataToSubmit.selectedItemToDownload = selectedItemToDownload;

    $.ajax({
        type: "POST",
        url: masterServiceBaseURL + 'DownloadRequest',
        contentType: 'application/json',
        data: JSON.stringify(dataToSubmit),
        dataType: 'json',
        success: function (response) {
            if (response.status == "success") {
                alert(" thank you \n Please verify your e-mail for download link.");
                document.getElementById("Name").value = "";
                document.getElementById("EmailID").value = "";
                $(".downloadcenter li a").click(function () {

                    $(".selcted_file").text($(this).text());
                    $(".selcted_file").val($(this).text());

                });

            } else if (response.status == "failure") {
                console.log("in else");
                alert("Something went wrong - Please try again");
                document.getElementById("Name").value = "";
                document.getElementById("EmailID").value = "";
                $(".downloadcenter li a").click(function () {

                    $(".selcted_file").text($(this).text());
                    $(".selcted_file").val($(this).text());

                });

            }
        }
    });
})

$('#new_images').click(function (e) {
    e.preventDefault();
//    alert("loading images");

    $.ajax({
        type: "GET",
        url: masterServiceBaseURL + 'GetNewImages',
        contentType: 'application/json',
        dataType: 'json',
        success: function (response) {

            console.log("success")
            console.log(response);
            $('.dynamic_slider').html('<div id="myCarousel" style="max-width: 100%;max-height:auto;" class="carousel slide" data-ride="carousel"><ol class="carousel-indicators"></ol><div class="carousel-inner" role="listbox"></div> <a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev"> <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span> <span class="sr-only">Previous</span> </a> <a class="right carousel-control" href="#myCarousel" role="button" data-slide="next"> <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span> <span class="sr-only">Next</span> </a></div>');
            for (var i = 0; i < response.length; i++) {
                var imagepath = response[i].imagePath
                var result = imagepath.replace("/home/wscontent/mbhagiratha/", "");

                $('<div class="item" ><div style="text-align:center"><img style="max-width:100%;max-height:100%; text-align: center" src="' + "http://www.missionbhagiratha.telangana.gov.in/" + result + '"><div class="carousel-caption"><p>' + response[i].discription + '</p></div> </div>  </div>').appendTo('.carousel-inner');
                $('<li data-target="#myCarousel" data-slide-to="' + i + '"></li>').appendTo('.carousel-indicators')

            }


            $('.item').first().addClass('active');
            $('.carousel-indicators > li').first().addClass('active');

//            $('.carousel').carousel({interval: 1000});
//            $('.carousel').carousel('cycle');

            $('#myCarousel').carousel();
            $('#latestImageModal').modal("show");

        }
    });

});


$(document).ready(function () {

    $('#mail_us').click(function (event) {
        $('#mail_us').attr('disabled', 'disabled');
        saveMails();
    });

    $.ajax({
        type: "GET",
        url: reportServiceBaseURL + 'GetNews',
        contentType: 'application/json',
        dataType: 'json',
        success: function (response) {

            console.log("success")
            console.log(response);
            for (var i = 0; i < response.length; i++) {
                var news = response[i].content
                console.log(news)
                if (news.length) {
                    
                    var html = '<li class="news-item" >'+news+'</li>';
                    //$('<li class="news-item" >', {html: news},'</li>').appendTo('#js-news')
                    $('#js-news').append(html);
                }

            }
            $('#js-news').ticker();


//            $('.item').first().addClass('active');
//            $('.carousel-indicators > li').first().addClass('active');
//            
//            $('.carousel').carousel({interval: 1000});
//            $('.carousel').carousel('cycle');

//            $('#myCarousel').carousel();
//            $('#latestImageModal').modal("show");

        }
    });

    $('.services-grid1 h4').click(function () {
        $('#myModal .modal-title').html($(this).html());
        $('#myModal .modal-body').html($(this).siblings('.modalContent').html());
        $('#myModal').modal("show");
    });
    $().UItoTop({easingType: 'easeOutQuart'});


});