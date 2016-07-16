
$( document ).ready(function() {
  
  $(".strategy").click( function(e){
    var strategy = e.toElement.getAttribute("id")
    postReq(strategy)
  });


}); 



function postReq(strategyValue) {
  var posting = $.post( "/strategy", { strategy: strategyValue } );
  posting.done(function(data) {
    console.log( "Strategy applied" );
  })
  posting.error(function() {
    alert( "Request failed" );
  })  
}