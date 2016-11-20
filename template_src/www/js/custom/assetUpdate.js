/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var mobileServiceBaseURL = "/tdwsp/mobileServiceClient/";

if(document.getElementById('assetImage')) document.getElementById('assetImage').addEventListener('change', handleFileSelect, false);

var assetTypes = new Array();
assetTypes[1] = "Intake Structure";
assetTypes[2] = "WTP";
assetTypes[3] = "SUMP";
assetTypes[4] = "OHBR";
assetTypes[5] = "BPT";
assetTypes[6] = "GLBR";
assetTypes[7] = "OHSR";
assetTypes[8] = "GLSR";
assetTypes[9] = "Pump House";
assetTypes[10] = "Footpath Bridge";
assetTypes[11] = "Pumps";




loadMasters('district', mobileServiceBaseURL + "GetDistricts");

$('#district').on('change', function (e) {
    
    $('#constituency').find('option:gt(0)').remove();
    $('#constituency').val('');
    $('#mandal').find('option:gt(0)').remove();
    $('#mandal').val('');
    $('#panchayat').find('option:gt(0)').remove();
    $('#panchayat').val('');
    $('#village').find('option:gt(0)').remove();
    $('#village').val('');
    $('#habitation').find('option:gt(0)').remove();
    $('#habitation').val('');
    $('#segment').find('option:gt(0)').remove();
    $('#segment').val('');
    $('#asset_type').val('');
    loadMasters('constituency', mobileServiceBaseURL + "GetConstituencies/" + $(this).val());
    loadMasters('segment', mobileServiceBaseURL + "GetSegmentsByDist1/" + $('#district').val());
});

$('#constituency').on('change', function (e) {
    
    $('#mandal').find('option:gt(0)').remove();
    $('#mandal').val('');
    $('#panchayat').find('option:gt(0)').remove();
    $('#panchayat').val('');
    $('#village').find('option:gt(0)').remove();
    $('#village').val('');
    $('#habitation').find('option:gt(0)').remove();
    $('#habitation').val('');
//    $('#segment').find('option:gt(0)').remove();
//    $('#segment').val('');
    $('#asset_type').val('');
    loadMasters('mandal', mobileServiceBaseURL + "GetMandals/" + $('#district').val() + "/" + $('#constituency').val());
});

$('#mandal').on('change', function (e) {
    
    $('#panchayat').find('option:gt(0)').remove();
    $('#panchayat').val('');
    $('#village').find('option:gt(0)').remove();
    $('#village').val('');
    $('#habitation').find('option:gt(0)').remove();
    $('#habitation').val('');
//    $('#segment').find('option:gt(0)').remove();
//    $('#segment').val('');
    $('#asset_type').val('');
    loadMasters('panchayat', mobileServiceBaseURL + "GetPanchayats/" + $('#district').val() + "/" + $('#constituency').val() + "/" + $('#mandal').val());
});

$('#panchayat').on('change', function (e) {
    
    $('#village').find('option:gt(0)').remove();
    $('#village').val('');
    $('#habitation').find('option:gt(0)').remove();
    $('#habitation').val('');
//    $('#segment').find('option:gt(0)').remove();
//    $('#segment').val('');
    $('#asset_type').val('');
    loadMasters('village', mobileServiceBaseURL + "GetVillages/" + $('#district').val() + "/" + $('#constituency').val() + "/" + $('#mandal').val() + "/" + $('#panchayat').val());
});

$('#village').on('change', function (e) {
    
    $('#habitation').find('option:gt(0)').remove();
    $('#habitation').val('');
//    $('#segment').find('option:gt(0)').remove();
//    $('#segment').val('');
    $('#asset_type').val('');
    loadMasters('habitation', mobileServiceBaseURL + "GetHabs/" + $('#district').val() + "/" + $('#constituency').val() + "/" + $('#mandal').val() + "/" + $('#panchayat').val() + "/" + $('#village').val());
});




