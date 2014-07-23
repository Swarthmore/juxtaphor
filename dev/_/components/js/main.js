////////////////////////////////////////////////////////
// main.js: initialize router, and start history      //
//                                                    //
// This file contains those commands that simply must //
// appear last in the final file.                     //
////////////////////////////////////////////////////////

$('#tablist a').click(function (e) {
  e.preventDefault();
  $(this).tab('show');
});

var router = new AV.Router();
Backbone.history.start();
