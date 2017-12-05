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
  //     $(".output").html($output);
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
      $(".output").html($output);
    }, "json");
  }
  //calls get /schools/:sname
  var searchschool = function ($sname) {
    var $link="http://localhost:3000/schools/" + $sname;
    $.get($link, function(data, status){
      //console.log(data);
      var $output = $("<p>");
      $output.text("Name: " + data.name + "Location: " + data.location + "Current Teachers: " + data.teachers);
      $(".output").html($output);
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
      $(".output").html($output);
    });
  }
  //calls get /schools/:sname/teachers
  var findallteachers = function ($sname) {
    var $link="http://localhost:3000/schools/" + $sname;
    $.get($link, function(data, status){
      data.forEach(function (teach) {
        var $output = $("<li>");
        $output.text("Name: " + teach.name);
        $(".output").append($output);
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
        $(".output").html($output);
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
        $(".output").html($output);
      });
    }
    //calls get /schools/:sname/teachers/:tname/comments
    var findallcomments = function ($sname, $tname) {
      var $link="http://localhost:3000/schools/" + $sname + "/teachers/" + $tname + "/comments";
      $.get($link, function(data, status){
        data.forEach(function (com) {
          var $output = $("<li>");
          $output.text("Comment: " + com.body + "Date: " + com.date + "Known How?: " + com.knowhow);
          $(".output").append($output);
        });
      });
    }
    //calls get /schools/:sname/teachers/:tname/comments/:cid
    var findcomment = function ($sname, $tname, $cid) {
      var $link="http://localhost:3000/schools/" + $sname + "/teachers/" + $tname + "/comments/" + cid;
      $.get($link, function(data, status){
        var $output = $("<p>");
        $output.text("Comment: " + data.body + "Date: " + data.date + "Known How?: " + data.knowhow + "Id: " + data.id);
        $(".output").html($output);
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
          $(".output").html($output);
        }
      });
    }
});
