// Initialize Firebase
// Make sure to match the configuration to the script version number in the HTML
// (Ex. 3.0 != 3.7.0)


// Assign the reference to the database to a variable named 'database'
//var database = ...

$(document).ready(function() {


  var config = {
    apiKey: "AIzaSyB70hEqLwQCc2TZCxqrrfC0tDMqBKYxEpk",
    authDomain: "trains-87543.firebaseapp.com",
    databaseURL: "https://trains-87543.firebaseio.com",
    projectId: "trains-87543",
    storageBucket: "",
    messagingSenderId: "929451475740"
  };
 
  firebase.initializeApp(config);



  var database = firebase.database();


  $("body").on("click", "#submit-id" , function(event) {

  event.preventDefault();

  // Get the input values
  var trainName = $( "#trainNameId" ).val().trim();
  var destId = $( "#destId" ).val().trim();
  var firstTrainTime = $("#firstTrainId").val().trim();
  var freqId = $( "#freqId" ).val().trim();



  // Moment JS
  var firstTimeConverted = moment(firstTrainTime, "hh:mm A").subtract(10, "years");
  var timeRemainder = moment().diff(moment(firstTimeConverted), "minutes") % freqId;
  var minutesAway = freqId - timeRemainder;
  var nextTrain = moment().add(minutesAway, "minutes").format("hh:mm A");
  
  
    
    database.ref().push(

  {
    trainName: trainName,
    destination: destId,
    firstTrainTime: firstTrainTime,
    frequency: freqId,
    Arrival: nextTrain,
    minutesAway: minutesAway,
  });

    database.ref().on("child_added", function(childSnapshot) {


      var fireTrainName  = childSnapshot.val().trainName;
      var Firedest   = childSnapshot.val().destination;
      var fireArrival  = childSnapshot.val().Arrival;
      var fireFreq  = childSnapshot.val().frequency;



      // Appending data to the table
      $(".table").append("<tr><td> " + childSnapshot.val().trainName +
        " </td><td> " + childSnapshot.val().destination +
        " </td><td> " + childSnapshot.val().frequency +
        " </td><td> " + childSnapshot.val().Arrival + "</td><td> " + childSnapshot.val().minutesAway + "</td></tr>");

    
    })



  $( "#trainNameId" ).val("");
  $( "#destId" ).val("");
  $( "#firstTrainId" ).val("");
  $( "#freqId" ).val("");

 


})


});