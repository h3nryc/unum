  function code2Emoji(code) {
    if (code == '32') {
            //Sunny
           return '☀️';
        } else if (code == '31') {
            //Clear (Night)
            return '🌃';
        } else if (code == '26') {
            //Cloudy
            return '☁️';
        } else if (code == '11' | code == '12') {
            //Rain
           return '🌧';
        }
  }
  var callbackFunction1 = function(data) {
    var oneword = data.query.results.channel.item.condition.text;
    var weathercode = data.query.results.channel.item.condition.code;
    var temp = Math.round((data.query.results.channel.item.condition.temp - 32) * 5 / 9);
    window.onload = function () {
    	document.getElementById('onewordweather').innerHTML = oneword;
        document.getElementById('emoji-left').innerHTML = '<h2>'+code2Emoji(weathercode)+'</h2>';
    	document.getElementById('temp').innerHTML = temp + ' °C';

        //Hidden div
        
        var forecast = data.query.results.channel.item.forecast;
        for (var i = 0; i < 5; i++) {
            var high = Math.round((forecast[i].high - 32) * 5 / 9);
            $(".wet-hidden").append('<div class="forecastemoji"><h2>'+code2Emoji(weathercode)+'</h2></div>');
            $(".wet-hidden").append("<h2 style='font-weight: 200; margin: 0;' >"+forecast[i].date+", "+forecast[i].text+"</h2>");
        }    
    }
  };