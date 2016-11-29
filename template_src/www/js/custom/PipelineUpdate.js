
//var mobileServiceBaseURL = "/tdwsp/mobileServiceClient/";

loadMasters('district', mobileServiceBaseURL + "GetDistricts");
//loadMasters('segment', mobileServiceBaseURL + "GetSegments");
var assetTypes = new Array();
assetTypes[1] = "R&B";
assetTypes[2] = "Highway";
assetTypes[3] = "PR";
assetTypes[4] = "River Crossing";
assetTypes[5] = "Forest";

if(document.getElementById('assetImage')) document.getElementById('assetImage').addEventListener('change', handleFileSelect, false);
if(document.getElementById('CrossingImage')) document.getElementById('CrossingImage').addEventListener('change', handleFileSelect, false);
if(document.getElementById('valveEntryImage')) document.getElementById('valveEntryImage').addEventListener('change', handleFileSelect, false);
if(document.getElementById('valveUpdateImage')) document.getElementById('valveUpdateImage').addEventListener('change', handleFileSelect, false);
if(document.getElementById('existCrossingImage')) document.getElementById('existCrossingImage').addEventListener('change', handleFileSelect, false);

var Network = new Array();
Network[01] = "Transmission";
Network[02] = "Distribution";

var Transmission = new Array();
Transmission[01] = "Gravity";
Transmission[02] = "Pumping";

$('#district').on('change', function (e) {
    
    $('#segment').find('option:gt(0)').remove();
    $('#segment').val('');
    $('#network').val('');
    $('#transmode').val('');
    
    loadMasters('segment', mobileServiceBaseURL + "GetSegmentsByDist1/" + $('#district').val());
});

$('#segment').on('change', function (e) {
   $('.search_asset').removeClass('hide'); 
});

$('#proceedstrech').click(function (e){
    $('#strechprogress').trigger("click"); 
    $('.permission').removeClass('hide');
});

$('#proceedstr').click(function (e){
    $('#strechdetails').trigger("click")
    $('#strechprogress').trigger("click"); 
    $('.pipeslist').removeClass('hide');
});

$('#proceedpermission').click(function (e){
    $('#permissiondet').trigger("click")
});

$('#search_asset').click(function (e){
    
    if ($('#segment').val() == null || $('#segment').val() == "" || $('#district').val() == null || $('#district').val() == "") {
        alert("Select District and Segment to proceed");
        e.preventDefault();
        return false;
    }
//    $('.search_asset').addClass('hide');
//    $('.nav-tabs a[href="#profile"]').tab('show');
    $('#pipelineloc').trigger("click"); 
    $('.pipeslist').removeClass('hide');
    $('#pipelinelist').trigger("click");
    
    $.ajax({
            method: "GET",
//            url: mobileServiceBaseURL + 'GetPiplines?segmentcode='
////                + ($('#district').val() != null ? $('#district').val() : "")
//                + ($('#segment').val() != null ? $('#segment').val() : "")
//                + "&netwrktyp=" + ($('#netwrktyp').val() != null ? $('#netwrktyp').val() : "")
//                + "&type=" + ($('#type').val() != null ? $('#type').val() : ""),
           
            url: mobileServiceBaseURL + 'GetPiplines?dcode='
                + ($('#district').val() != null ? $('#district').val() : "")
                + "&segmentcode=" + ($('#segment').val() != null ? $('#segment').val() : "")
                + "&netwrktyp=" + ($('#netwrktyp').val() != null ? $('#netwrktyp').val() : "")
                + "&type=" + ($('#type').val() != null ? $('#type').val() : ""),
            success: function (data) {
                
                if (data.length > 0) {
                    $('.assets_list').html(prepareAssetList(data));
                    $('.assets_list').removeClass('hide');
                } else {
                    alert("No Assets found");
                }
            },
            failure: function (error) {
                console.log(error);
            }
        });
        
});

function prepareAssetList(data) {
    var html = '';
    var table = '<table class="responsive-table striped dynamic_table">';
    var thead = '<thead> <tr><th data-field="id" class="center " style="width: 45%">Pipeline code</th>';
    thead += '<th data-field="id" class="center" style="width: 45%">Network</th>';
    thead += '<th data-field="id" class="center" style="width: 45%">Mode</th>';
    thead += '<th data-field="name" class="center">Length</th>';
    var tbody = '<tbody>';
    $.each(data, function (key, obj) {
//        console.log(obj);
        tbody += '<tr>';
        tbody += ' <td class="center ">' + obj.pipeline_code + '</td>';
        tbody += ' <td class="center">' + Network[parseInt(obj.netwrk_typ)] + '</td>';
            tbody += '<td class="center">' + Transmission[parseInt(obj.transmion_by)] + '</td>';
            tbody += '<td class="center">' + obj.length + '</td>';
        tbody += '</tr>';
    });

    thead += '</tr></thead>'
    html = table + thead + tbody + '</tbody></table>';
    return html;
}
var pipelinecodeSelected = "";
$("body").on("click", '.dynamic_table > tbody > tr', function (event) {
        sessionStorage.removeItem("CrossingData");
        sessionStorage.removeItem("ValveEntryData");
        sessionStorage.removeItem("ValveUpdateData");
        sessionStorage.removeItem("progressData");
        sessionStorage.removeItem("CrossingUpdateData");
    event.preventDefault();
    if (confirm('Are you sure you want to update the selected Asset')) {
        $(this).siblings().removeClass('highlighted_row');
        $(this).addClass('highlighted_row');
        fetchAssetDetails(mobileServiceBaseURL + "GetPiplineDetails/" + $(this).children('td:first').text() + "/");
        pipelinecodeSelected = $(this).children('td:first').text();
        
    } else {
        event.preventDefault();
    }
})

