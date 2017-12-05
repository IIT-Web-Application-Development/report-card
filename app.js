$(document).ready(function() {
  "use strict";
  //adds json content type to request
  $.ajaxSetup({
    contentType: "application/json; charset=utf-8"
  });

  //calls get /schools
  // var viewallschools = function () {
  //   $.get("http://localhost:3000/schools", function(data, status){
  //     var $output = $("<p>");
  //     $output.text(JSON.stringify(data));
  //     $(".display").html($output);
  //   });
  // }
  //calls post /schools
  var addschool = function ($sname, $slocation) {
    var newSchool =    {
        'name':    $sname,
        'location':    $slocation
      };
    $.post("http://localhost:3000/schools", JSON.stringify(newSchool) , function(req, res){
      //  console.log(req);
      var $output = $("<p>");
      $output.text("New School Added: " + $sname);
      $(".display").html($output);
    }, "json");
  }
  //calls get /schools/:sname
  var searchschool = function ($sname) {
    var $link="http://localhost:3000/schools/" + $sname;
    $.get($link, function(data, status){
      //console.log(data);
      var $output = $("<p>");
      $output.text("Name: " + data.name + "Location: " + data.location + "Current Teachers: " + data.teachers);
      $(".display").html($output);
    });
  }
  //calls post /schools/:sname/teachers
  var addteacher = function ($sname, $tname) {
    var newTeacher  =  {
      'name': "John Doe"
    };
    var $link = "http://localhost:3000/schools/"+ $sname +"/teachers";
    $.post($link, JSON.stringify(newTeacher) , function(req, res){
      var $output = $("<p>");
      $output.text("New Teacher " + $sname + " Added to School: " + $tname);
      $(".display").html($output);
    });
  }
  //calls get /schools/:sname/teachers
  var findallteachers = function ($sname) {
    var $link="http://localhost:3000/schools/" + $sname;
    $.get($link, function(data, status){
      data.forEach(function (teach) {
        var $output = $("<li>");
        $output.text("Name: " + teach.name);
        $(".display").append($output);
      });
    });
  }
    //calls get /schools/:sname/teachers/:tname
    var searchteacher = function ($sname, $tname) {
      var $link="http://localhost:3000/schools/" + $sname + "/teachers/" + $tname;
      $.get($link, function(data, status){
        //console.log(data);
        var $output = $("<p>");
        $output.text("Name: " + data.name);
        $(".display").html($output);
      });
    }
    //calls post /schools/:sname/teachers/:tname/comments
    var addcomment = function ($sname, $tname, $body, $knowhow) {
      var newComment  =
        {
               "body": $body,
               "date": Date.now(),
               "knowhow": $knowhow
        };
      var $link = "http://localhost:3000/schools/"+ $sname +"/teachers/" + $tname + "/comments";
      $.post($link, JSON.stringify(newComment) , function(req, res){
        var $output = $("<p>");
        $output.text("New Comment ID: " + req.id);
        $(".display").html($output);
      });
    }
    //calls get /schools/:sname/teachers/:tname/comments
    var findallcomments = function ($sname, $tname) {
      var $link="http://localhost:3000/schools/" + $sname + "/teachers/" + $tname + "/comments";
      $.get($link, function(data, status){
        data.forEach(function (com) {
          var $output = $("<li>");
          $output.text("Comment: " + com.body + "Date: " + com.date + "Known How?: " + com.knowhow);
          $(".display").append($output);
        });
      });
    }
    //calls get /schools/:sname/teachers/:tname/comments/:cid
    var findcomment = function ($sname, $tname, $cid) {
      var $link="http://localhost:3000/schools/" + $sname + "/teachers/" + $tname + "/comments/" + cid;
      $.get($link, function(data, status){
        var $output = $("<p>");
        $output.text("Comment: " + data.body + "Date: " + data.date + "Known How?: " + data.knowhow + "Id: " + data.id);
        $(".display").html($output);
      });
    }
    //calls delete /schools/:sname/teachers/:tname/comments/:cid
    var deletecomment = function ($sname, $tname, $cid) {
      var $link="http://localhost:3000/schools/" + $sname + "/teachers/" + $tname + "/comments/" + cid;
      $.ajax({
        url: $link,
        type: 'DELETE',
        data: "{}",
        contentType: "json",
        success: function(req) {
          var $output = $("<p>");
          $output.text("Comment : " + $cid + " has been deleted");
          $(".display").html($output);
        }
      });
    }

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
