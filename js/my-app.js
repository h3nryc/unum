var myApp = new Framework7(); 
var $$ = Dom7;
  // Init slider and store its instance in mySwiper variable
  var mySwiper = myApp.swiper('.swiper-container', {
    pagination:'.swiper-pagination'
  });



function more() {
	if ($(".wet-card").height() == 400) {
			$(".wet-card").animate({height: 60});
	}else{
		$(".wet-card").animate({height: 400});
	}

}
var ptrContent = $$('.pull-to-refresh-content');
 
// Add 'refresh' listener on it
ptrContent.on('refresh', function (e) {
		location.reload();
        myApp.pullToRefreshDone();
});