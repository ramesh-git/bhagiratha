/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$('#login').click(function(){
    console.log("in login js")
    if($('#userName').val()==$('#userPassword').val())
    {
       window.location.assign("./home.html");
    }
    else{
        alert("failed");
    }
});

