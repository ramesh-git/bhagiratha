var mobileServiceBaseURL = "http://missionbhagiratha.telangana.gov.in/tdwsp/mobileServiceClient/";
//var mobileServiceBaseURL = "/tdwsp/mobileServiceClient/";

var consolReq = false;
console_log = function(value) {
    if(consolReq){
        console.log(value);
    }
}


t = new Date().getTime();

Array.prototype.contains = function (element) {
    return this.indexOf(element) > -1;
};
$(window).load(function () {
    $(".page-loader").fadeOut("slow");
});

var loadMasters = function (id, url) {
    var $selectDropdown = $('#' + id);

    $.ajax({
        method: "GET",
        
        url: url,
        success: function (data) {
            
            $.each(data, function (key, value) {
                $selectDropdown.append('<option value="' + value.code + '">' + value.name + '</option>');
            });
//            $selectDropdown.material_select();
        },
        failure: function (error) {
            console.log(error);
        }
    });

}

var loadMastersRender = function (id, url, val, value) {
//    console.log(value);
    var $selectDropdown = $('#' + id);

    $.ajax({
        method: "GET",
         headers: {
            "emp_value": s,
            "signature": hmacHash,
            "timestamp": t
        },
        url: url,
        async: true,
        success: function (data) {
             if(data.auditstatus!=undefined && data.auditstatus=="failure"){
                sessionStorage.removeItem("userData")
                alert("Invalid Attempt");
                window.location = "/Login.html";   
            }
            $.each(data, function (key, value) {
                $selectDropdown.append('<option value="' + value.code + '">' + value.name + '</option>');
            });
            $selectDropdown.val(value);
            $selectDropdown.material_select();
            if (val == 'C')
                $('#district').trigger('change');
            if (val == 'M')
                $('#constituency').trigger('change');

        },
        failure: function (error) {
            console.log(error);
        }
    });

}


$('#body_content').on('change keyup keydown', 'input, textarea, select', function (e) {
    $(this).addClass('changed-input');
});

$(window).on('beforeunload', function () {
    if ($('.changed-input').length) {
        return 'You haven\'t saved your changes.';
    }
});

