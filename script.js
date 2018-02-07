var tables = [];
var waiters = [];
var focused = 0;
var indice = 0;
var restId = "testRest2";
// Initialize Firebase
var config = {
  apiKey: "AIzaSyAfPn8J2aqXYPtVyEs57Fr33bymvXwcDs0",
  authDomain: "application-8404c.firebaseapp.com",
  databaseURL: "https://application-8404c.firebaseio.com",
  projectId: "application-8404c",
  storageBucket: "application-8404c.appspot.com",
  messagingSenderId: "626996400205"
};
firebase.initializeApp(config);
var database = firebase.database();
var line;
var l;
function getQueue() {
  database.ref('Restaurants/' + restId + '/queue').once('value').then(function(snapshot) {
    l = 2
    line = snapshot.val();
    console.log(line);
    return line;

  });
}
function displayQueue() {
  var temp = getQueue();
  console.log(temp);

}
displayQueue();




// line.on('child_added', updateQueue);
//
// line.on('child_changed', updateQueue);
//
// line.on('child_removed', function(data) {
//   // do what happens when guest is seated;
// });

function updateQueue(data){
  this.bookingIds = data.val(); // assuming you have a global list
}
$("#slider").val(1);
$("#output").val(1);
$(".subheading").click(function() {
  $(this).parent().find("div").toggleClass("hidden");
});
$("#add").click(function() {
  tables[tables.length] = []
  tables[tables.length-1][0] = 1;
  tables[tables.length-1][1] = "";
  $("<div class='table'>  <h1>" + tables.length + "</h1> <img src='table.svg' /></div>").attr('id',tables.length).appendTo(".room").draggable({
    containment:"parent"
  });

});
$("#remove").click(function() {
  $("#"+tables.length).remove();
  tables.pop();
});
$("#waiter").autocomplete({
  source: function(request, response) {
    var result = $.ui.autocomplete.filter(waiters, request.term);
    $(".addWaiter").prop('disabled', $.inArray(request.term, result) >= 0);
    response(result);
  }
});
$(".addWaiter").click(function() {
  waiters.push($("#waiter").val());
  $(this).prop('disabled',true);
})
$(".room").on('click','.table', function() {
  if (focused != 0)
    $(focused).removeClass("border");
  focused = this;
  $(focused).addClass("border");
  indice = $(this).attr("id") - 1;
  if (tables[indice][0]) {
    $("#slider").val(tables[indice][0]);
    $("#output").val(tables[indice][0]);
    $("#waiter").val(tables[indice][1]);
  }
});
$("#slider").on('input', function() {
  tables[indice][0] = $("#slider").val();
});
$("#waiter").on('input', function() {
  tables[indice][1] = $("#waiter").val();
});