function fetchAssetDetails(url) {
    $.ajax({
        method: "GET",
        url: url,
        success: function (data) {
            console.log(data);
            $('#submit_update').removeAttr('disabled');
            $('.pipedet').removeClass('hide');
            $('#pipedetails').trigger("click");
            $('#pipelinelist').trigger("click");

//            console.log(data[0].target_date);
            $('#estCost').val(data[0].est_cost);
            $('#estCost').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
                $('#targetdate').val(data[0].target_date);
                $('#targetdate').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
                });
                
            $('#contractAmt').val(data[0].contract_amt);
            $('#contractAmt').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            $('#agmtNumber').val(data[0].agrement);
            $('#agmtNumber').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            $('#agentName').val(data[0].agent);
            $('#agentName').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            console.log("fetch details JSON.stringify(data[3])" + JSON.stringify(data[3]));
            sessionStorage.setItem("hydraulicData", JSON.stringify(data[1]));
            sessionStorage.setItem("valveData", JSON.stringify(data[2]));
            sessionStorage.setItem("progressData", JSON.stringify(data[3]));
            sessionStorage.setItem("crossingUpdateData", JSON.stringify(data[4]));
            $('.gridContainerDiv').removeClass('hide');
//            console.log($('#fromTo').html())
            $('#fromTo').find('option:gt(0)').remove();

            $.each(data[1], function (item, value) {
                $('#fromTo').append($('<option>', {
                    value: value.strech_code,
                    text: "From JN: " + value.from_junction + " To JN: " + value.to_junction
                }));
            });

        },
        failure: function (error) {
            console.log(error);
        }
    });
}
$('#proceed').click(function (e){
    if($('#fromTo').val() == null || $('#fromTo').val() == ""){
      alert('please select strech to proceed further');  
    }else{
        $('#pipedetails').trigger("click"); 
        $('.strechdet').removeClass('hide');
        $('.strechprog').removeClass('hide');
    }
    
});
    $("body").on("change", '#fromTo', function (event) {
        console.log("Changed from to:" + $(this).val());
        var hydraulicData = JSON.parse(sessionStorage.getItem("hydraulicData"));
        var valveData = JSON.parse(sessionStorage.getItem("valveData"));
        var progressData = JSON.parse(sessionStorage.getItem("progressData"));
        var crossingUpdateData = JSON.parse(sessionStorage.getItem("crossingUpdateData"));
        $('#pipedetails').trigger("click"); 
        $('#strechdetails').trigger("click");
        $('.strechdet').removeClass('hide');
        $('.strechprog').removeClass('hide');
        $('.permission').removeClass('hide');
        $('.crossing').removeClass('hide');
        $('.prevprogress').removeClass('hide');
        $('.valveentry').removeClass('hide');
        $('.valveupdate').removeClass('hide');
        $('.phyprogress').removeClass('hide');
        $('.finalsubmit').removeClass('hide');
        $('.crossingupdate').removeClass('hide');
       console.log("1");
       $('#progressid').find('option:gt(0)').remove();
       $('#existValveType').find('option:gt(0)').remove();
        $.each(hydraulicData, function (item, value) {
//            console.log("latitude start"+value.lat_start);
//            console.log("long start"+value.long_start)
//            console.log(value.length_in_km);
//            console.log(value["sum(procured)"]);
//            console.log("value ---"+JSON.stringify(value));
//            console.log((parseFloat(value.length_in_km) - parseFloat(value["sum(procured)"])).toFixed(2));
//            console.log("1");
            if (value.strech_code === $('#fromTo').val()) {
                $('#class').val(value.class);
                $('#class').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
                });
                $('#strechtype').val(value.type);
                $('#strechtype').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
                });
                $('#dia').val(value.dia);
                $('#dia').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
                });
                $('#strechLength').val(value.length_in_km);
                $('#strechLength').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
                });
                $('#procured').val(value.sum);
                $('#procured').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
                });
                $('#strechEstCost').val(value.est_cost);
                $('#strechEstCost').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
                });
                $('#laid').val(value.laid);
                $('#laid').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
                });
                $('#aglLength').val(value.agl);
                $('#aglLength').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
                });
                $('#strechAmtPaid').val(value.amount_paid);
                $('#strechAmtPaid').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
                });
                $('#strechPaidDate').val(value.paid_date);
                $('#strechPaidDate').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
                });
