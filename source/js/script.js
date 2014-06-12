// $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
//     options.url = "Http://ec2-107-23-97-130.compute-1.amazonaws.com:8182/juxta" +
//         options.url;
// });

var Juxta = Backbone.Model.extend({
    url: "http://ec2-107-23-97-130.compute-1.amazonaws.com:8182/juxta"
});

var juxta = new Juxta();
juxta.fetch({
    dataType: "jsonp",
    success: function () {
        alert("Yatta!");
    }
});
