var page = new WebPage();

page.onConsoleMessage = function(msg) {
    console.log(msg);
};

page.open(encodeURI("http://www.microsoft.com/windowsazure/support/status/servicedashboardcontent.aspx"), function (status) {

   page.injectJs('jquery.js');
    if (status !== "success") {
        console.log("Unable to access network");
    } else {
        page.evaluate(function() {
            var list = $("#DailyStatus tr");
            for (var i = 0; i < list.length; ++i) {
              var row = list[i];


              var status = $(row).find(".cellStyleTodayStatus input[type=hidden]").val();

              if ('undefined' != typeof status) {
                var serviceName  = $(row).find(".cellStyleTodayService span:first").text();
                var serviceLocation = $(row).find(".cellStyleTodayService span")[1].innerHTML;
                var output = "[" + status + "] " + serviceName + " (" + serviceLocation + ")";

                if (status != "Green") {
                  //TWEET IT
                  console.log(output);
                  $.ajax({
                    type: "POST",
                    url: "some.php",
                    data: "name=John&location=Boston"
                  }).done(function( msg ) {
                    console.log( "Data Saved: " + msg );
                  });

                }
              }


            }
        });
    }
    phantom.exit();
});