//                $('#latitudeAtStart').val(value.lat_start);
//                $('#latitudeAtStart').next().css({
//                'top': '-0.3rem',
//                'font-size': '0.8rem'
//                });
//                $('#longitudeAtStart').val(value.long_start);
//                $('#longitudeAtStart').next().css({
//                'top': '-0.3rem',
//                'font-size': '0.8rem'
//                });
                $('#latitudeAtEnd').val(value.lat_end);
                $('#latitudeAtEnd').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
                });
                $('#longitudeAtEnd').val(value.long_end);
                $('#longitudeAtEnd').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
                });
                preparePipelineValveList(valveData, $('#fromTo').val());
                prepareStrechProgressList(progressData, $('#fromTo').val());
                prepareStrechCrossingUpdateList(crossingUpdateData, $('#fromTo').val());
            }
        });
    });
    
    function prepareStrechCrossingUpdateList(data, stretch_code) {
    $('#addStrechId').val(stretch_code);
    var hydraulicData = JSON.parse(sessionStorage.getItem("hydraulicData"));
    var valveData = JSON.parse(sessionStorage.getItem("valveData"));
    var progressData = JSON.parse(sessionStorage.getItem("progressData"));
    var crossingUpdateData = JSON.parse(sessionStorage.getItem("crossingUpdateData"));
    console.log(stretch_code);
    $.each(crossingUpdateData, function (item, value) {
            console.log(value.strech_code)
            console.log("progress ---"+JSON.stringify(value));
            console.log("1");
            if (value.strech_code == stretch_code) {
                
                $('#existCrossingType').append($('<option>', {
                    value: value.crossing_no,
                    text: "crossing: " + assetTypes[parseInt(value.crossing_type)] + " Entry Date: " + value.entry_date 
                }));
                
                
            }
        });
        
}
$('#existprmsnreq').on('change', function (e) {
    if($('#existprmsnreq').val() == "1"){
                    $('.prmsnobtained').removeClass('hide');
                }else if($('#existprmsnreq').val() == "2"){
                    $('.prmsnobtained').addClass('hide');
                }
});
$('#existCrossingType').on('change', function (e) {
    
        console.log("Changed from existCrossingType:" + $('#existCrossingType').val());
        var hydraulicData = JSON.parse(sessionStorage.getItem("hydraulicData"));
        var valveData = JSON.parse(sessionStorage.getItem("valveData"));
        var progressData = JSON.parse(sessionStorage.getItem("progressData"));
        var crossingUpdateData = JSON.parse(sessionStorage.getItem("crossingUpdateData"));
        console.log("crossingUpdateData update");
        $.each(crossingUpdateData, function (item, value) {
            if (value.crossing_no === $('#existCrossingType').val()) {
                console.log("inside crossing_no validation");
                console.log("value.crossing_no "+value.crossing_no + "---- + $('#existCrossingType').val()" + $('#existCrossingType').val()) ;
                $('#existprmsnobt').val(value.prmsn_obtained_status);
                $('#existprmsnobt').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
                });
                $('#existprmsnreq').val(value.prmsn_req_status);
                $('#existprmsnreq').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
                });
                
//                if(value.prmsn_req_status == "1"){
//                    $('.prmsnobtained').removeClass('hide');
//                }
                $('#existCrossinglatitudeAtStart').val(value.lat_start);
                $('#existCrossinglatitudeAtStart').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
                });
                $('#existCrossinglongitudeAtStart').val(value.long_start);
                $('#existCrossinglongitudeAtStart').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
                });
                $('#existCrossinglatitudeAtEnd').val(value.lat_end);
                $('#existCrossinglatitudeAtEnd').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
                });
                $('#existCrossinglongitudeAtEnd').val(value.long_end);
                $('#existCrossinglongitudeAtEnd').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
                });
            }
        });
    });
    
    function prepareStrechProgressList(data, stretch_code) {
    $('#addStrechId').val(stretch_code);
    var hydraulicData = JSON.parse(sessionStorage.getItem("hydraulicData"));
    var valveData = JSON.parse(sessionStorage.getItem("valveData"));
    var progressData = JSON.parse(sessionStorage.getItem("progressData"));
    console.log(stretch_code);
    $.each(progressData, function (item, value) {
            console.log(value.strech_code)
            console.log("progress ---"+JSON.stringify(value));
            console.log("1");
            if (value.strech_code == stretch_code) {
                
                $('#progressid').append($('<option>', {
                    value: value.entry_date,
                    text: "Progress Date: " + value.entry_date 
                }));
                
                
            }
        });
        
}

$('#progressid').on('change', function (e) {
    
        console.log("Changed from progressid:" + $('#progressid').val());
        var hydraulicData = JSON.parse(sessionStorage.getItem("hydraulicData"));
        var valveData = JSON.parse(sessionStorage.getItem("valveData"));
        var progressData = JSON.parse(sessionStorage.getItem("progressData"));
        console.log("progress update");
        $.each(progressData, function (item, value) {
            if (value.entry_date === $('#progressid').val()) {
                console.log("inside progressid validation");
                
                $('#progresslatitudeAtStart').val(value.lat_at_start);
                $('#progresslatitudeAtStart').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
                });
                $('#progresslongitudeAtStart').val(value.long_at_start);
                $('#progresslongitudeAtStart').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
                });
                $('#progresslatitudeAtEnd').val(value.lat_at_end);
                $('#progresslatitudeAtEnd').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
                });
                $('#progresslongitudeAtEnd').val(value.long_at_end);
                $('#progresslongitudeAtEnd').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
                });
            }
        });
    });
    
    function preparePipelineValveList(data, stretch_code) {
    $('#addStrechId').val(stretch_code);
    var hydraulicData = JSON.parse(sessionStorage.getItem("hydraulicData"));
    var valveData = JSON.parse(sessionStorage.getItem("valveData"));
    var progressData = JSON.parse(sessionStorage.getItem("progressData"));
//    console.log(stretch_code);
    $.each(valveData, function (item, value) {
//            console.log(value.dia);
//            console.log(value.strech_code)
//            console.log(value.valve_type);
//            console.log("value ---"+JSON.stringify(value));
//            console.log("1");
            if (value.strech_code === $('#fromTo').val()) {
                
                $('#existValveType').append($('<option>', {
                    value: value.valve_id,
                    text: "Valve: " + value.valve_type + " GPS: " + value.latitude + "-" + value.longitude
                }));
                
                
            }
        });
        

        
    $.each(data, function (key, obj) {
        $('#status' + obj.valve_id).val(obj.status)
    });
}

