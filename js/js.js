'use strict';

var d1 = $('.d1');
var d2 = $('.d2');
var body = $('.body');
var doc = $(document);
var back = $('.back');
var w = $('body').width();
w = parseFloat(w);
var h = doc.height();
h = parseFloat(h);
//var wb = w/10;
//var hb = h/10;
//var y = 0;
//var x = wb*(-1);
var count = 2;
var alert = $('.alert');
$('.alert-close').click(function(){
  alert.hide();
});
var alertc = $('.alert-content');
var tax = {};
tax.buy = 1.2;
tax.sell = 0.9;
var bg = $('canvas#bg');
var ac = $('canvas#cars');
var ap = $('canvas#planes');
var ab = $('canvas#boards');
var as = $('canvas#sky');
var houses = [
{f:5,t:3,o:1,w:7,h:7,s:8,c:'#333'},
{f:9,t:4,o:1,w:9,h:9,s:9,c:'#66c'},
{f:8,t:2,o:2,w:8,h:8,s:7,c:'#f00'},
{f:7,t:1,o:3,w:8,h:8,s:6,c:'#000'},
{f:6,t:5,o:1,w:9,h:9,s:7,c:'#f0f'},
{f:4,t:2,o:2,w:7,h:7,s:6,c:'#090'},
{f:5,t:4,o:1,w:8,h:8,s:7,c:'#ccc'},
{f:3,t:3,o:1,w:9,h:9,s:9,c:'#66c'},
{f:8,t:2,o:1,w:7,h:7,s:9,c:'#f00'},
{f:9,t:1,o:4,w:8,h:8,s:7,c:'#000'},
{f:7,t:5,o:1,w:7,h:7,s:8,c:'#f0f'},
{f:9,t:2,o:1,w:8,h:8,s:8,c:'#090'},
{f:8,t:2,o:1,w:8,h:8,s:8,c:'#f00'},
{f:6,t:1,o:2,w:7,h:7,s:7,c:'#000'},
{f:5,t:3,o:1,w:7,h:7,s:8,c:'#f0f'},
{f:9,t:2,o:2,w:9,h:9,s:6,c:'#090'}
];

$('.panel .money,.panel .loan,.panel .out,.panel .in').autoNumeric('init',{              
  aSep: ' ',
  aDec: '.',
  mDec: 0
});


if(h<400){
  console.info(h);
  var hnew = h;
  var wnew = hnew*1000/400;
  bg.css({'height':hnew+'px','width':wnew+'px'});
  ac.css({'height':hnew+'px','width':wnew+'px'});
  ap.css({'height':hnew+'px','width':wnew+'px'});
  ab.css({'height':hnew+'px','width':wnew+'px'});
  as.css({'height':hnew+'px','width':wnew+'px'});
}
else if(h>=400){
  var topnew = (h-400)/2;
  bg.css({'top':topnew+'px'});
  ac.css({'top':topnew+'px'});
  ap.css({'top':topnew+'px'});
  ab.css({'top':topnew+'px'});
  as.css({'top':topnew+'px'});
}