$('#search_asset').click(function (){
    $('.search_asset').addClass('hide');
    $('.nav-tabs a[href="#profile"]').tab('show');
    
    $.ajax({
            method: "GET",
           
            url: mobileServiceBaseURL + "GetAssets/" + $('#habitation').val() + "/" + $('#asset_type').val() + "/" + $('#segment').val() + "/",
            success: function (data) {
                
                if (data.length > 0) {
                    $('.assets_list').html(prepareAssetList(data[0]));
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
    var thead = '<thead> <tr><th data-field="id" class="center hide" style="width: 45%">Asset Code</th>';
    thead += '<th data-field="id" class="center" style="width: 45%">Structure</th>';
    var tbody = '<tbody>';
    if ($('#asset_type').val() == "01") {
        $('.intake').removeClass('hide');
        thead += '<th data-field="name" class="center">Circle Dia</th>';
        thead += '<th data-field="name" class="center">Circle Height</th>';
        thead += '<th data-field="name" class="center">Rectangle Length</th>';
        thead += '<th data-field="name" class="center">Rectangle Breadth</th>';
        thead += '<th data-field="name" class="center">Rectangle Height</th>';
    }
    if ($('#asset_type').val() == "02") {
        $('.wtp').removeClass('hide');
        thead += '<th data-field="name" class="center">Capacity</th>';
    }
    if ($('#asset_type').val() == "03") {
        $('.sump').removeClass('hide');
        thead += '<th data-field="name" class="center">Sump Dia</th>';
        thead += '<th data-field="name" class="center">Sump Height</th>';
        thead += '<th data-field="name" class="center">Sump Length</th>';
        thead += '<th data-field="name" class="center">Sump Breadth</th>';
        thead += '<th data-field="name" class="center">Sump Height</th>';
    }
    if ($('#asset_type').val() == "04" || $('#asset_type').val() == "05" || $('#asset_type').val() == "06" || $('#asset_type').val() == "07" || $('#asset_type').val() == "08") {
        thead += '<th data-field="name" class="center">Capacity</th>';
        thead += '<th data-field="name" class="center">Staging</th>';
        $('.ohbr').removeClass('hide');
        
    }
    if ($('#asset_type').val() == "10") {
        $('.fpb').removeClass('hide');
        thead += '<th data-field="name" class="center">Length</th>';
        thead += '<th data-field="name" class="center">Width</th>';
        thead += '<th data-field="name" class="center">Height</th>';
    }
    if ($('#asset_type').val() == "11") {
        $('.fpb').removeClass('hide');
        thead += '<th data-field="name" class="center">TYPE</th>';
        thead += '<th data-field="name" class="center">Make</th>';
        thead += '<th data-field="name" class="center">No.of Pumps</th>';
        thead += '<th data-field="name" class="center">Discharge</th>';
        thead += '<th data-field="name" class="center">Design</th>';
    }
    if ($('#asset_type').val() == "14") {
        $('.fpb').removeClass('hide');
        thead += '<th data-field="name" class="center">Length</th>';
        thead += '<th data-field="name" class="center">Width</th>';
        thead += '<th data-field="name" class="center">Height</th>';
    }
    if ($('#asset_type').val() == "15") {
        $('.fpb').removeClass('hide');
        thead += '<th data-field="name" class="center">Length</th>';
        thead += '<th data-field="name" class="center">Width</th>';
        thead += '<th data-field="name" class="center">Height</th>';
    }
    $.each(data, function (key, obj) {
//        console.log(obj);
        tbody += '<tr>';
        tbody += ' <td class="center hide">' + obj.asset_code + '</td>';
        tbody += ' <td class="center">' + assetTypes[parseInt(obj.assetType)]+ '</td>';
        if ($('#asset_type').val() == "01") {
            tbody += '<td class="center">' + (obj.intake_dia != undefined ? obj.intake_dia : '-') + '</td>';
            tbody += '<td class="center">' + (obj.intake_height != undefined ? obj.intake_height : '-') + '</td>';
            tbody += '<td class="center">' + (obj.intake_length != undefined ? obj.intake_length : '-') + '</td>';
            tbody += '<td class="center">' + (obj.intake_breadth != undefined ? obj.intake_breadth : '-') + '</td>';
            tbody += '<td class="center">' + (obj.intake_rect_height != undefined ? obj.intake_rect_height : '-') + '</td>';

        }
        if ($('#asset_type').val() == "02") {
            tbody += '<td class="center">' + (obj.wtp_capacity != undefined ? obj.wtp_capacity : '-') + '</td>';
        }
        if ($('#asset_type').val() == "03") {
            tbody += '<td class="center">' + (obj.sump_dia != undefined ? obj.sump_dia : '-') + '</td>';
            tbody += '<td class="center">' + (obj.sump_height != undefined ? obj.sump_height : '-') + '</td>';
            tbody += '<td class="center">' + (obj.sump_length != undefined ? obj.sump_length : '-') + '</td>';
            tbody += '<td class="center">' + (obj.sump_breadth != undefined ? obj.sump_breadth : '-') + '</td>';
            tbody += '<td class="center">' + (obj.sump_rect_height != undefined ? obj.sump_rect_height : '-') + '</td>';

        }
        if ($('#asset_type').val() == "04") {
            tbody += '<td class="center">' + (obj.ohbr_capacity != undefined ? obj.ohbr_capacity : '-') + '</td>';
            tbody += '<td class="center">' + (obj.ohbr_staging != undefined ? obj.ohbr_staging : '-') + '</td>';

        }
        if ($('#asset_type').val() == "05") {
            tbody += '<td class="center">' + (obj.bpt_capacity != undefined ? obj.bpt_capacity : '-') + '</td>';
            tbody += '<td class="center">' + (obj.bpt_staging != undefined ? obj.bpt_staging : '-') + '</td>';

        }
        if ($('#asset_type').val() == "06") {
            tbody += '<td class="center">' + (obj.glbr_capacity != undefined ? obj.glbr_capacity : '-') + '</td>';
            tbody += '<td class="center">' + (obj.glbr_staging != undefined ? obj.glbr_staging : '-') + '</td>';

        }
        if ($('#asset_type').val() == "07") {
            tbody += '<td class="center">' + (obj.ohsr_capacity != undefined ? obj.ohsr_capacity : '-') + '</td>';
            tbody += '<td class="center">' + (obj.ohsr_staging != undefined ? obj.ohsr_staging : '-') + '</td>';

        }
        if ($('#asset_type').val() == "08") {
            tbody += '<td class="center">' + (obj.glsr_capacity != undefined ? obj.glsr_capacity : '-') + '</td>';
            tbody += '<td class="center">' + (obj.glsr_staging != undefined ? obj.glsr_staging : '-') + '</td>';

        }
        if ($('#asset_type').val() == "09") {
            tbody += '<td class="center">' + (obj.pumphouse_dia != undefined ? obj.pumphouse_dia : '-') + '</td>';
            tbody += '<td class="center">' + (obj.pumphouse_height != undefined ? obj.pumphouse_height : '-') + '</td>';
            tbody += '<td class="center">' + (obj.pumphouse_length != undefined ? obj.pumphouse_length : '-') + '</td>';
            tbody += '<td class="center">' + (obj.pumphouse_breadth != undefined ? obj.pumphouse_breadth : '-') + '</td>';
            tbody += '<td class="center">' + (obj.pumphouse_rect_height != undefined ? obj.pumphouse_rect_height : '-') + '</td>';

        }
        if ($('#asset_type').val() == "10") {
            tbody += '<td class="center">' + (obj.fpb_width != undefined ? obj.fpb_width : '-') + '</td>';
            tbody += '<td class="center">' + (obj.fpb_length != undefined ? obj.fpb_length : '-') + '</td>';
            tbody += '<td class="center">' + (obj.fpb_height != undefined ? obj.fpb_height : '-') + '</td>';
        }
        if ($('#asset_type').val() == "11") {
            tbody += '<td class="center">' + (obj.pump_type != undefined ? obj.pump_type : '-') + '</td>';
            tbody += '<td class="center">' + (obj.pump_make != undefined ? obj.pump_make : '-') + '</td>';
            tbody += '<td class="center">' + (obj.pump_count != undefined ? obj.pump_count : '-') + '</td>';
            tbody += '<td class="center">' + (obj.pump_discharge != undefined ? obj.pump_discharge : '-') + '</td>';
            tbody += '<td class="center">' + (obj.pump_design != undefined ? obj.pump_design : '-') + '</td>';
        }
        if ($('#asset_type').val() == "14") {
            tbody += '<td class="center">' + (obj.thrust_width != undefined ? obj.thrust_width : '-') + '</td>';
            tbody += '<td class="center">' + (obj.thrust_length != undefined ? obj.thrust_length : '-') + '</td>';
            tbody += '<td class="center">' + (obj.thrust_height != undefined ? obj.thrust_height : '-') + '</td>';
        }
        if ($('#asset_type').val() == "15") {
            tbody += '<td class="center">' + (obj.valvechamber_width != undefined ? obj.valvechamber_width : '-') + '</td>';
            tbody += '<td class="center">' + (obj.valvechamber_length != undefined ? obj.valvechamber_length : '-') + '</td>';
            tbody += '<td class="center">' + (obj.valvechamber_height != undefined ? obj.valvechamber_height : '-') + '</td>';
        }
        tbody += '</tr>';
    });

    thead += '</tr></thead>'
    html = table + thead + tbody + '</tbody></table>';
    return html;
}


$("body").on("click", '.dynamic_table > tbody > tr', function (event) {
    event.preventDefault();
    if (confirm('Are you sure you want to update the selected Asset')) {
        $(this).siblings().removeClass('highlighted_row');
        $(this).addClass('highlighted_row');
        fetchAssetDetails(mobileServiceBaseURL + "GetAssetDetails/" + $(this).children('td:first').text() + "/");
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
            console.log("data[0]"+JSON.stringify(data[0]));
            assetCompPer = 0;
            $('#submit_update').removeAttr('disabled');
            $('#asset').val(data[0].assetType);
            $('#asset').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            $('#asset').trigger('change');
            console.log("latitude"+data[0].latitude);
            
            $('#targetdate').val(data[0].target_date);
            $('#targetdate').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            $('#agmtdate').val(data[0].agmt_date);
            $('#agmtdate').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
             console.log(" inside lat long cond");
            $('#amtPaid').val(data[3].amountPaid);
            $('#amtPaid').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#compPer').val(data[3].assetCompPer);
            $('#compPer').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            if(data[3].assetCompPer == "100"){
               $('.ipcompPerclass').addClass('hide');
               $('.compAsset').removeClass('hide');
               $('#compPerip').val(data[3].assetCompPer);
               $('#compPerip').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
               
                $('#latitude').val(data[0].latitude);
                $('#latitude').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
                $('#longitude').val(data[0].langtitude);
                $('#longitude').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('.assets_info').removeClass('hide');
            $('.work').addClass('hide');
            }
            
            $('#contractAmt').val(data[0].contract_amount);
            $('#contractAmt').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            $('#agmtNumber').val(data[0].agmt_number);
            $('#agmtNumber').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#agreementdate').val(data[0].agmt_date);
            $('#agreementdate').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#agentName').val(data[0].agent_name);
            $('#agentName').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#estCost').val(data[0].est_cost);
            $('#estCost').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            $('#location').val(data[0].location);
            $('#location').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#pflstage').val(data[2].pflstage.split("-")[0]);
            $('#pflstage').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#intake_pfl_remarks').val(data[2].pflstage.split("-")[1]);
            $('#intake_pfl_remarks').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#sidewalllevel').val(data[2].sidewalllevel.split("-")[0]);
            $('#sidewalllevel').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#intake_sidewall_remarks').val(data[2].sidewalllevel.split("-")[1]);
            $('#intake_sidewall_remarks').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#intakeFinishingStage').val(data[2].intakeFinishingStage.split("-")[0]);
            $('#intakeFinishingStage').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#intake_finishing_remarks').val(data[2].intakeFinishingStage.split("-")[1]);
            $('#intake_finishing_remarks').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#wtp_aerator').val(data[2].wtp_aerator.split("-")[0]);
            $('#wtp_aerator').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#wtp_aerator_remarks').val(data[2].wtp_aerator.split("-")[1]);
            $('#wtp_aerator_remarks').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#wtp_flashmixer').val(data[2].wtp_flashmixer.split("-")[0]);
            $('#wtp_flashmixer').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#wtp_flashmix_remarks').val(data[2].wtp_flashmixer.split("-")[1]);
            $('#wtp_flashmix_remarks').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#wtp_backwash').val(data[2].wtp_backwash.split("-")[0]);
            $('#wtp_backwash').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#wtp_backwash_remarks').val(data[2].wtp_backwash.split("-")[1]);
            $('#wtp_backwash_remarks').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#wtp_chemical_house').val(data[2].wtp_chemical_house.split("-")[0]);
            $('#wtp_chemical_house').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#wtp_chem_remarks').val(data[2].wtp_chemical_house.split("-")[1]);
            $('#wtp_chem_remarks').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#wtp_chlorination').val(data[2].wtp_chlorination.split("-")[0]);
            $('#wtp_chlorination').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#wtp_cholorination_remarks').val(data[2].wtp_chlorination.split("-")[1]);
            $('#wtp_cholorination_remarks').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#wtp_clariflocculator').val(data[2].wtp_clariflocculator.split("-")[0]);
            $('#wtp_clariflocculator').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#wtp_clarifloc_remarks').val(data[2].wtp_clariflocculator.split("-")[1]);
            $('#wtp_clarifloc_remarks').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#wtp_filter_house').val(data[2].wtp_filter_house.split("-")[0]);
            $('#wtp_filter_house').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#wtp_filter_house_remarks').val(data[2].wtp_filter_house.split("-")[1]);
            $('#wtp_filter_house_remarks').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#wtp_electromech').val(data[2].wtp_electromech.split("-")[0]);
            $('#wtp_electromech').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#wtp_electromech_remarks').val(data[2].wtp_electromech.split("-")[1]);
            $('#wtp_electromech_remarks').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#wtp_trialrun').val(data[2].wtp_trialrun.split("-")[0]);
            $('#wtp_trialrun').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#wtp_trialrun_remarks').val(data[2].wtp_trialrun.split("-")[1]);
            $('#wtp_trialrun_remarks').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            
            $('#sumpEwExcavation').val(data[2].sumpEwExcavation.split("-")[0]);
            $('#sumpEwExcavation').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#sumpEwExcavation_remarks').val(data[2].sumpEwExcavation.split("-")[1]);
            $('#sumpEwExcavation_remarks').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#sumpPccstage').val(data[2].sumpPccstage.split("-")[0]);
            $('#sumpPccstage').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#sumpPccstage_remarks').val(data[2].sumpPccstage.split("-")[1]);
            $('#sumpPccstage_remarks').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#sumpRaftstage').val(data[2].sumpRaftstage.split("-")[0]);
            $('#sumpRaftstage').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#sumpRaftstage_remarks').val(data[2].sumpRaftstage.split("-")[1]);
            $('#sumpRaftstage_remarks').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            
            $('#sumpSidewallStaging').val(data[2].sumpSidewallStaging.split("-")[0]);
            $('#sumpSidewallStaging').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#sumpSidewallStaging_remarks').val(data[2].sumpSidewallStaging.split("-")[1]);
            $('#sumpSidewallStaging_remarks').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#sumpTopSlabLevel').val(data[2].sumpTopSlabLevel.split("-")[0]);
            $('#sumpTopSlabLevel').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#sumpTopSlabLevel_remarks').val(data[2].sumpTopSlabLevel.split("-")[1]);
            $('#sumpTopSlabLevel_remarks').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#sumpCiSpecial').val(data[2].sumpCiSpecial.split("-")[0]);
            $('#sumpCiSpecial').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#sumpCiSpecial_remarks').val(data[2].sumpCiSpecial.split("-")[1]);
            $('#sumpCiSpecial_remarks').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#sumpFinishingStage').val(data[2].sumpFinishingStage.split("-")[0]);
            $('#sumpFinishingStage').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#sumpFinishingStage_remarks').val(data[2].sumpFinishingStage.split("-")[1]);
            $('#sumpFinishingStage_remarks').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            
            $('#ewExcavation').val(data[2].ewExcavation.split("-")[0]);
            $('#ewExcavation').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#ewExcavation_remarks').val(data[2].ewExcavation.split("-")[1]);
            $('#ewExcavation_remarks').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#pccstage').val(data[2].pccstage.split("-")[0]);
            $('#pccstage').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#pccstage_remarks').val(data[2].pccstage.split("-")[1]);
            $('#pccstage_remarks').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#raftstage').val(data[2].raftstage.split("-")[0]);
            $('#raftstage').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#raftstage_remarks').val(data[2].raftstage.split("-")[1]);
            $('#raftstage_remarks').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#glstage').val(data[2].glstage.split("-")[0]);
            $('#glstage').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#glstage_remarks').val(data[2].glstage.split("-")[1]);
            $('#glstage_remarks').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#stagingLevel').val(data[2].stagingLevel.split("-")[0]);
            $('#stagingLevel').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#stagingLevel_remarks').val(data[2].stagingLevel.split("-")[1]);
            $('#stagingLevel_remarks').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#bottomSlab').val(data[2].bottomSlab.split("-")[0]);
            $('#bottomSlab').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#bottomSlab_remarks').val(data[2].bottomSlab.split("-")[1]);
            $('#bottomSlab_remarks').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            
            $('#sidewallStaging').val(data[2].sidewallStaging.split("-")[0]);
            $('#sidewallStaging').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#sidewallStaging_remarks').val(data[2].sidewallStaging.split("-")[1]);
            $('#sidewallStaging_remarks').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#topSlabLevel').val(data[2].topSlabLevel.split("-")[0]);
            $('#topSlabLevel').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#topSlabLevel_remarks').val(data[2].topSlabLevel.split("-")[1]);
            $('#topSlabLevel_remarks').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#ciSpecial').val(data[2].ciSpecial.split("-")[0]);
            $('#ciSpecial').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#ciSpecial_remarks').val(data[2].ciSpecial.split("-")[1]);
            $('#ciSpecial_remarks').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#finishingStage').val(data[2].finishingStage.split("-")[0]);
            $('#finishingStage').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#finishingStage_remarks').val(data[2].finishingStage.split("-")[1]);
            $('#finishingStage_remarks').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#foundationstage').val(data[2].foundationstage.split("-")[0]);
            $('#foundationstage').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#foundationstage_remarks').val(data[2].foundationstage.split("-")[1]);
            $('#foundationstage_remarks').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#columnstage').val(data[2].columnstage.split("-")[0]);
            $('#columnstage').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#columnstage_remarks').val(data[2].columnstage.split("-")[1]);
            $('#columnstage_remarks').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#slabLevel').val(data[2].slabLevel.split("-")[0]);
            $('#slabLevel').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#slabLevel_remarks').val(data[2].slabLevel.split("-")[1]);
            $('#slabLevel_remarks').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#fbFinishingStage').val(data[2].fbFinishingStage.split("-")[0]);
            $('#fbFinishingStage').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
            
            $('#fbFinishingStage_remarks').val(data[2].fbFinishingStage.split("-")[1]);
            $('#fbFinishingStage_remarks').next().css({
                'top': '-0.3rem',
                'font-size': '0.8rem'
            });
        },
        failure: function (error) {
            console.log(error);
        }
    });
}

$('#proceed').click(function (){
    $('.nav-tabs a[href="#messages"]').tab('show');
});

$('#work_sub').click(function (){
    $('.nav-tabs a[href="#settings"]').tab('show');
});

$('#ipcompPer').on('change', function (e) {
    if($('#ipcompPer').val() == "100"){
        $('.ipcommisionedDate').removeClass('hide');
    }else{
       $('.ipcommisionedDate').addClass('hide'); 
    }
});


$('#submit_details').click(function (){
    var dataToSubmit = {};

    
        dataToSubmit.district = $('#district').val();
        dataToSubmit.constituency = $('#constituency').val();
        dataToSubmit.mandal = $('#mandal').val();
        dataToSubmit.panchayat = $('#panchayat').val();
        dataToSubmit.village = $('#village').val();
        dataToSubmit.habitation = $('#habitation').val();
        dataToSubmit.segment = $('#segment').val();
        dataToSubmit.asset = $('#asset_type').val();
        dataToSubmit.assetCode = $('.dynamic_table > tbody > tr').children('td:first').text();
        
        dataToSubmit.ipcompPer = $('#ipcompPer').val();
        dataToSubmit.ipcommisionedDate = $('#ipcommisionedDate').val();
        dataToSubmit.ipamountPaid = $('#ipamountPaid').val();
        dataToSubmit.ippaidDate = $('#ippaidDate').val();
        dataToSubmit.ipmbook = $('#ipmbook').val();
        
        if($('#sidewalllevel').val() == null || $('#sidewalllevel').val() == ""){
            dataToSubmit.sidewalllevel = 'Not Started';
            console.log("in  null");
        }else{
            
            dataToSubmit.sidewalllevel = $('#sidewalllevel').val();
            console.log("in not null");
        }
        if($('#pflstage').val() == null || $('#pflstage').val() == "")
        {
            dataToSubmit.pflstage = 'Not Started';
            console.log("in  null");
        }else{
            
            dataToSubmit.pflstage = $('#pflstage').val();
            console.log("in not null");
        }
        if($('#intakeFinishingStage').val() == null || $('#intakeFinishingStage').val() == "")
        {
            dataToSubmit.intakeFinishingStage = 'Not Started';
            console.log("in  null");
        }else{
            
            dataToSubmit.intakeFinishingStage = $('#intakeFinishingStage').val();
            console.log("in not null");
        }
        
        dataToSubmit.intake_pfl_remarks = $('#intake_pfl_remarks').val();
        dataToSubmit.intake_sidewall_remarks = $('#intake_sidewall_remarks').val();
        dataToSubmit.intake_finishing_remarks = $('#intake_finishing_remarks').val();
        
        if($('#wtp_aerator').val() == null || $('#wtp_aerator').val() == "")
        {
            dataToSubmit.wtp_aerator = 'Not Started';
            console.log("in  null");
        }else{
            
            dataToSubmit.wtp_aerator = $('#wtp_aerator').val();
            console.log("in not null");
        }
        if($('#wtp_flashmixer').val() == null || $('#wtp_flashmixer').val() == "")
        {
            dataToSubmit.wtp_flashmixer = 'Not Started';
            console.log("in  null");
        }else{
            
            dataToSubmit.wtp_flashmixer = $('#wtp_flashmixer').val();
            console.log("in not null");
        }
        if($('#wtp_backwash').val() == null || $('#wtp_backwash').val() == "")
        {
            dataToSubmit.wtp_backwash = 'Not Started';
            console.log("in  null");
        }else{
            
            dataToSubmit.wtp_backwash = $('#wtp_backwash').val();
            console.log("in not null");
        }
        if($('#wtp_chemical_house').val() == null || $('#wtp_chemical_house').val() == "")
        {
            dataToSubmit.wtp_chemical_house = 'Not Started';
            console.log("in  null");
        }else{
            
            dataToSubmit.wtp_chemical_house =$('#wtp_chemical_house').val();
            console.log("in not null");
        }
        if($('#wtp_chlorination').val() == null || $('#wtp_chlorination').val() == "")
        {
            dataToSubmit.wtp_chlorination = 'Not Started';
            console.log("in  null");
        }else{
            
            dataToSubmit.wtp_chlorination = $('#wtp_chlorination').val();
            console.log("in not null");
        }
        if($('#wtp_clariflocculator').val() == null || $('#wtp_clariflocculator').val() == "")
        {
            dataToSubmit.wtp_clariflocculator = 'Not Started';
            console.log("in  null");
        }else{
            
            dataToSubmit.wtp_clariflocculator = $('#wtp_clariflocculator').val();
            console.log("in not null");
        }
        if($('#wtp_filter_house').val() == null || $('#wtp_filter_house').val() == "")
        {
            dataToSubmit.wtp_filter_house = 'Not Started';
            console.log("in  null");
        }else{
            
            dataToSubmit.wtp_filter_house = $('#wtp_filter_house').val();
            console.log("in not null");
        }
        if($('#wtp_electromech').val() == null || $('#wtp_electromech').val() == "")
        {
            dataToSubmit.wtp_electromech = 'Not Started';
            console.log("in  null");
        }else{
            
            dataToSubmit.wtp_electromech = $('#wtp_electromech').val();
            console.log("in not null");
        }
        if($('#wtp_trialrun').val() == null || $('#wtp_trialrun').val() == "")
        {
            dataToSubmit.wtp_electromech = 'Not Started';
            console.log("in  null");
        }else{
            
            dataToSubmit.wtp_trialrun = $('#wtp_trialrun').val();
            console.log("in not null");
        }
        
        dataToSubmit.wtp_aerator_remarks = $('#wtp_aerator_remarks').val();
        dataToSubmit.wtp_flashmix_remarks = $('#wtp_flashmix_remarks').val();
        dataToSubmit.wtp_backwash_remarks = $('#wtp_backwash_remarks').val();
        dataToSubmit.wtp_chem_remarks = $('#wtp_chem_remarks').val();
        dataToSubmit.wtp_cholorination_remarks = $('#wtp_cholorination_remarks').val();
        dataToSubmit.wtp_clarifloc_remarks = $('#wtp_clarifloc_remarks').val();
        dataToSubmit.wtp_filter_house_remarks = $('#wtp_filter_house_remarks').val();
        dataToSubmit.wtp_electromech_remarks = $('#wtp_electromech_remarks').val();
        dataToSubmit.wtp_trialrun_remarks = $('#wtp_trialrun_remarks').val();
        
        if($('#sumpEwExcavation').val() == null || $('#sumpEwExcavation').val() == "")
        {
            dataToSubmit.sumpEwExcavation = 'Not Started';
            console.log("in  null");
        }else{
            
            dataToSubmit.sumpEwExcavation = $('#sumpEwExcavation').val();
            console.log("in not null");
        }
        if($('#sumpPccstage').val() == null || $('#sumpPccstage').val() == "")
        {
            dataToSubmit.sumpPccstage = 'Not Started';
            console.log("in  null");
        }else{
            
            dataToSubmit.sumpPccstage = $('#sumpPccstage').val();
            console.log("in not null");
        }
        if($('#sumpRaftstage').val() == null || $('#sumpRaftstage').val() == "")
        {
            dataToSubmit.sumpRaftstage = 'Not Started';
            console.log("in  null");
        }else{
            
            dataToSubmit.sumpRaftstage = $('#sumpRaftstage').val();
            console.log("in not null");
        }
        if($('#sumpSidewallStaging').val() == null || $('#sumpSidewallStaging').val() == "")
        {
            dataToSubmit.sumpSidewallStaging = 'Not Started';
            console.log("in  null");
        }else{
            
            dataToSubmit.sumpSidewallStaging =$('#sumpSidewallStaging').val();
            console.log("in not null");
        }
        if($('#sumpTopSlabLevel').val() == null || $('#sumpTopSlabLevel').val() == "")
        {
            dataToSubmit.sumpTopSlabLevel = 'Not Started';
            console.log("in  null");
        }else{
            
            dataToSubmit.sumpTopSlabLevel = $('#sumpTopSlabLevel').val();
            console.log("in not null");
        }
        if($('#sumpCiSpecial').val() == null || $('#sumpCiSpecial').val() == "")
        {
            dataToSubmit.sumpCiSpecial = 'Not Started';
            console.log("in  null");
        }else{
            
            dataToSubmit.sumpCiSpecial = $('#sumpCiSpecial').val();
            console.log("in not null");
        }
        if($('#sumpFinishingStage').val() == null || $('#sumpFinishingStage').val() == "")
        {
            dataToSubmit.sumpFinishingStage = 'Not Started';
            console.log("in  null");
        }else{
            
            dataToSubmit.sumpFinishingStage = $('#sumpFinishingStage').val();
            console.log("in not null");
        }
        
        dataToSubmit.sumpEwExcavation_remarks = $('#sumpEwExcavation_remarks').val();
        dataToSubmit.sumpPccstage_remarks = $('#sumpPccstage_remarks').val();
        dataToSubmit.sumpRaftstage_remarks = $('#sumpRaftstage_remarks').val();
        dataToSubmit.sumpSidewallStaging_remarks = $('#sumpSidewallStaging_remarks').val();
        dataToSubmit.sumpTopSlabLevel_remarks = $('#sumpTopSlabLevel_remarks').val();
        dataToSubmit.sumpCiSpecial_remarks = $('#sumpCiSpecial_remarks').val();
        dataToSubmit.sumpFinishingStage_remarks = $('#sumpFinishingStage_remarks').val();
        
         if($('#ewExcavation').val() == null || $('#ewExcavation').val() == "")
         {
            dataToSubmit.ewExcavation = 'Not Started';
            console.log("in  null");
        }else{
            
            dataToSubmit.ewExcavation = $('#ewExcavation').val();
            console.log("in not null");
        }
         if($('#pccstage').val() == null || $('#pccstage').val() == "")
         {
            dataToSubmit.pccstage = 'Not Started';
            console.log("in  null");
        }else{
            
            dataToSubmit.pccstage = $('#pccstage').val();
            console.log("in not null");
        }
         if($('#raftstage').val() == null || $('#raftstage').val() == "")
         {
            dataToSubmit.raftstage = 'Not Started';
            console.log("in  null");
        }else{
            
            dataToSubmit.raftstage = $('#raftstage').val();
            console.log("in not null");
        }
         if($('#glstage').val() == null || $('#glstage').val() == "")
         {
            dataToSubmit.glstage = 'Not Started';
            console.log("in  null");
        }else{
            
            dataToSubmit.glstage = $('#glstage').val();
            console.log("in not null");
        }
         if($('#stagingLevel').val() == null || $('#stagingLevel').val() == "")
         {
            dataToSubmit.stagingLevel = 'Not Started';
            console.log("in  null");
        }else{
            
            dataToSubmit.stagingLevel = $('#stagingLevel').val();
            console.log("in not null");
        }
         if($('#bottomSlab').val() == null || $('#bottomSlab').val() == "")
         {
            dataToSubmit.bottomSlab = 'Not Started';
            console.log("in  null");
        }else{
            
            dataToSubmit.bottomSlab = $('#bottomSlab').val();
            console.log("in not null");
        }
         if($('#sidewallStaging').val() == null || $('#sidewallStaging').val() == "")
         {
            dataToSubmit.sidewallStaging = 'Not Started';
            console.log("in  null");
        }else{
            
            dataToSubmit.sidewallStaging = $('#sidewallStaging').val();
            console.log("in not null");
        }
         if($('#topSlabLevel').val() == null || $('#topSlabLevel').val() == "")
         {
            dataToSubmit.topSlabLevel = 'Not Started';
            console.log("in  null");
        }else{
            
            dataToSubmit.topSlabLevel = $('#topSlabLevel').val();
            console.log("in not null");
        }
         if($('#ciSpecial').val() == null || $('#ciSpecial').val() == "")
         {
            dataToSubmit.ciSpecial = 'Not Started';
            console.log("in  null");
        }else{
            
            dataToSubmit.ciSpecial = $('#ciSpecial').val();
            console.log("in not null");
        }
         if($('#finishingStage').val() == null || $('#finishingStage').val() == "")
         {
            dataToSubmit.finishingStage = 'Not Started';
            console.log("in  null");
        }else{
            
            dataToSubmit.finishingStage = $('#finishingStage').val();
            console.log("in not null");
        }
        
        dataToSubmit.ewExcavation_remarks = $('#ewExcavation_remarks').val();
        dataToSubmit.pccstage_remarks = $('#pccstage_remarks').val();
        dataToSubmit.raftstage_remarks = $('#raftstage_remarks').val();
        dataToSubmit.glstage_remarks = $('#glstage_remarks').val();
        dataToSubmit.stagingLevel_remarks = $('#stagingLevel_remarks').val();
        dataToSubmit.bottomSlab_remarks = $('#bottomSlab_remarks').val();
        dataToSubmit.sidewallStaging_remarks = $('#sidewallStaging_remarks').val();
        dataToSubmit.topSlabLevel_remarks = $('#topSlabLevel_remarks').val();
        dataToSubmit.ciSpecial_remarks = $('#ciSpecial_remarks').val();
        dataToSubmit.finishingStage_remarks = $('#finishingStage_remarks').val();

        if($('#foundationstage').val() == null || $('#foundationstage').val() == "")
        {
            dataToSubmit.foundationstage = 'Not Started';
            console.log("in  null");
        }else{
            
            dataToSubmit.foundationstage = $('#foundationstage').val();
            console.log("in not null");
        }
        if($('#columnstage').val() == null || $('#columnstage').val() == "")
        {
            dataToSubmit.columnstage = 'Not Started';
            console.log("in  null");
        }else{
            
            dataToSubmit.columnstage = $('#columnstage').val();
            console.log("in not null");
        }
        if($('#slabLevel').val() == null || $('#slabLevel').val() == "")
        {
            dataToSubmit.slabLevel = 'Not Started';
            console.log("in  null");
        }else{
            
            dataToSubmit.slabLevel = $('#slabLevel').val();
            console.log("in not null");
        }
        if($('#fbFinishingStage').val() == null || $('#fbFinishingStage').val() == "")
        {
            dataToSubmit.fbFinishingStage = 'Not Started';
            console.log("in  null");
        }else
        {
            
            dataToSubmit.fbFinishingStage = $('#fbFinishingStage').val();
            console.log("in not null");
        }
        
        dataToSubmit.foundationstage_remarks = $('#foundationstage_remarks').val();
        dataToSubmit.columnstage_remarks = $('#columnstage_remarks').val();
        dataToSubmit.slabLevel_remarks = $('#slabLevel_remarks').val();
        dataToSubmit.fbFinishingStage_remarks = $('#fbFinishingStage_remarks').val();
    
        dataToSubmit.latitude = $('#latitude').val();
        dataToSubmit.longitude = $('#longitude').val();
        dataToSubmit.assetImage = /([^\\]+)$/.exec($('#assetImage').val())[1];
        dataToSubmit.assetImageData = $('#assetImageData').val();
        dataToSubmit.remarks = $('#remarks').val();
        dataToSubmit.user_id = 'mobileadmin';
        
        console.log(JSON.stringify(dataToSubmit));
        
        $.ajax({
        type: "POST",
        url: mobileServiceBaseURL + 'UpdateAssets',
        contentType: 'application/json',
        data: JSON.stringify(dataToSubmit),
        dataType: 'json',
        success: function (response) {
            if (response.status == "success") {
                console.log("in if");
                alert("Asset updated successfully");
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

var x = document.getElementById("demo");

function getLocation() {
    if($('#latitude').val() != null && $('#longitude').val() != null){
        console.log("get locatn lat"+$('#latitude').val());
        console.log("get locatn long"+$('#longitude').val());
         var answer = confirm("GPS information Already Exists \n click OK to override GPS Details \n Cancel to retain previous GPS details");
         if (answer) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            } else{
                x.innerHTML = "Geolocation is not supported by this browser.";
            }
         }
    }else{
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            } else{
                x.innerHTML = "Geolocation is not supported by this browser.";
            }
        }
    
}

function showPosition(position) {
    $('#latitude').val(position.coords.latitude);
    $('#longitude').val(position.coords.longitude);
}