$('#existValveType').on('change', function (e) {
//    $('#existValveType').find('option:gt(0)').remove();
//        $('#existValveType').empty();
        console.log("Changed from existValveType:" + $('#existValveType').val());
        var hydraulicData = JSON.parse(sessionStorage.getItem("hydraulicData"));
        var valveData = JSON.parse(sessionStorage.getItem("valveData"));
        console.log("exist valve update");
        $.each(valveData, function (item, value) {
            if (value.valve_id === $('#existValveType').val()) {
                console.log("inside valve validation");
                $('#existValvedia').val(value.dia);
                $('#existValvedia').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
                });
                $('#existValvePr').val(value.class);
                $('#existValvePr').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
                });
                $('#existValveEstCost').val(value.est_cost);
                $('#existValveEstCost').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
                });
                $('#existValveContractAmt').val(value.contract_amt);
                $('#existValveContractAmt').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
                });
                $('#existValveEstCost').val(value.est_cost);
                $('#existValveEstCost').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
                });
                $('#existValveContractAmt').val(value.contract_amt);
                $('#existValveContractAmt').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
                });
                $('#existvalvelatitude').val(value.latitude);
                $('#existvalvelatitude').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
                });
                $('#existvalvelongitude').val(value.longitude);
                $('#existvalvelongitude').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
                });
            }
        });
    });
    
    $('#proceed').click(function (){
    $('.nav-tabs a[href="#messages"]').tab('show');
    });
    
    $('#work_sub').click(function (){
    $('.nav-tabs a[href="#settings"]').tab('show');
    });
    
    $('#valvegps').click(function (){
        getLocation($(this).attr('id'));
    });
    
    $('#valvegpsentry').click(function (){
        getLocation($(this).attr('id'));
    });
    
    $('#gpsStart').click(function (){
        getLocation($(this).attr('id'));
    });
    
    $('#gpsEnd').click(function (){
        getLocation($(this).attr('id'));
    });
    
    $('#crossinggpsStart').click(function (){
        getLocation($(this).attr('id'));
    });
    
    $('#CrossinggpsEnd').click(function (){
        getLocation($(this).attr('id'));
    });
    
    $('#progressgpsStart').click(function (){
        getLocation($(this).attr('id'));
    });
    
    $('#progressgpsEnd').click(function (){
        getLocation($(this).attr('id'));
    });
    
    $('#existcrossinggpsStart').click(function (){
        getLocation($(this).attr('id'));
    });
    
    $('#existCrossinggpsEnd').click(function (){
        getLocation($(this).attr('id'));
    });
    
var x = document.getElementById("demo");

function getLocation(data) {
    console.log("clicked gps"+data);
        if(data == "valvegpsentry"){
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPositionEntry);
            } else {
                x.innerHTML = "Geolocation is not supported by this browser.";
            }
        }else if(data == "valvegps"){
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPositionUpdate);
            } else {
                x.innerHTML = "Geolocation is not supported by this browser.";
            }
        }else if(data == "gpsStart"){
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPositionStart);
            } else {
                x.innerHTML = "Geolocation is not supported by this browser.";
            }
        }else if(data == "gpsEnd"){
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPositionEnd);
            } else {
                x.innerHTML = "Geolocation is not supported by this browser.";
            }
        }else if(data == "crossinggpsStart"){
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPositionCrossingStart);
            } else {
                x.innerHTML = "Geolocation is not supported by this browser.";
            }
        }else if(data == "CrossinggpsEnd"){
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPositionCrossingEnd);
            } else {
                x.innerHTML = "Geolocation is not supported by this browser.";
            }
        }else if(data == "progressgpsStart"){
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPositionProgressStart);
            } else {
                x.innerHTML = "Geolocation is not supported by this browser.";
            }
        }else if(data == "progressgpsEnd"){
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPositionProgressEnd);
            } else {
                x.innerHTML = "Geolocation is not supported by this browser.";
            }
        }else if(data == "existcrossinggpsStart"){
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPositionExistCrossingStart);
            } else {
                x.innerHTML = "Geolocation is not supported by this browser.";
            }
        }else if(data == "existCrossinggpsEnd"){
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPositionExistCrossingEnd);
            } else {
                x.innerHTML = "Geolocation is not supported by this browser.";
            }
        }
}


function showPositionUpdate(position) {
    $('#existvalvelatitude').val(position.coords.latitude);
    $('#existvalvelongitude').val(position.coords.longitude);
}
function showPositionEntry(position) {
    $('#valvelatitude').val(position.coords.latitude);
    $('#valvelongitude').val(position.coords.longitude);

}
function showPositionStart(position) {
    $('#latitudeAtStart').val(position.coords.latitude);
    $('#longitudeAtStart').val(position.coords.longitude);
    $('.gpsStart').addClass('hide');
}

function showPositionEnd(position) {
    $('#latitudeAtEnd').val(position.coords.latitude);
    $('#longitudeAtEnd').val(position.coords.longitude);
    $('.gpsEnd').addClass('hide');
}

function showPositionCrossingStart(position) {
    $('#CrossinglatitudeAtStart').val(position.coords.latitude);
    $('#CrossinglongitudeAtStart').val(position.coords.longitude);
}

function showPositionCrossingEnd(position) {
    $('#CrossinglatitudeAtEnd').val(position.coords.latitude);
    $('#CrossinglongitudeAtEnd').val(position.coords.longitude);
}

