var myApp = new Framework7(); 
var $$ = Dom7;
  // Init slider and store its instance in mySwiper variable
  var mySwiper = myApp.swiper('.swiper-container', {
    pagination:'.swiper-pagination'
  });


function more() {
	if ($(".wet-card").height() == 350) {
			$(".wet-card").animate({height: 60});
			$(".wet-hidden").toggle();
	}else{
		$(".wet-card").animate({height: 350});
		$(".wet-hidden").fadeToggle("slow")
	}

}
var ptrContent = $$('.pull-to-refresh-content');
 
// Add 'refresh' listener on it
ptrContent.on('refresh', function (e) {
		location.reload();
        myApp.pullToRefreshDone();
});

//Nearby Places (This is front end for now but will be pushed to back)


var clientSecret = "AV3AU1AIPBEZZMCTRZUWSVUZUZOOK00MGGI3NBHO04A4FTHH&v=20130815";
var clientId = "YBQLVNSQZGPKCTLBYBZKTAJENWY1CVAOHBPMVNDGIFP1VE4Y";


function getNearby(position) {
	//Get geo location
	if(localStorage.getItem("lat") == undefined){
		navigator.geolocation.getCurrentPosition(function(location) {


		  var lat = Number(location.coords.latitude).toFixed(2); 
		  var long =  Number(location.coords.longitude).toFixed(2); 
		  localStorage.setItem("lat", lat);
		  localStorage.setItem("long", long);
		  localStorage.setItem("quadTime", Date.now());
		  getVenue();
	});
	}else{
		getVenue();
	}
	  
}


function getVenue() {
	//Check if Quad is old
	if (Date.now() - localStorage.getItem("quadTime") >= 3600) {
		getNearby();
	}
		var apiLink = "https://api.foursquare.com/v2/venues/search?ll="+localStorage.getItem("lat")+","+localStorage.getItem("long")+"&client_id="+clientId+"&client_secret="+clientSecret+""
		$.ajax({
  		url: apiLink,
  		dataType: 'jsonp',
  	success: function(data){


    	
  			for (var i = 0; i < 5; i++) {
  				//Unpack function
           		console.log(data.response.venues[i])
           		var name = data.response.venues[i].name;
           		var type = data.response.venues[i].categories[0].shortName;
           		var tip = data.response.venues[i].stats.tipCount;
           		var address = data.response.venues[i].location.address;
           		var city = data.response.venues[i].location.city;
           		var vLat = data.response.venues[i].location.lat;
           		var vLong = data.response.venues[i].location.long;
           		var verified = data.response.venues[i].verified
           		var id = data.response.venues[i].id
           		$( ".wet-card" ).after( ' <li style="background-color: '+type2Color(type)+';"class="food-card"> <div class="food-head"> <h2>'+type2Emoji(type)+'  '+type+' - '+tip+' tips</h2> </div> <div class="food-hero"></div> <div class="food-footer"> <h2>'+name+'</h2> <p style="margin: 0;">This '+type+' is located on '+address+' '+city+'</p> </div> </li>' );
           	}  

  		}
	});
}


function type2Emoji(type) {
	if(type == "Beach"){
		return "🏖";
	}else if (type == "Park"){
		return "🌲";
	}else if (type == "Playground"){
		return "⛳️";
	}else if (type == "Food & Drink"){
		return "🍴";
	}else if(type == "Preserve"){
		return "🍀";
	}else if(type == "Historic Site"){
		return "👴";
	}else if (type == "Pool"){
		return "🌊";
	}else if (type == "Café"){
		return "☕️";
	}
	else{
		return "🚶";
	}
}


function type2Color(type) {
	if(type == "Beach"){
		return "#f1c40f";
	}else if (type == "Park"){
		return "#2ecc71";
	}else if (type == "Playground"){
		return "#e74c3c";
	}else if (type == "Food & Drink"){
		return "#e67e22";
	}else if(type == "Preserve"){
		return "#EF2D56";
	}else if (type == "Historic Site" || type == "Café"){
		return '#ED7D3A';
	}else if (type == "Pool"){
		return "#5BC0EB";
	}
	else{
		var rand = Math.floor(Math.random() * 3) + 1  
		if (rand == 1) {
			return "#03FCBA";
		} else if (rand == 2) {
			return "#01FDF6";
		}else if (rand == 3){
			return "#CBBAED";
		}
		
	}
}
window.onload = function () {
 getNearby();   
}

