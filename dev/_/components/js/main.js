////////////////////////////////////////////////////////
// main.js: initialize router, and start history      //
//                                                    //
// This file contains those commands that simply must //
// appear last in the final file.                     //
////////////////////////////////////////////////////////


//Bootstrap code for showing tabs when clicked on
$('#tablist a').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
});


//bootstrap code for tooltips
$('[data-tooltip="tooltip"]').tooltip();
//$('deleteSourceButton').on();
//$('deleteSetButton').on();


var router = new AV.Router();
Backbone.history.start();