function showPositionProgressStart(position) {
    $('#progresslatitudeAtStart').val(position.coords.latitude);
    $('#progresslongitudeAtStart').val(position.coords.longitude);
}

function showPositionProgressEnd(position) {
    $('#progresslatitudeAtEnd').val(position.coords.latitude);
    $('#progresslongitudeAtEnd').val(position.coords.longitude);
}

function showPositionExistCrossingStart(position) {
    $('#existCrossinglatitudeAtStart').val(position.coords.latitude);
    $('#existCrossinglongitudeAtStart').val(position.coords.longitude);
}
function showPositionExistCrossingEnd(position) {
    $('#existCrossinglatitudeAtEnd').val(position.coords.latitude);
    $('#existCrossinglongitudeAtEnd').val(position.coords.longitude);

}

$('#submit_details').click(function (){
//    $('#submit_details').addClass('hide');
    if($('#assetImage').val() == null || $('#assetImage').val() == "" ){
    alert("please select image for strech physical progress to proceed further");
    $('#submit_details').removeClass('hide');
}else{
    if(document.getElementById('assetImage')) document.getElementById('assetImage').addEventListener('change', handleFileSelect, false);
}
    var dataToSubmitFinal = {};
        dataToSubmitFinal.district = $('#district').val();
        dataToSubmitFinal.segment = $('#segment').val();
        dataToSubmitFinal.netwrktyp = $('#netwrktyp').val();
        dataToSubmitFinal.type = $('#type').val();
        
        dataToSubmitFinal.piplineCode = pipelinecodeSelected;
        
        dataToSubmitFinal.strech_code = $('#fromTo').val();
        
        dataToSubmitFinal.ipproc = $('#ipproc').val();
        dataToSubmitFinal.iplaid = $('#iplaid').val();
        dataToSubmitFinal.ipagl = $('#ipagl').val();
        dataToSubmitFinal.strechIpPaidAmt = $('#strechIpPaidAmt').val();
        dataToSubmitFinal.strechipPaidDate = $('#strechipPaidDate').val();
        dataToSubmitFinal.ipmbook = $('#ipmbook').val();
        
        dataToSubmitFinal.rbStatus = $('#rbStatus').val();
        
        dataToSubmitFinal.hwStatus = $('#hwStatus').val();
        dataToSubmitFinal.prStatus = $('#prStatus').val();
        dataToSubmitFinal.riverStatus = $('#riverStatus').val();
        dataToSubmitFinal.forestStatus = $('#forestStatus').val();
        
        dataToSubmitFinal.latitudeAtStart = $('#latitudeAtStart').val();
        dataToSubmitFinal.longitudeAtStart = $('#longitudeAtStart').val();
        dataToSubmitFinal.latitudeAtEnd = $('#latitudeAtEnd').val();
        dataToSubmitFinal.longitudeAtEnd = $('#longitudeAtEnd').val();
//        if($('#assetImage').val() == null || $('#assetImage').val() == ""){
//            console.log("image not uploaded");
//        }else{
        dataToSubmitFinal.assetImage = /([^\\]+)$/.exec($('#assetImage').val())[1];
        dataToSubmitFinal.assetImageData = $('#assetImageData').val();
        console.log("asset image data"+  $('#assetImageData').val());
//        }
        dataToSubmitFinal.remarks = $('#remarks').val();
        dataToSubmitFinal.user_id = 'mobileadmin';
        
        console.log("in submit block")
        var data = [sessionStorage.getItem("CrossingData")];
        console.log(data);
        console.log(data.length);
        if(data[0] == null ){
            console.log("inside crossing data length validation");
            console.log("data[0]"+data[0]);
        }else{
            console.log("crossing details cond not null");
            dataToSubmitFinal.CrossingData = JSON.parse(sessionStorage.getItem("CrossingData"));
        }
        
        
        var data1 = [sessionStorage.getItem("ValveEntryData")];
        console.log(data1);
        console.log(data1.length);
        if(data1[0] == null ){
            console.log("inside ValveEntryData data length validation");
            console.log("data1[0]"+data1[0]);
        }else{
            console.log("ValveEntryData details cond not null");
            dataToSubmitFinal.ValveEntryData = JSON.parse(sessionStorage.getItem("ValveEntryData"));
        }
        
        var data2 = [sessionStorage.getItem("ValveUpdateData")];
        console.log(data2);
        console.log(data2.length);
        if(data2[0] == null ){
            console.log("inside ValveUpdateData data length validation");
            console.log("data2[0]"+data2[0]);
        }else{
            console.log("ValveUpdateData details cond not null");
            dataToSubmitFinal.ValveUpdateData = JSON.parse(sessionStorage.getItem("ValveUpdateData"));
        }
        
        var data3 = [sessionStorage.getItem("progressUpdateData")];
        console.log(data3);
        console.log(data3.length);
        if(data3[0] == null ){
            console.log("inside progressData data length validation");
            console.log("data3[0]"+data3[0]);
        }else{
            console.log("progressData details cond not null");
            dataToSubmitFinal.ProgressUpdateData = JSON.parse(sessionStorage.getItem("progressUpdateData"));
        }
        
        var data4 = [sessionStorage.getItem("CrossingUpdateData")];
        console.log(data4);
        console.log(data4.length);
        if(data4[0] == null ){
            console.log("inside CrossingUpdateData data length validation");
            console.log("data4[0]"+data4[0]);
        }else{
            console.log("CrossingUpdateData details cond not null");
            dataToSubmitFinal.CrossingUpdateData = JSON.parse(sessionStorage.getItem("CrossingUpdateData"));
        }
        
        console.log(JSON.stringify(dataToSubmitFinal));
        
        $.ajax({
        type: "POST",
        url: mobileServiceBaseURL + 'PiplineUpdate',
        contentType: 'application/json',
        data: JSON.stringify(dataToSubmitFinal),
        dataType: 'json',
        success: function (response) {
            if (response.status == "success") {
                console.log("in if");
                alert("Strech Details updated successfully");
                $('#submit_details').removeAttr('disabled');
                $('.sidebar-menu ul li.active a').trigger("click");
            } else if (response.status == "failure") {
                console.log("in else");
                alert("Something went wrong - Please try again");
                $('#submit_details').removeAttr('disabled');
            }
        }
    });
        
    });
    $('#prmsnreq').on('change', function (e) {
        if($('#prmsnreq').val() == "1"){
           $('.prmsnobtained').removeClass('hide'); 
        }
    });
    $('#add_crossing').click(function (event) {
    var errorFlag = [];
     if ($('#CrossinglatitudeAtStart').val() == null || $('#CrossinglatitudeAtStart').val() == "" || $('#CrossinglongitudeAtStart').val() == null || $('#CrossinglongitudeAtStart').val() == "" || $('#CrossinglatitudeAtEnd').val() == null || $('#CrossinglatitudeAtEnd').val() == "" || $('#CrossinglongitudeAtEnd').val() == null || $('#CrossinglongitudeAtEnd').val() == "" || $('#CrossingImage').val() == null || $('#CrossingImage').val() == "" ) {
        val = $(this).val();
        errorFlag.push(true);
        alert("Please fill all the fields to proceed further");
        event.preventDefault();
        return false;
    }
    var oldCrossingItems = [];
    if (sessionStorage.getItem('CrossingData') != null) {
        oldCrossingItems = JSON.parse(sessionStorage.getItem('CrossingData'));
        console.log("first:" + oldCrossingItems)
    }
  
    var dataToSubmit = {};
        
        dataToSubmit.crossingtype = $('#crossingtype').val();
        
        console.log("prmsnreq"+ $('#prmsnreq').val());
//        var reqstatus = $('#prmsnreq').val();
        if($('#prmsnreq').val() == "1"){
            console.log("inside obtained val");
         dataToSubmit.prmsnobt = $('#prmsnobt').val();
         dataToSubmit.prmsnreq = $('#prmsnreq').val();
        }else if($('#prmsnreq').val() == "0"){
            console.log("inside not req val");
            dataToSubmit.prmsnobt = "0";
            dataToSubmit.prmsnreq = $('#prmsnreq').val();
        }
        dataToSubmit.CrossinglatitudeAtStart = $('#CrossinglatitudeAtStart').val();
        dataToSubmit.CrossinglongitudeAtStart = $('#CrossinglongitudeAtStart').val();
        dataToSubmit.CrossinglatitudeAtEnd = $('#CrossinglatitudeAtEnd').val();
        dataToSubmit.CrossinglongitudeAtEnd = $('#CrossinglongitudeAtEnd').val();
        dataToSubmit.CrossingImage = /([^\\]+)$/.exec($('#CrossingImage').val())[1];
        dataToSubmit.CrossingImageData = $('#CrossingImageData').val();
        dataToSubmit.crossing_remarks = $('#crossing_remarks').val();
    
    oldCrossingItems.push(dataToSubmit);
    console.log(dataToSubmit);
    sessionStorage.setItem("CrossingData", JSON.stringify(oldCrossingItems));
    
    $('#crossingtype').val('');
    $('#prmsnreq').val('');
    $('#prmsnobt').val('');
    $('#CrossinglatitudeAtStart').val('');
    $('#CrossinglongitudeAtStart').val('');
    $('#CrossinglatitudeAtEnd').val('');
    $('#CrossinglongitudeAtEnd').val('');
    $('#CrossingImage').val('');
    $('#CrossingImageData').val('');
    $('#crossing_remarks').val('');
});

    $('#exist_add_crossing').click(function (event) {
    var errorFlag = [];
    if ($('#existCrossingType').val() == null || $('#existCrossingType').val() == "" ) {
        val = $(this).val();
        errorFlag.push(true);
        alert("Please select the crossing for update to proceed further");
        event.preventDefault();
        return false;
    }
    var oldCrossingUpdateItems = [];
    if (sessionStorage.getItem('CrossingUpdateData') != null) {
        oldCrossingUpdateItems = JSON.parse(sessionStorage.getItem('CrossingUpdateData'));
        console.log("first:" + oldCrossingUpdateItems)
    }
  
    var dataToCrossingUpdateSubmit = {};
        
        dataToCrossingUpdateSubmit.existCrossingType = $('#existCrossingType').val();
        console.log("crossing type"+ $('#existCrossingType').val());
        console.log("existprmsnreq"+ $('#existprmsnreq').val());
//        var reqstatus = $('#prmsnreq').val();
        if($('#existprmsnreq').val() == "1"){
            console.log("inside existprmsnreq obtained val");
         dataToCrossingUpdateSubmit.existprmsnobt = $('#existprmsnobt').val();
         dataToCrossingUpdateSubmit.existprmsnreq = $('#existprmsnreq').val();
        }else if($('#existprmsnreq').val() == "0"){
            console.log("inside existprmsnreq not req val");
            dataToCrossingUpdateSubmit.existprmsnobt = "0";
            dataToCrossingUpdateSubmit.existprmsnreq = $('#existprmsnreq').val();
        }
        dataToCrossingUpdateSubmit.existCrossinglatitudeAtStart = $('#existCrossinglatitudeAtStart').val();
        dataToCrossingUpdateSubmit.existCrossinglongitudeAtStart = $('#existCrossinglongitudeAtStart').val();
        dataToCrossingUpdateSubmit.existCrossinglatitudeAtEnd = $('#existCrossinglatitudeAtEnd').val();
        dataToCrossingUpdateSubmit.existCrossinglongitudeAtEnd = $('#existCrossinglongitudeAtEnd').val();
        dataToCrossingUpdateSubmit.existCrossingImage = /([^\\]+)$/.exec($('#existCrossingImage').val())[1];
        dataToCrossingUpdateSubmit.existCrossingImageData = $('#existCrossingImageData').val();
        dataToCrossingUpdateSubmit.existcrossing_remarks = $('#existcrossing_remarks').val();
    
    oldCrossingUpdateItems.push(dataToCrossingUpdateSubmit);
    console.log(dataToCrossingUpdateSubmit);
    sessionStorage.setItem("CrossingUpdateData", JSON.stringify(oldCrossingUpdateItems));
    
    $('#existCrossingType').val('');
    $('#existprmsnreq').val('');
    $('#existprmsnobt').val('');
    $('#existCrossinglatitudeAtStart').val('');
    $('#existCrossinglongitudeAtStart').val('');
    $('#existCrossinglatitudeAtEnd').val('');
    $('#existCrossinglongitudeAtEnd').val('');
    $('#existCrossingImage').val('');
    $('#existCrossingImageData').val('');
    $('#existcrossing_remarks').val('');
});

