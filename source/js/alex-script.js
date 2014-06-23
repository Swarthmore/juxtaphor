// $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
//     options.url = "Http://ec2-107-23-97-130.compute-1.amazonaws.com:8182/juxta" +
//         options.url;
// });

var Juxta = Backbone.Model.extend({
    url: 'http://54.86.34.8:8182/juxta'
});

var juxta = new Juxta();
juxta.fetch({
    dataType: "json",
    success: function () {
        alert("Yatta!");
    }
});
