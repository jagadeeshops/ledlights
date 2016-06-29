var counter = 1

$( document ).ready(function() {
  
  $("#submit").click( function(){
    var searchTerm = $("#search").val()
    if (searchTerm == "") {
      alert("Please enter the product to search");
    }
    else {
      var searchTerm = $("#search").val()
      postReq(searchTerm, "#div-" + counter, counter)
    }

  });


}); 


function bindValues() {
  $(".rawMaterial").click(function() {
    var rawMaterial = $(this).text()
    console.log(rawMaterial)
    postReq(rawMaterial, "#div-" + counter, counter)
  })
}

function postReq(searchTerm, div) {
  var posting = $.post( "/search", { searchTerm: searchTerm } );
  posting.done(function(data) {
    $(div).html(data) 
    bindValues()
    counter = counter + 1;
  })
  posting.error(function() {
    alert( "Request failed" );
  })  
}