$('#valve_entry').click(function (event) {
    var errorFlag = [];
    if ($('#valveType').val() == null || $('#valveType').val() == "" || $('#valveDia').val() == null || $('#valveDia').val() == "" || $('#valvePr').val() == null || $('#valvePr').val() == "" || $('#valveStatus').val() == null || $('#valveStatus').val() == "" || $('#valvelatitude').val() == null || $('#valvelatitude').val() == "" || $('#valvelongitude').val() == null || $('#valvelongitude').val() == "" || $('#valveEntryImage').val() == null || $('#valveEntryImage').val() == "" ) {
        val = $(this).val();
        errorFlag.push(true);
        alert("Please fill all the fields to proceed further");
        event.preventDefault();
        return false;
    }
    var oldValveItems = [];var dataToValveEntry = {}
    if (sessionStorage.getItem('ValveEntryData') != null) {
        oldValveItems = JSON.parse(sessionStorage.getItem('ValveEntryData'));
        console.log("first:" + oldValveItems);
    }
        dataToValveEntry.valveType = $('#valveType').val();
        dataToValveEntry.valveDia = $('#valveDia').val();
        dataToValveEntry.valvePr = $('#valvePr').val();
        dataToValveEntry.valveEstcost = $('#valveEstcost').val();
        dataToValveEntry.valveContracAmt = $('#valveContracAmt').val();
        dataToValveEntry.valveAmtPaid = $('#valveAmtPaid').val();
        dataToValveEntry.valvePaidDate = $('#valvePaidDate').val();
        dataToValveEntry.valveMbook = $('#valveMbook').val();
        dataToValveEntry.valveStatus = $('#valveStatus').val();
        dataToValveEntry.valvelatitude = $('#valvelatitude').val();
        dataToValveEntry.valvelongitude = $('#valvelongitude').val();
        dataToValveEntry.valveEntryImage = /([^\\]+)$/.exec($('#valveEntryImage').val())[1];
        dataToValveEntry.valveEntryImageData = $('#valveEntryImageData').val();
        dataToValveEntry.valveentryremarks = $('#valveentryremarks').val();
        
        
        oldValveItems.push(dataToValveEntry);
        console.log(dataToValveEntry);
        console.log("valve entry data"+JSON.stringify(oldValveItems));
        
        sessionStorage.setItem("ValveEntryData", JSON.stringify(oldValveItems));
    $('#valveType').val('');
    $('#valveDia').val('');
    $('#valvePr').val('');
    $('#valveEstcost').val('');
    $('#valveContracAmt').val('');
    $('#valveAmtPaid').val('');
    $('#valvePaidDate').val('');
    $('#valveMbook').val('');
    $('#valveStatus').val('');
    $('#valvelatitude').val('');
    $('#valvelongitude').val('');
    $('#valveEntryImage').val('');
    $('#valveEntryImageData').val('');
    $('#valveentryremarks').val('');
});

