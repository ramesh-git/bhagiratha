/*Without jQuery Cookie*/
$(document).ready(function(){
    $('#intakeOption1').click(function(){
        $("#intakeCircle").removeClass('hide',1000); 
        $("#intakeRect").addClass('hide'); 
    })  
    $('#intakeOption2').click(function(){
        $("#intakeCircle").addClass('hide'); 
        $("#intakeRect").removeClass('hide',1000); 
    })  
    $('#sumpOption1').click(function(){
        $("#sumpCircle").removeClass('hide',1000); 
        $("#sumpRect").addClass('hide'); 
    })  
    $('#sumpOption2').click(function(){
        $("#sumpCircle").addClass('hide'); 
        $("#sumpRect").removeClass('hide',1000); 
    })  
    $('#pumphouseOption1').click(function(){
        $("#pumphouseCircle").removeClass('hide',1000); 
        $("#pumphouseRect").addClass('hide'); 
    })  
    $('#pumphouseOption2').click(function(){
        $("#pumphouseCircle").addClass('hide'); 
        $("#pumphouseRect").removeClass('hide',1000); 
    })
    $('#ulb1').click(function(){
        $("#ulbdiv").addClass('hide'); 
        $("#nonulbdiv").removeClass('hide',1000); 
    })
    $('#ulb').click(function(){
        $("#nonulbdiv").addClass('hide'); 
        $("#ulbdiv").removeClass('hide',1000); 
    })
    $('#assetestimationfiles').click(function (){
        var i=1;
        if(i%2!=0){
        $("#assetFiles").removeClass('hide',500);
        i++;
    }
        if(i%2==0){
           $("#assetFiles").addClass('hide'); 
           i++;
        }
        
    } )
    
    
});

$(document).ready(function(){
    $('#asset').on('change', function() {
        $("#intake").hide();
        $("#sump").hide();
        $("#wtp").hide();
        $("#ohbr").hide();
        $("#bpt").hide();
        $("#glbr").hide();
        $("#ohsr").hide();
        $("#glsr").hide();
        $("#pumphouse").hide();
        $("#footpath").hide();
        $("#pumps").hide();
        $("#thrust").hide();
        $("#valve").hide();
        $("#wrkcmplinfo").hide();
        $("#sumpwrkcmplinfo").hide();
        $("#intakewrkcmplinfo").hide();
        $("#footbridgewrkcmplinfo").hide();
        $("#wtpwrkcmplinfo").hide();
        
        if ( this.value == '01')
        {
            $("#intake").show();
            $("#intakewrkcmplinfo").show();
        }
        else if(this.value == '02')
        {
            $("#wtp").show();
            $("#wtpwrkcmplinfo").show();
        }
        else if(this.value == '03')
        {
            $("#sump").show();
        $("#sumpwrkcmplinfo").show();
        }
        else if(this.value == '04') {
             $("#ohbr").show();
             $("#wrkcmplinfo").show();
        }
        else if(this.value == '05') {
            $("#bpt").show();
            $("#wrkcmplinfo").show();
        }
        else if(this.value == '06') {
            $("#glbr").show();
            $("#wrkcmplinfo").show();
        }
        else if(this.value == '07') {
            $("#ohsr").show();
            $("#wrkcmplinfo").show();
        }
        else if(this.value == '08') {
            $("#glsr").show();
            $("#wrkcmplinfo").show();
        }
        else if(this.value == '09') {
            $("#pumphouse").show();
        }
        else if(this.value == '10') {
            $("#footpath").show();
            $("#footbridgewrkcmplinfo").show();
        }
        else if(this.value == '11') {
            $("#pumps").show();
        }
        else if(this.value == '14') {
            $("#thrust").show();
        }
        else if(this.value == '15') {
            $("#valve").show();
        }
    });
   
});
