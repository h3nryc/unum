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
    }
  };