$('#valve_update').click(function (event) {
    var errorFlag = [];
    if ($('#existValveType').val() == null || $('#existValveType').val() == "" ) {
        val = $(this).val();
        errorFlag.push(true);
        alert("Please select the valve to be updated to proceed further");
        event.preventDefault();
        return false;
    }
    
    var valveData = JSON.parse(sessionStorage.getItem("valveData"));
    var oldValveUpdateItems = [];var dataToValveUpdate = {}
    if (sessionStorage.getItem('ValveUpdateData') != null) {
        oldValveUpdateItems = JSON.parse(sessionStorage.getItem('ValveUpdateData'));
        console.log("first:" + oldValveUpdateItems);
    }
        $.each(valveData, function (item, value) {
            if (value.valve_id === $('#existValveType').val()) {
              dataToValveUpdate.existValveType = $('#existValveType').val();  
            }
        });
        
        dataToValveUpdate.existValvedia = $('#existValvedia').val();
        dataToValveUpdate.existValvePr = $('#existValvePr').val();
        dataToValveUpdate.existValveEstCost = $('#existValveEstCost').val();
        dataToValveUpdate.existValveContractAmt = $('#existValveContractAmt').val();
        dataToValveUpdate.existvalveAmtPaid = $('#existvalveAmtPaid').val();
        dataToValveUpdate.existvalvePaidDate = $('#existvalvePaidDate').val();
        dataToValveUpdate.existvalveMbook = $('#existvalveMbook').val();
        dataToValveUpdate.existvalveStatus = $('#existvalveStatus').val();
        dataToValveUpdate.existvalvelatitude = $('#existvalvelatitude').val();
        dataToValveUpdate.existvalvelongitude = $('#existvalvelongitude').val();
        dataToValveUpdate.valveUpdateImage = /([^\\]+)$/.exec($('#valveUpdateImage').val())[1];
        dataToValveUpdate.valveUpdateImageData = $('#valveUpdateImageData').val();
        dataToValveUpdate.valveupdateremarks = $('#valveupdateremarks').val();
        
        
        oldValveUpdateItems.push(dataToValveUpdate);
        console.log(dataToValveUpdate);
        console.log("valve update data"+JSON.stringify(oldValveUpdateItems));
        
        sessionStorage.setItem("ValveUpdateData", JSON.stringify(oldValveUpdateItems));
    $('#existValveType').val('');
    $('#existValvedia').val('');
    $('#existValvePr').val('');
    $('#existValveEstCost').val('');
    $('#existValveContractAmt').val('');
    $('#existvalveAmtPaid').val('');
    $('#existvalvePaidDate').val('');
    $('#existvalveMbook').val('');
    $('#existvalveStatus').val('');
    $('#existvalvelatitude').val('');
    $('#existvalvelongitude').val('');
    $('#valveUpdateImage').val('');
    $('#valveUpdateImageData').val('');
    $('#valveupdateremarks').val('');
});