$('.error-alert.close').on('click', function () {
    $('#error-alert').addClass('hide');
});
function validateFloatKeyPress(el, val) {
    var v = parseFloat(el.value);
    if (v % 1 != 0) {
        el.value = (isNaN(v)) ? '' : v.toFixed(val);
    } else {
        el.value = (isNaN(v)) ? '' : v;
    }
}
var handleFileSelect = function (evt) {
    console.log(evt.target)
//$('#myModal .modal-title').html("File Uploading. Please wait....");
//    $('#myModal').modal('show');
    
    var files = evt.target.files;
    var file = files[0];
    console.log((file.size / 1048576).toFixed(3))
    console.log(parseFloat(evt.target.dataset.filesize));
    console.log("evt.target.dataset.filetype" + evt.target.dataset.filetype);
    console.log("evt.target.dataset" + evt.target.dataset);
    console.log("evt.target" + evt.target);
    console.log("evt" + evt);
    console.log("evt.target.id" + evt.target.id);
    if (hasExtension(evt.target.id, evt.target.dataset.filetype.split(',')) && (parseFloat(evt.target.dataset.filesize) >= (file.size / 1048576).toFixed(3))) {
        if (files && file) {
            var reader = new FileReader();

            reader.onload = function (readerEvt) {
                var binaryString = readerEvt.target.result;
                document.getElementById(evt.target.id + "Data").value = btoa(binaryString);
                //hiding loding modal
//                $('#myModal').modal('hide');
            };

            reader.readAsBinaryString(file);
        }
    } else {
        alert('Problem occured due to invalid file format (or) invalid size');
        document.getElementById('' + evt.target.id).value = '';
        //hiding loading modal
//        $('#myModal').modal('hide');
    }
};
var handleFileSelect11 = function (evt) {
//    console.log(evt.target)
$('#myModal .modal-title').html("File Uploading. Please wait....");
    $('#myModal').modal('show');
    
    var files = evt.target.files;
    var file = files[0];
//    console.log((file.size / 1048576).toFixed(3))
//    console.log(parseFloat(evt.target.dataset.filesize));
    if (hasExtension(evt.target.id, evt.target.dataset.filetype.split(',')) && (parseFloat(evt.target.dataset.filesize) >= (file.size / 1048576).toFixed(3))) {
        if (files && file) {
            var reader = new FileReader();

            reader.onload = function (readerEvt) {
                var binaryString = readerEvt.target.result;
                document.getElementById(evt.target.id + "Data").value = btoa(binaryString);
                //hiding loding modal
                console.log("sssssssssssssssssssssssssssss");
                console.log($('.'+evt.target.id+"Thumb"));
                
                var filename = document.getElementById(evt.target.id ).value;

                    var extension = filename.replace(/^.*\./, '');
                    console.log('extension:'+extension);
                $('.'+evt.target.id+"Thumb").attr('src','data:image/'+extension+';base64,'+btoa(binaryString));
                $('.'+evt.target.id+"Thumb").removeClass('hide');
                $('#myModal').modal('hide');
                $('#submit_asset_images').removeAttr('disabled');
            };

            reader.readAsBinaryString(file);
        }
    } else {
        alert('Problem occured due to invalid file format (or) invalid size');
        document.getElementById('' + evt.target.id).value = '';
        //hiding loading modal
        $('#myModal').modal('hide');
    }
};
var handleFileSelect1 = function (evt) {
    // $("body").addClass("loading");
    // $('.modal-backdrop').removeClass('hide').addClass('fade in');
    $('#myModal .modal-title').html("File Uploading and reading Excel sheet. Please wait....");
    $('#myModal').modal('show');
//    console.log(evt.target)
    var files = evt.target.files;
    var file = files[0];
//    console.log((file.size / 1048576).toFixed(3))
//    console.log(parseFloat(evt.target.dataset.filesize));
    if (hasExtension(evt.target.id, evt.target.dataset.filetype.split(',')) && (parseFloat(evt.target.dataset.filesize) >= (file.size / 1048576).toFixed(3))) {
        if (files && file) {
            var reader = new FileReader();

            reader.onload = function (readerEvt) {
                var binaryString = readerEvt.target.result;
                document.getElementById(evt.target.id + "Data").value = btoa(binaryString);

            };

            reader.readAsBinaryString(file);
        }
    } else {
        alert('Problem occured due to invalid file format (or) invalid size');
        document.getElementById('' + evt.target.id).value = '';
        $('#myModal').modal('hide');
    }
};

function hasExtension(inputID, exts) {
    var fileName = document.getElementById(inputID).value;
    console.log((new RegExp('(' + exts.join('|').replace(/\./g, '\\.') + ')$')).test(fileName))
    return (new RegExp('(' + exts.join('|').replace(/\./g, '\\.') + ')$')).test(fileName);
}
function process_output(wb) {
//    console.log("aaaaaaaaaaaaaaasssssssssssssssdddddddddddddd");
    var output = output = JSON.stringify(to_json(wb), 2, 2);
    document.getElementById('boqfileValues').value = JSON.stringify(to_json(wb).BOQ, 2, 2);
    console.log(to_json(wb).BOQ);
    boqfileValue = to_json(wb).BOQ;
    $('#myModal').modal('hide');
}
function process_output1(wb) {
//    console.log("aaaaaaaaaaaaaaasssssssssssssssdddddddddddddd");
    var output = output = JSON.stringify(to_json(wb), 2, 2);
    document.getElementById('householdfileValues').value = JSON.stringify(to_json(wb).BOQ, 2, 2);
    console.log(to_json(wb).Sheet1);
    householdfileValue = to_json(wb).Sheet1;
}



function handleFileRead(e) {
    rABS = true;
    use_worker = true;
    var files = e.target.files;
    var f = files[0];
    {
        var reader = new FileReader();
        var name = f.name;
        reader.onload = function (e) {
            if (typeof console !== 'undefined')
                console.log("onload", new Date(), rABS, use_worker);
            var data = e.target.result;
            if (use_worker) {
//                console.log('ssssssssssssssssssssssss');
                xw(data, process_output);

            }
        };
        if (rABS)
            reader.readAsBinaryString(f);
        else
            reader.readAsArrayBuffer(f);
    }
}



