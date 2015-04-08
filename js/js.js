'use strict';

window.addEventListener("resize", function() {
  console.info('Init Resize');
  w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  //console.info(h,w);
  topnew = (h-400)/2;
  $('body').width(w).height(h);
}, false);
//document.addEventListener("deviceready", function(){
$(document).ready(function(){
  $('body').width(w).height(h);
  
  
  
  if(LTest()){
	//user = Get('user');
	//console.info(user);
	var flats_test = Get('flats');
	if(flats_test){
	  var user_tmp = Get('user');
	  for(var i in user){
		if (!user_tmp.hasOwnProperty(i)){
		  user_tmp[i] = user[i];
		}
	  }
	  user = user_tmp;
	  user.workclicks = 0;
	  //types = Get('types');
	  //states = Get('states');
	  flats = Get('flats');
	//  var works_tmp = Get('works');
	//  if (works_tmp) {
	//	for(var i in works){
	//	  if (works[i].name!==works_tmp[i].name){
	//		works_tmp[i].name = works[i].name;
	//	  }
	//	  if (works[i].amount!==works_tmp[i].amount){
	//		works_tmp[i].amount = works[i].amount;
	//	  }
	//	  if (works[i].cost!==works_tmp[i].cost){
	//		works_tmp[i].cost = works[i].cost;
	//	  }
	//	}
	//	works = works_tmp;
	//  }
	  sets = Get('sets');
	  if (sets.v!==sets_start.v) {
		user.money = P(user.money);
		user.loan = 0;
		user.loanpaid = 0;
		user.work = P(user.work);
		for(var j in flats){
		  if(flats[j].user==1){
			user.money += flats[j].cost*tax.buy;
			flats[j].user = 0;
		  }
		}
		
		flats = ImportFlats();
		sets = $.extend(true,{},sets_start);
		localStorage.clear();
		Restart();
		UpdateStor();
	  }
	  else{
		user.money = P(user.money);
		user.loan = P(user.loan);
		user.loanpaid = P(user.loanpaid);
		user.work = P(user.work);
		for(var j in flats){
		  if(flats[j].user==1){
			$('#'+flats[j].id+'').attr('buy','yes');
		  }
		}
	  }
	}
	else{
	  user = $.extend(true,{},user_start);
	  sets = $.extend(true,{},sets_start);
	  //Set(user,'user');
	  //Set(types,'types');
	  //Set(states,'states');
	  //Set(flats,'flats');
	  //Set(works,'works');
	  //Set(sets,'sets');
	}
  }
  else{
	user = $.extend(true,{},user_start);;
	sets = $.extend(true,{},sets_start);
	//Set(user,'user');
	//Set(types,'types');
	//Set(states,'states');
	//Set(flats,'flats');
  }
  //console.info(flats);
  setTimeout(function(){
	$('.load-datsko').hide();
	//if (sets['audio']){
	//  playAudio('audio');
	//  $('.audiopause').show();
	//  $('.audioplay').hide();
	//}
	//else{
	//  stopAudio('audio');
	//  $('.audioplay').show();
	//  $('.audiopause').hide();
	//}
	//Builds();
	//svg6554 Calendar
	//svg2 Map
	$('.preload .preloader .preloaderbg').animate({width:'100%'},2000,function(){
	  var xsvg = (w-wsvg)/2;
	  var ysvg = (h-hsvg)/2;
	  $('#svg2').css({
		'left':xsvg+'px',
		'top':ysvg+'px'
	  }).draggable({
		create:function(){
		  //console.info(wsvg,hsvg,w,h);
		},
		drag:function(event,ui){
		  
		},
		start:function(event,ui){
		  //ui.helper.bind("click.prevent",function(event) { event.preventDefault(); });
		  $('#svg2').attr('class','noclick');
		},
		stop: function(event, ui) {
		  //ui.helper.find('path').one('click', function(e){ e.stopPropagation();} );
		  setTimeout(function(){$('#svg2').attr('class','');}, 300);
		  // event.toElement is the element that was responsible
		  // for triggering this event. The handle, in case of a draggable.
		  //$( event.toElement,ui.helper.find('path') ).one('click', function(e){ e.preventDefault();e.stopImmediatePropagation();return false } );
		}
	  });
	  SvgClick();
	  //console.info(flats,flats2);
	  //mnw.show();
	  //$('html').removeClass('hidden');
	  //if(LTest()){
	  
	  //}
	  //Ani();
	  $('.preload').hide();
	  count = -1;
	  
	  Update();
	  Home();
	});
  },1000);
  //var token = '';
  //var pinger = setInterval(function (){
  //  
  //  $.ajax({
  //    cache: false,
  //    data: {
  //      token: token,
  //    },
  //    //timeout: 2500,
  //    type: 'GET',
  //    url: 'uo.php',
  //    dataType: 'json',
  //    success: function (data, status, jqXHR){
  //      $('#userCount').text(data.userCount);
  //      token = data.token;
  //    }
  //  });
  //  
  //}, 5000);
});
//}, false);

//window.fbAsyncInit = function() {
//	FB.init({
//		appId      : '1660084530886133',
//		xfbml      : true,
//		version    : 'v2.3'
//	});
//};
//
//(function(d, s, id){
//	 var js, fjs = d.getElementsByTagName(s)[0];
//	 if (d.getElementById(id)) {return;}
//	 js = d.createElement(s); js.id = id;
//	 js.src = "//connect.facebook.net/en_US/sdk.js";
//	 fjs.parentNode.insertBefore(js, fjs);
//}(document, 'script', 'facebook-jssdk'));
