$('#add_modification').click(function (event) {
    var errorFlag = [];
    if ($('#progressid').val() == null || $('#progressid').val() == "" || $('#progresslatitudeAtStart').val() == null || $('#progresslatitudeAtStart').val() == "" || $('#progresslongitudeAtStart').val() == null || $('#progresslongitudeAtStart').val() == "" || $('#progresslatitudeAtEnd').val() == null || $('#progresslatitudeAtEnd').val() == "" || $('#progresslongitudeAtEnd').val() == null || $('#progresslongitudeAtEnd').val() == ""  ) {
        val = $(this).val();
        errorFlag.push(true);
        alert("Please fill all the fields to proceed further");
        event.preventDefault();
        return false;
    }
    
    var progressData = JSON.parse(sessionStorage.getItem("progressData"));
    var oldProgressUpdateItems = [];var dataToProgressUpdate = {}
    if (sessionStorage.getItem('progressUpdateData') != null) {
        oldProgressUpdateItems = JSON.parse(sessionStorage.getItem('progressUpdateData'));
        console.log("first:" + oldProgressUpdateItems);
        console.log("first:" + JSON.stringify(oldProgressUpdateItems));
    }
//        $.each(progressData, function (item, value) {
//            if (value.progressid === $('#progressid').val()) {
//                console.log("inside old items progress id loop");
//                console.log("value.progressid"+value.progressid);
                console.log("$('#progressid').val()" +$('#progressid').val());
              dataToProgressUpdate.progressid = $('#progressid').val();  
//            }
//        });
        
        dataToProgressUpdate.progresslatitudeAtStart = $('#progresslatitudeAtStart').val();
        dataToProgressUpdate.progresslongitudeAtStart = $('#progresslongitudeAtStart').val();
        dataToProgressUpdate.progresslatitudeAtEnd = $('#progresslatitudeAtEnd').val();
        dataToProgressUpdate.progresslongitudeAtEnd = $('#progresslongitudeAtEnd').val();
        dataToProgressUpdate.modification_reasons = $('#modification_reasons').val();
        
        
        oldProgressUpdateItems.push(dataToProgressUpdate);
        console.log(dataToProgressUpdate);
        console.log("Progress update data"+JSON.stringify(oldProgressUpdateItems));
        
        sessionStorage.setItem("progressUpdateData", JSON.stringify(oldProgressUpdateItems));
    $('#progressid').val('');
    $('#progresslatitudeAtStart').val('');
    $('#progresslongitudeAtStart').val('');
    $('#progresslatitudeAtEnd').val('');
    $('#progresslongitudeAtEnd').val('');
    $('#modification_reasons').val('');
});

$(document).ready(function () {
    sessionStorage.removeItem("CrossingData");
    sessionStorage.removeItem("ValveEntryData");
    sessionStorage.removeItem("ValveUpdateData");
    sessionStorage.removeItem("progressUpdateData");
    sessionStorage.removeItem("CrossingUpdateData");
});

$('#gpsupdate').on('change', function (e) {
    console.log(" $('#gpsupdate').val()"+$('#gpsupdate').val());
    if($('#gpsupdate').val() == "start"){
        $('.start').removeClass('hide');
        $('.gpsStart').removeClass('hide');
    }
    if($('#gpsupdate').val() == "end"){
        $('.end').removeClass('hide');
        $('.gpsEnd').removeClass('hide');
    }
});