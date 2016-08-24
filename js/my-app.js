/*

	  Unum (c) All rights reserved.
	 The code that powers unum front.
	Coded by Henry Confos & Tom Lister.

*/

var myApp = new Framework7(); 
var socket = io('http://localhost:3293/')
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

/*

Start Main Functions

*/


function getDistance(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return Number(d).toFixed(2);
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

function loadMore(type,lat,long,id,provider,name,address,emoji,color) {
	console.log(1)
	var distance = getDistance(lat,long,localStorage.getItem("lat"),localStorage.getItem("long"));
	console.log(distance)
	var time = distance * 0.50;
	var uberFare = Number(distance * 1.50 + 5 + time).toFixed(2);
	var taxiFare = Number(distance * 2.86 + 5).toFixed(2);
	var uberLink = "https://m.uber.com/ul?client_id=YOUR_CLIENT_ID&action=setPickup&pickup[latitude]="+localStorage.getItem("lat")+"&pickup[longitude]=-"+localStorage.getItem("long")+"&pickup[nickname]=Your Location[formatted_address]=Your Location Rd&dropoff[latitude]="+lat+"&dropoff[longitude]=-"+long+"&dropoff[nickname]="+name+"[formatted_address]="+address+"&product_id=a1111c8c-c720-46c3-8534-2fcdd730040d&link_text=View%20team%20roster&partner_deeplink=Unum"
	var taxiLink = "https://www.google.com.au/#safe=active&q=book%20a%20taxi"
	var mapUrl = "http://maps.googleapis.com/maps/api/staticmap?center="+lat+","+long+"&zoom=18&size=500x400&sensor=false"
	$('.main-list').after(' <div style="background-color: '+color+'" class="info-card fullscreen"> <div onclick="closePopup();" class="info-head"> <i class="material-icons">arrow_back</i><h2 class="info-title">'+emoji+'   '+name+'</h2> </div> <div class="info-map" style="background-image: url('+mapUrl+');"></div> <div class="info-footer"> <p style="margin: 0;">'+name+' is located on <span style="font-weight: bold;">'+address+'</span></p> <h2 style="margin: 0;">In a taxi it would cost around <span style="font-weight: bold;">'+taxiFare+'</span> or an Uber would cost <span style="font-weight: bold;">'+uberFare+'</span> 🚕</h2> <div class="info-butt"> <div class="info-book">Book a</div><a href="'+uberLink+'"><div class="uber">Uber</div></a><a href="'+taxiLink+'>"<div class="taxi">Taxi</div></a> </div> <p>Infomation provided by '+provider+' ✌️</p> </div> </div>');
	$('.info-card').hide()
	$('.info-card').animate({width: 'toggle'}, 120);
}

function closePopup() {
	$('.info-card').animate({width: 'toggle'}, 120, function(){
		$('.info-card').remove();
	});
}
/*

End Main Functions

*/

/*

Start Nearby Places

*/

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
		  getEvent()
	});
	}else{
		getVenue();
		getEvent();
	}
	  
}


function getVenue() {
	socket.emit('getVenue',localStorage.getItem("lat"),localStorage.getItem("long"));
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
	if(type == "Beach" || type == 1){
		return "#f1c40f";
	}else if (type == "Park" || type == 2){
		return "#2ecc71";
	}else if (type == "Playground" || type == 3){
		return "#e74c3c";
	}else if (type == "Food & Drink" || type == 4){
		return "#e67e22";
	}else if(type == "Preserve"){
		return "#EF2D56";
	}else if (type == "Historic Site" || type == "Café" || type == 5){
		return '#ED7D3A';
	}else if (type == "Pool" || type == 6){
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

function getImage(query) {


}

//Call Function on load
window.onload = function () {
 getNearby();
}

/*

End Nearby Places

*/
/*

Start Events

*/

function getEvent() {
	socket.emit('getEvent',localStorage.getItem("lat"),localStorage.getItem("long"));
}


/*

End Events

*/







