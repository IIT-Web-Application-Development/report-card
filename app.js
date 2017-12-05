$(document).ready(function() {
  "use strict";
  //adds json content type to request
  $.ajaxSetup({
    contentType: "application/json; charset=utf-8"
  });



  /* Get the buttons for information */
  $(".clear").on("click", function() {
    $(".display").html("");
    $(".input").val("");
  });

  $("#editschool button").on("click", function() {
    var $field1 = $(".addschool");
    var $field2 = $(".addlocation");
    var $sname = $field1.val();
    var $slocation = $field2.val();
    $field1.val("");
    $field2.val("");
    addschool($sname, $slocation);
  });

  $("#editschool button").on("click", function() {
    var $field3 = $(".searchschool");
    var $sname = $field3.val();
    $field3.val("");
    searchschool($sname);
  });

  $("#editteacher button").on("click", function() {
    var $field1 = $(".searchschool");
    var $field2 = $(".searchteacher");
    var $sname = $field1.val();
    var $tname = $field2.val();
    $field1.val("");
    $field2.val("");
    searchteacher($sname, $tname);
  });

  $("#editteacher button").on("click", function() {
    var $field3 = $(".addschool");
    var $field4 = $(".addteacher");
    var $sname = $field3.val();
    var $tname = $field4.val();
    $field3.val("");
    $field4.val("");
    addteacher($sname, $tname);
  });

  $("#editteacher button").on("click", function() {
    var $field5 = $(".viewschool");
    var $field6 = $(".viewteacher");
    var $sname = $field5.val();
    var $tname = $field6.val();
    $field5.val("");
    $field6.val("");
    findallteachers($sname, $tname);
  });

  $("#editcomments button").on("click", function() {
    var $field1 = $(".viewschool");
    var $field2 = $(".viewteacher");
    var $field3 = $(".viewcomment");
    var $sname = $field1.val();
    var $tname = $field2.val();
    var $cid = $field3.val();
    $field1.val("");
    $field2.val("");
    $field3.val("");
    findcomment($sname, $tname, $cid);
  });

  $("#editcomments button").on("click", function() {
    var $field4 = $(".addschool");
    var $field5 = $(".addteacher");
    var $field6 = $(".addcomment");
    var $field7 = $(".addknowhow");
    var $sname = $field4.val();
    var $tname = $field5.val();
    var $body = $field6.val();
    var $knowhow = $field7.val();
    $field4.val("");
    $field5.val("");
    $field6.val("");
    $field7.val("");
    addcomment($sname, $tname, $body, $knowhow);
  });

  $("#editcomments button").on("click", function() {
    var $field8 = $(".deleteschool");
    var $field9 = $(".deleteteacher");
    var $field10 = $(".deletecomment");
    var $sname = $field8.val();
    var $tname = $field9.val();
    var $cid = $field10.val();
    $field8.val("");
    $field9.val("");
    $field10.val("");
    deletecomment($sname, $tname, $cid);
  });

  $("#editcomments button").on("click", function() {
    var $field11 = $(".findschool");
    var $field12 = $(".findteacher");
    var $sname = $field11.val();
    var $tname = $field12.val();
    $field11.val("");
    $field12.val("");
    findallcomments($sname, $tname);
  });
});