$(document).ready(function(){
  $('.preload .preloader .preloaderbg').animate({width:'100%'},1000,function(){
    $('.preload').hide();
    Builds();
    Update();
    Home();
    
  });
  body.css({
    'height':h-80+'px',
    'width':w-36+'px'
  });
  //$('.b:first-child').click(function(){
    //anim();
  //});
  
  //setTimeout(anim,1000);
  //Flats();
  
  //Click();
  //$('body').append('<div class=""></div>')
});
function AnimTrans(act,layer,time,x){
  var x0 = -100;
  act.animateLayer(layer,{
    x:x
  },(time*1000),function(){
    if(x==-100){
      x0 = 1100;
    }
    if((layer=='sky2'||layer=='sky3')&&time<70){
      time = 70;
    }
    act.setLayer(layer,{
      x:x0
    }).drawLayers();
    
    AnimTrans(act,layer,time,x);
  });
}
function Builds(){
  //body.show();
  var xw = 0;
  var yw = 0;
  var xb = 10;
  var yb = 10;
  var w = 8;
  var h = 8;
  var wb = 40;
  var hb = 100;
  var sw = 2;
  var sb = 2;
  var f = 3;
  var fs = 10;
  /*
  for(var i=0;i<100;i++){
    var x = i*10;
    //x += wb+10;
    var y = 0;
    bg.drawRect({
      fillStyle: '#333',
      x: x,
      y: y,
      width: 1,
      height: 1,
      fromCenter:false,
      layer:true
    });
  }
  for(var i=1;i<=100;i++){
    var x = 0;
    //x += wb+10;
    var y = i*10;
    bg.drawRect({
      fillStyle: '#333',
      x: x,
      y: y,
      width: 1,
      height: 1,
      fromCenter:false,
      layer:true
    });
  }*/
  bg.drawRect({
    fillStyle: '#333',
    x: 0,
    y: 250,
    width: 1000,
    height: 20,
    fromCenter:false,
    layer:true
  });
  for(var i=1;i<=100;i++){
    var x = i*20-15;
    //x += wb+10;
    var y = 259;
    bg.drawRect({
      fillStyle: '#fff',
      x: x,
      y: y,
      width: 10,
      height: 2,
      fromCenter:false,
      layer:true
    });
  }
  
  
  as.drawImage({
    source: 'images/sky1.png',
    x: -100,
    y: 0,
    fromCenter:false,
    layer:true,
    name:'sky1'
  });
  as.drawImage({
    source: 'images/sky2.png',
    x: 300,
    y: 0,
    fromCenter:false,
    layer:true,
    name:'sky2'
  });
  as.drawImage({
    source: 'images/sky3.png',
    x: 700,
    y: 0,
    fromCenter:false,
    layer:true,
    name:'sky3'
  });
  ac.drawRect({
    fillStyle: '#f00',
    x: 1100,
    y: 245,
    width: 20,
    height: 12,
    fromCenter:false,
    layer:true,
    name:'car2'
  });
  ac.drawRect({
    fillStyle: '#f00',
    x: -100,
    y: 255,
    width: 20,
    height: 12,
    fromCenter:false,
    layer:true,
    name:'car1'
  });
  ap.drawImage({
    source: 'images/plane1.png',
    x: -100,
    y: 0,
    fromCenter:false,
    layer:true,
    name:'plane1'
  });
  ap.drawImage({
    source: 'images/plane2.png',
    x: 1100,
    y: 50,
    fromCenter:false,
    layer:true,
    name:'plane2'
  });
  ab.drawRect({
    fillStyle: '#00f',
    x: -100,
    y: 370,
    width: 30,
    height: 15,
    fromCenter:false,
    layer:true,
    name:'board1'
  });
  ab.drawRect({
    fillStyle: '#00f',
    x: 1100,
    y: 320,
    width: 30,
    height: 15,
    fromCenter:false,
    layer:true,
    name:'board2'
  });
  
  AnimTrans(as,'sky1',70,1100);
  AnimTrans(as,'sky2',40,1100);
  AnimTrans(as,'sky3',20,1100);
  AnimTrans(ac,'car1',40,1100);
  AnimTrans(ac,'car2',40,-100);
  AnimTrans(ap,'plane1',20,1100);
  AnimTrans(ap,'plane2',20,-100);
  AnimTrans(ab,'board1',30,1100);
  AnimTrans(ab,'board2',30,-100);
  
  
  
  
  
  
  
  
  for(var i=0;i<houses.length;i++){
    var house=houses[i];
    if(i>0){
      xb = xb+wb+sb;
    }
    var w = house.w;
    var h = house.h;
    var sw = house.s;
    var o = house.o;
    var f = house.f;
    var t = house.t;
    var c = house.c;
    var wb = w*t*o+sw*t*o+sw;
    var hb = h*f+sw*f+sw;
    
    //body.append(xb+'-'+wb+'<br>');
    yb = 250-hb;
    xw = xb+sw;
    yw = yb+sw;
    
    bg.drawImage({
      source: 'images/sunbattary.png',
      x: xb+wb/2,
      y: yb-35/2
    });
    
    bg.drawRect({
      fillStyle: c,
      x: xb,
      y: yb,
      width: wb,
      height: hb,
      fromCenter:false,
      layer:true
    });
    //var floor = f;
    for(var z=1;z<=f;z++){
      if(z>1){
        yw += h+sw;
        xw = xb+sw;
      }
      for(var k=1;k<=o;k++){
        var id = ID();
        if (k>1){
          xw += w+sw;
        }
        
        for(var j=1;j<=t;j++){
          if(j==1){
            //xw = xw;
            //yw = yw;
          }
          //else if(j%(t*o)==0){
            //xw = xb+sw;
            //yw += h+sw;
            //floor--;
          //}
          else{
            xw += w+sw;
          }
          
          //x = 10;
          //y = 50;
          bg.drawRect({
            fillStyle: '#999',
            x: xw,
            y: yw,
            width: w,
            height: h,
            fromCenter:false,
            layer: true,
            groups: [id],
          });
        }
        flats.push({
          id:id,
          internet:true,
          floor:z,
          floors:f,
          state:Rand(1,3),
          cost:4000,
          rent:320,
          user:false,
          type:t
        });
      }
    }
  }
  flats = Shuffle(flats);
  for(var i=1;i<=50;i++){
    var x = i*20;
    //x += wb+10;
    var y = 225;
    bg.drawImage({
      source: 'images/tree'+Rand(1,3)+'.png',
      x: x,
      y: y,
      fromCenter:false,
      layer:true
    });
  }
  bg.drawImage({
    source: 'images/beach.png',
    x: 0,
    y: 270,
    fromCenter:false,
    layer:true
  });
}
function Bg(){
  for(var i=1;i<=100;i++){
    var d=$('<div></div>');
    x = x+wb;
    if(x>=w){
      y = y+hb;
      x = 0;
    }
    //y = x>=w?y+50:y;
    var id = 'b'+i;
    d.addClass('b');
    
    d.attr({
      'id':id
      //'style':'left:'+x+'px';top:'+x+'px;'
    })
    .css({
      'left':x+'px',
      'top':y+'px',
      'width':wb+'px',
      'height':hb+'px'
    });
    if(i==1){
      d.click(function(){
        anim();
      });
    }
    //body.append(x+'-'+y+'-'+id+'-'+hb+'<br>');
    body.append(d);
  }
}
function Flats(){
  body.html('');
  //var back = $('<button/>');
  var flts = $('<div/>');
  flts.addClass('flats');
  //back.addClass('back');
  back.data('target','home');
  back.html('Back to home');
  back.show();
  //body.append(back);
  body.append('<h3>My flats</h3>');
  flts.addClass('flats');
  for(var i=0;i<flats.length;i++){
  var flat=flats[i];
    if(flat.user===true){
      var f = $('<button/>');
      var name = [];
      name.push(flat.t);
      name.push(flat.t==1?'room':'rooms');
      name.push(states[flat.state]);
      name.push(types[flat.type]);
      f.html(name.join(' '));
      f.append('<br>');
      f.append(P((flat.cost-flat.cost*((flat.state-1)/10))*tax.sell));
      f.append('<br>');
      f.append(P(flat.rent/flat.state));
      f.data('target','flat');
      f.data('id',i);
      f.addClass('flat-item');
      //f.append(title);
      flts.append(f);
    }
  }
  body.append(flts);
  body.ready(function(){
    Click();
  });
}
function BuyFlat(){
  body.html('');
  //var back = $('<button/>');
  var flts = $('<div/>');
  flts.addClass('flats');
  //back.addClass('back');
  back.data('target','home');
  back.html('Back to home');
  back.show();
  //body.append(back);
  body.append('<h3>Market</h3>');
  console.info(flats.length);
  for(var i=0;i<flats.length;i++){
    var flat=flats[i];
    if(flat.user===false){
      var f = $('<button/>');
      var name = [];
      name.push(flat.type);
      name.push(flat.type==1?'room':'rooms');
      name.push(states[flat.state]);
      name.push(types[flat.type]);
      f.html(name.join(' '));
      f.append('<br>');
      f.append(P((flat.cost-flat.cost*((flat.state-1)/10))*tax.buy));
      f.append('<br>');
      f.append(P(flat.rent/flat.state));
      f.data('target','flat');
      f.data('id',i);
      f.addClass('flat-item');
      //f.append(title);
      flts.append(f);
    }
  }
  body.append(flts);
  body.ready(function(){
    Click();
  });
}
function Flat(id){
  body.html('');
  //var back = $('<button/>');
  var buy = $('<button/>');
  var repair = $('<button/>');
  var repaircost = 0;
  var flat = flats[id];
  var name = [];
  name.push(flat.t);
  name.push(flat.t==1?'room':'rooms');
  name.push(states[flat.state]);
  name.push(types[flat.type]);
  if(flat.user){
    back.data('target','flats');
  }
  else{
    back.data('target','buyflat');
  }
  back.show();
  //back.addClass('back');
  back.html('Back to flats');
  //body.append(back);
  body.append('<h3>'+name.join(' ')+'</h3>');
  
  if(flat.user){
    body.append('<h5>'+P((flat.cost-flat.cost*((flat.state-1)/10))*tax.sell)+'</h5>');
  }
  else{
    body.append('<h5>'+P((flat.cost-flat.cost*((flat.state-1)/10))*tax.buy)+'</h5>');
  }
  
  body.append('<h5>'+P(flat.rent/flat.state)+'</h5>');
  buy.data('id',id);
  buy.addClass('buysell');
  if(flat.user){
    buy.html('Sell');
    buy.data('target','sell');
  }
  else{
    buy.html('Buy');
    buy.data('target','buy');
  }
  body.append(buy);
  repaircost = P((flat.state-1)*flat.cost*0.1);
  
  if(repaircost>0&&flat.user){
    repair.addClass('repair');
    repair.data('target','repair');
    repair.data('id',id);
    repair.html(repaircost+' Repair');
    body.append(repair);
  }
  
  body.ready(function(){
    Click();
  });
}
function Clear(){
  //$('body').html('');
}
function Repair(id){
  var flat = flats[id];
  var repaircost = P((flat.state-1)*flat.cost*0.1);
  if(repaircost>user.money){
    alertc.html('you can not repair it, do not have enough money!');
    alert.show();
  }
  else{
    user.money = P(user.money-repaircost);
    flat.state = 1;
    Flat(id);
    Panel();
  }
}
function Loan(){
  body.html('');
  //var back = $('<button/>');
  var take = $('<button/>');
  var amount = $('<select/>');
  amount.addClass('amount');
  amount.append('<option value="5000">5000</option>');
  amount.append('<option value="10000">10000</option>');
  amount.append('<option value="25000">25000</option>');
  amount.append('<option value="40000">40000</option>');
  amount.append('<option value="100000">100000</option>');
  amount.append('<option value="500000">500000</option>');
  amount.append('<option value="1000000">1000000</option>');
  
  back.show();
  //back.addClass('back');
  back.data('target','home');
  back.html('Back to home');
  //body.append(back);
  body.append('<h3>Take a loan</h3>');
  body.append(amount);
  
  take.addClass('buysell');
  
  take.html('Take');
  take.data('target','takeloan');
  
  body.append(take);
  body.ready(function(){
    Click();
  });
}
function Rules(){
  body.html('');
  //var back = $('<button/>');
  //back.addClass('back');
  back.show();
  back.data('target','home');
  back.html('Back to home');
  //body.append(back);
  body.append('<h3>Rules</h3>');
  
  body.ready(function(){
    Click();
  });
}
function Home(){
  body.html('');
  body.hide();
  //var back = $('<button/>');
  
  //back.data('target','flats');
  //back.html('Back to flats');
  //body.append(back);
  body.append('<h3>Home</h3>');
  
  body.ready(function(){
    Click();
  });
}
function Work(){
  body.html('');
  //var back = $('<button/>');
  var news = $('<button/>');
  var hots = $('<button/>');
  var carw = $('<button/>');
  var data = [];
  
  //back.addClass('back');
  back.show();
  back.data('target','home');
  back.html('Back to home');
  //body.append(back);
  body.append('<h3>Work</h3>');
  
  news.data('target','worknews');
  news.html('Work');
  data.push(['You can deliver newspapers: ',news]);
  
  hots.data('target','worknews');
  hots.html('Work');
  data.push(['You can sell hotdogs in the park: ',hots]);
  
  carw.data('target','workcarw');
  carw.html('Work');
  data.push(['You can wash cars near the parking: ',carw]);
  
  body.append(Table(data));
  body.ready(function(){
    Click();
  });
}
function AddMoney(){
  body.html('');
  //var back = $('<button/>');
  back.show();
  back.data('target','home');
  back.html('Back to home');
  //body.append(back);
  body.append('<h3>Add money</h3>');
  
  body.ready(function(){
    Click();
  });
}
function Table(data){
  var table = $('<table/>');
  for(var i=0;i<data.length;i++){
  var d=data[i];
    var tr = $('<tr/>');
    for(var j=0;j<d.length;j++){
      var td = $('<td/>');
      td.html(d[j]);
      tr.append(td);
    }
    table.append(tr);
  }
  return table;
}
function Panel(){
  //$('.panel .days').html(count);
  var moneyin = 0;
  var moneyout = 0;
  for(var i=0;i<flats.length;i++){
  var flat=flats[i];
    if(flat.user===true){
      moneyin = moneyin+P(flat.rent/flat.state);
    }
  }
  
  if(moneyin>0){
    $('.panel .in').html(moneyin);
  }
  else{
    $('.panel .in').html('');
  }
  if(user.loan>0){
    moneyout = P(user.loan*0.1);
    //$('.panel .loan').html();
    
    $('.panel .out').html('-'+moneyout);
    $('.panel .loan').html(P(user.loan-user.loanpaid));
  }
  else{
    $('.panel .out').html('');
    $('.panel .loan').html('');
  }
  //user.money = user.money+moneyin-moneyout;
  $('.panel .money').html(user.money);
  $('.panel .money,.panel .loan,.panel .out,.panel .in').autoNumeric('update',{              
    aSep: ' ',
    aDec: '.',
    mDec: 0
  });
  if(moneyin>0){
    $('.panel .in').prepend('+');
  }
}
function Update(){
  if(count==1){
    var moneyin = 0;
    var moneyout = 0;
    
    for(var i=0;i<flats.length;i++){
    var flat=flats[i];
      if(flat.user===true){
        moneyin = moneyin+P(flat.rent/flat.state);
      }
    }
    
    //moneyin = moneyin;
    moneyout = P(user.loan*0.1);
    user.money = P(user.money+moneyin-moneyout);
    user.loanpaid = P(user.loanpaid+moneyout);
    if(user.loan<=user.loanpaid){
      user.loan = 0;
      user.loanpaid = 0;
    }
    if(user.money<0){
      alertc.html('You have nothing to eat and your life is finished...<h3 align="center">GAME OVER</h3>');
      alert.show();
      return false
    }
  }
  
  Panel();
  count++;
  if(count>3){
    count = 1;
  }
  Click();
  setTimeout(Update,2000);
}
function P(n){return parseInt(n);}
function Click(){
  $('button').unbind('click').click(function(){
    //Clear();
    var btn = $(this);
    var target = btn.data('target');
    if(P(btn.data('id'))>=0){
      var id = btn.data('id');
      var flat = flats[id];
    }
    if(btn.hasClass('back')){
      btn.hide();
    }
    body.show();
    switch(target){
      case'flats':{
        Flats();
        break;
      }
      case'flat':{
        Flat(id);
        break;
      }
      case'buy':{
        bg.setLayerGroup(flats[id].id,{
          fillStyle: '#ff0'
        }).drawLayers();;
        if(user.money>=flat.cost){
          flats[id].user = true;
          user.money = P(user.money-flats[id].cost);
          Panel();
          Flats();
        }
        else{
          alertc.html('You can not buy it, do not have enough money!');
          alert.show();
        }
        break;
      }
      case'sell':{
        flats[id].user = false;
        user.money = user.money+flats[id].cost;
        Panel();
        Flats();
        break;
      }
      case'loan':{
        Loan();
        break;
      }
      case'takeloan':{
        user.loan = user.loan+P($('.amount').val())+P($('.amount').val())*0.1;
        user.money = user.money+P($('.amount').val());
        back.hide();
        Panel();
        Home();
        break;
      }
      case'rules':{
        Rules();
        break;
      }
      case'buyflat':{
        BuyFlat();
        break;
      }
      case'repair':{
        Repair(id);
        break;
      }
      case'home':{
        Home();
        break;
      }
      case'work':{
        Work();
        break;
      }
      case'worknews':{
        user.money += 1;
        Panel();
        break;
      }
      case'workhots':{
        user.money += 2;
        Panel();
        break;
      }
      case'workcarw':{
        user.money += 5;
        Panel();
        break;
      }
      case'addmoney':{
        AddMoney();
        break;
      }
    }
    return false
  });
}
function Shuffle(array){
  var currentIndex = array.length, temporaryValue, randomIndex ;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
function ID(){
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for( var i=0; i < 5; i++ ){
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
function Rand(min,max){return P(Math.random() * (max - min) + min);}




















