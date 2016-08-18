  var callbackFunction1 = function(data) {
    var oneword = data.query.results.channel.item.condition.text;
    var weathercode = data.query.results.channel.item.condition.code;
    var temp = Math.round((data.query.results.channel.item.condition.temp - 32) * 5 / 9);
    window.onload = function () {
    	document.getElementById('onewordweather').innerHTML = oneword;
        if (weathercode == '32') {
            //Sunny
           document.getElementById('emoji-left').innerHTML = '<h2>'+'☀️'+'</h2>';
        } else if (weathercode == '31') {
            //Clear (Night)
            document.getElementById('emoji-left').innerHTML = '<h2>'+'🌃'+'</h2>';
        } else if (weathercode == '26') {
            //Cloudy
            document.getElementById('emoji-left').innerHTML = '<h2>'+'☁️'+'</h2>';
        } else if (weathercode == '11' | weathercode == '12') {
            //Rain
            document.getElementById('emoji-left').innerHTML = '<h2>'+'🌧'+'</h2>';
        }
    	document.getElementById('temp').innerHTML = temp + ' °C';

        //Hidden div
        
        var forecast = data.query.results.channel.item.forecast
        for (var i = 0; i < 5; i++) {
            var high = Math.round((forecast[i].high - 32) * 5 / 9);
            $(".wet-hidden").append("<h2 style='font-weight: 400; margin: 0;' >On the "+forecast[i].date+" it will be "+high+" and "+forecast[i].text+"</h1>")
        }    
    }
  };