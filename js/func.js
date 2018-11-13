'use strict';

function BuyFlat(hid){
  //console.info('Init BuyFlat',hid);
  body.html('');
  body.show();
  logo.show();
  var fs = [];
  var flts = [];
  $('#svg2 g').each(function() {
    var g = $(this);
    if (g.attr('inkscape:label')=='flat') {
      var f = g.attr('id');
      f = f.split('-');
      if (f[0]==hid) {
        flts.push(g.attr('id'));
      }
    }
  });
  back.data('target','home');
  back.show();
  body.append('<h1 align="center">Buy flat</h1>');
  for(var i=0;i<flts.length;i++){
    var fid = flts[i];
    for(var j in flats){
      if(flats[j].id==fid){
        var flat = flats[j];
        break;
      }
    }
    var fusr = P(flat.user);
    var f = [];
    var name = [];
    var cost = P(flat.cost);
    var state = P(flat.state);
    var rooms = P(flat.rooms);
    var rent = P(flat.rent);
    var buy = $('<button/>');
    var repair = '';
    var repairbtn = $('<button/>');
    var repaircost = 0;
    
    f.push(state>1?'&#9874;':'&nbsp;');
    
    name.push(states[state]);
    name.push(rooms);
    name.push(rooms==1?'room':'rooms');
    
    if(fusr==1){
      repaircost = P((state-1)*cost*0.25);
      if (repaircost>0) {
        repair = '<div class="repair" style="color:#0e0;"><span class="mny"><span class="coin coin14"></span>'+repaircost.format(0,'.',' ')+'</span> <button data-target="repair" data-id="'+fid+'">Repair</button></div>';
        name.push(repair);
      }
    }
    
    f.push(name.join(' '));
    var income = '<div class="mny" style="color:#0e0;">+'+P(rent/state).format(0,'.',' ')+'</div>';
    if(fusr==1){
      f.push('<div align="" class="mny"><span class="coin coin14"></span>'+P((cost-cost*((state-1)/10))*tax.sell).format(0,'.',' ')+'</div>'+income);
    }
    else{
      f.push('<div align="" class="mny"><span class="coin coin14"></span>'+P((cost-cost*((state-1)/10))*tax.buy).format(0,'.',' ')+'</div>'+income);
    }
    buy.data('id',fid);
    buy.addClass('');
    if(flat.user){
      buy.html('Sell');
      buy.data('target','sell');
      buy.addClass('sell');
    }
    else{
      buy.html('Buy');
      buy.data('target','buy');
      buy.addClass('buy');
    }
    f.push(buy);
    
    fs.push(f);
  }
  body.append(Table(fs,'flats'));
  
  body.ready(function(){
    Click();
  });
}
function State(s) {
  var state = [];
  for(var i=0;i<s;i++){
    state.push('&#9733;');
  }
  for(var j=i;j<Object.keys(states).length;j++){
    state.push('&#9734;');
  }
  //console.info(state.length,states);
  return '<span class="stars">'+state.join('')+'</span>';
}
function ImportFlats(){
  var flats = [];
  $('#svg2 g').each(function() {
	var g = $(this);
	if (g.attr('inkscape:label')=='flat') {
      var f = g.attr('id');
      //console.info(f);
	  f = f.split('-');
	  var s = Rand(1,3);
	  var rooms = g.find('path').length;
	  var cost = Math.ceil(Rand(20000*rooms*rooms,40000*rooms*rooms) /10000) * 10000;
	  var rent = cost*(Rand(3,7)*0.001);
	  var hid = f[0];
	  var fid = g.attr('id');
	  
	  flats.push({
		id:fid,
		house:hid,
		internet:1,
		state:s,
		cost:cost,
		rent:rent,
		user:0,
		type:g.attr('id'),
		rooms:rooms
	  });
	}
  });
  return flats;
}
function Flat(id){
  body.html('');
  //var back = $('<button/>');
  var buy = $('<button/>');
  var repair = $('<button/>');
  var repaircost = 0;
  var flat = flats[id];
  var name = [];
  var cost = P(flat.cost);
  var state = P(flat.state);
  var type = P(flat.type);
  var rent = P(flat.rent);
  var fusr = P(flat.user);
  name.push(type);
  name.push(type==1?'room':'rooms');
  name.push(states[state]);
  name.push(types[type]);
  if(fusr==1){
    back.data('target','flats');
  }
  else{
    back.data('target','buyflat');
    back.data('id',parseInt(flat.house));
  }
  back.show();
  //back.addClass('back');
  //back.html('Back to flats');
  //body.append(back);
  body.append('<h1 align="center">'+name.join(' ')+'</h1>');
  
  if(fusr==1){
    body.append('<h2 align="center" class="mny">§'+P((cost-cost*((state-1)/10))*tax.sell).format(0,'.',' ')+'</h2>');
  }
  else{
    body.append('<h2 align="center" class="mny">§'+P((cost-cost*((state-1)/10))*tax.buy).format(0,'.',' ')+'</h2>');
  }
  
  body.append('<h2 align="center" class="mny">§'+P(rent/state).format(0,'.',' ')+'</h2>');
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
  repaircost = P((state-1)*cost*0.1);
  
  if(repaircost>0&&flat.user){
    repair.addClass('repair');
    repair.data('target','repair');
    repair.data('id',id);
    repair.html(repaircost.format(0,'.',' ')+' Repair');
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
  console.info('Init Repair');
  for(var j in flats){
    if(flats[j].id==id){
      var flat = flats[j];
      break;
    }
  }
  var cost = P(flat.cost);
  var state = P(flat.state);
  var rooms = P(flat.rooms);
  var rent = P(flat.rent);
  var repaircost = P((state-1)*cost*0.25);
  if(repaircost>user.money){
    alertc.html('you can not repair it, do not have enough money!');
    alert.show();
  }
  else{
    user.money = P(user.money-repaircost);
    flat.state = 1;
    BuyFlat(flat.house);
    Panel();
  }
}
function Loan(){
  body.html('');
  //var back = $('<button/>');
  var loans = [5000,10000,25000,40000,100000,500000,1000000];
  var lns = [];
  back.show();
  back.data('target','home');
  //back.html('Back to home');
  body.append('<h1 align="center">Take a loan</h1>');
  for(var i=0;i<loans.length;i++){
    var amount = [];
    var loan = loans[i];
    amount.push('<span class="mny"><span style="  color: #f00;font-size: 12px;position: absolute;right: 5px;bottom: 0px;">-'+(loan*0.05).format(0,'',' ')+'</span> <span class="coin coin16"></span>'+loan.format(0,'',' ')+'</span>');
    amount.push('<button data-target="takeloan" data-id="'+loan+'" class="takeloan">Take</button>');
    lns.push(amount);
  }
  body.append(Table(lns,'loans'));
  body.ready(function(){
    Click();
  });
}
function Rules(){
  body.html('');
  var rules = [];
  var scode = $('<input/>');
  var scodebtn = $('<button/>');
  scode.addClass('scode').attr('placeholder','Special code');
  scodebtn.addClass('scodebtn').data('target','scode').html('Add code');
  back.show();
  back.data('target','home');
  //back.html('Back to home');
  body.append('<h1 align="center">Rules</h1>');
  rules.push(['1.','You can buy an apartment by clicking on the house. There you can sell the apartment.']);
  rules.push(['2.','You can take a loan to buy a flat by clicking on "Loan". The credit is calculated as follows: 1000 + 10% = 1100. You always give 10% more than take.']);
  rules.push(['3.','Also you can work. see their status and working to earn money, you can click on the "Work". there you can improve your level.']);
  rules.push(['4.','Watch your balance - with a negative balance, you lose.']);
  body.append(Table(rules,'rules'));
  body.append('<h3>Good Luck!</h3>');
  body.append(scode);
  body.append(scodebtn);
  body.append('<p align="center">If you want to restart click on the button below</p>');
  body.append('<p align="center">WARNING! Everything will be deleted! Be careful!</p>');
  body.append('<p><button class="restart" data-target="restart">Restart</button></p>');
  
  body.ready(function(){
    Click();
  });
}
function Credits(){
  body.html('');
  var credits = [];
  back.show();
  back.data('target','home');
  //back.html('Back to home');
  body.append('<h1 align="center">Credits</h1>');
  body.append('<p align="center"><img src="img/logo_datsko.png" style="background: #fff;"></p>');
  body.append('<p align="center"><a href="https://datsko.net">https://datsko.net</a></p>');
  credits.push(['Programming','Mykhailo Datsko']);
  credits.push(['Game logic and levels','Mykhailo Datsko']);
  credits.push(['Design','Mykhailo Datsko<br>Maxim Prokopenko']);
  credits.push(['Graphic','Maxim Prokopenko']);
  credits.push(['Testing','Aleksandr Datsko']);
  //credits.push(['Audio','<a href="http://tonenoise.com/">tonenoise.com</a>']);
  body.append(Table(credits,'credits'));
  body.append('<h3>Thank you for playing our games!</h3>');
  
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
  //body.append('<h3>Home</h3>');
  
  body.ready(function(){
    Click();
  });
}
function Work(){
  body.html('');
  //var back = $('<button/>');
  var work = $('<button/>');
  var current = $('<div/>');
  var update = $('<button/>');
  var levels = $('<button/>');
  var bonus = $('<div/>');
  var bonuss = $('<div/>');
  var data = [];
  
  //back.addClass('back');
  back.show();
  back.data('target','home');
  //back.html('Back to home');
  body.append('<h1 align="center">Work</h1>');
  
  body.append('<h3 align="center">Current level: <span style="font-size: 30px;display: block;">'+works[user.work].name+'</span></h3>');
  body.append('<div style="text-align:center;font-size:50px;line-height: 100px;" class="mny">+'+works[user.work].amount+'</div>');
  //body.append('<p align="center">Bonus §'+(works[user.work].amount*100)+' after each 100 clicks</p>');
  
  //bonus.addClass('bonus');
  //bonuss.addClass('bonuss');
  //bonus.append(bonuss);
  //body.append(bonus);
  //
  //$('.bonuss').width(user.workclicks+'%');
  
  work.data('target','workact');
  work.addClass('work');
  work.html('Work');
  if(user.workclicks==1){
    work.prop('disabled',true);
  }
  
  body.append(work);
  
  if (user.work<10) {
    update.data('target','upgradework');
    update.addClass('upgradework');
    update.html('Upgrade');
    body.append('<h4 align="center">Next level: <span style="font-size: 25px;display: block;">'+works[user.work+1].name+'</span></h4>');
    body.append('<div align="center" class="mny">+'+works[user.work+1].amount+'</div>');
    body.append('<div align="center" style="margin: 0 0 20px;">Cost: <span class="mny"><span class="coin coin14"></span>'+works[user.work+1].cost.format(0,'',' ')+'</span></div>');
    body.append(update);
  }
  
  body.append('<h3 align="center">Levels</h3>');
  var table = [];
  for(var i in works){
    var work = works[i];
    table.push([work.name,'<span class="mny">+'+work.amount+'</span>','<span class="mny"><span class="coin coin10"></span>'+work.cost.format(0,'',' ')+'</span>']);
  }
  body.append(Table(table,'worklevels'));
  body.ready(function(){
    Click();
  });
}
function WorkAct(i,btn){
  if (i>=200){
    $('button.work').attr('disabled',false);
    user.workclicks = 0;
    $('.timer').hide();
  }
  else if(user.workclicks==1){
    $('.timer').show();
    if (i%5){
      var t = (40-Math.ceil(i/5));
      $('.timer').html('00:'+(t<10?'0'+t:t));
    }
    
    i++;
    user.money = user.money + works[user.work].amount;
    Panel();
    setTimeout(function(){WorkAct(i,btn);},200);
  }
}
function AddMoney(){
  body.html('');
  //var back = $('<button/>');
  back.show();
  back.data('target','home');
  //back.html('Back to home');
  //body.append(back);
  body.append('<h3>Add money</h3>');
  
  body.ready(function(){
    Click();
  });
}
function Table(data,cls){
  var table = $('<table/>');
  table.addClass('table');
  if (typeof cls!=='undefined') {
    table.addClass(cls);
  }
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
  var moneyin = 0;
  var moneyout = 0;
  
  for(var j in flats){
    if(flats[j].user==1){
      moneyin = moneyin+P(flats[j].rent/flats[j].state);
    }
  }
  
  if(moneyin>0){
    $('.panel .in').html('+'+moneyin.format(0,'.',' '));
  }
  else{
    $('.panel .in').html('');
  }
  if(user.loan>0){
    moneyout = P(user.loan*0.05);
    //$('.panel .loan').html();
    
    $('.panel .out').html('-'+moneyout.format(0,'.',' '));
    $('.panel .loan').html('<span class="coin coin12"></span>'+P(user.loan-user.loanpaid).format(0,'.',' '));
  }
  else{
    $('.panel .out').html('');
    $('.panel .loan').html('');
  }
  //user.money = user.money+moneyin-moneyout;
  $('.panel .money').html('<span class="coin coin20"></span>'+user.money.format(0,'.',' '));
  UpdateStor();
}
Number.prototype.format = function(c,d,t){
  var n = this;
  c = isNaN(c = Math.abs(c)) ? 2 : c;
  d = d == undefined ? "." : d;
  t = t == undefined ? "," : t;
  var s = n < 0 ? "-" : "";
  var i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "";
  var j = (j = i.length) > 3 ? j % 3 : 0;
  return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};
function UpdateStor(){
  //console.info('Init UpdateStor');
  if(LTest()){
    Set(user,'user');
    Set(types,'types');
    Set(states,'states');
    Set(flats,'flats');
    Set(sets,'sets');
  }
}
function Calendar(){
  //console.info(count);
  if (count==0) {
    $('#svg6554 g').attr('class','');
  }
  else{
    $('#svg6554 #c'+count).attr('class','dayleft');
  }
}
function Update(){
  //console.info('Init Update');
  clearTimeout(interval);
  Calendar();
  if(count==timeout){
    var moneyin = 0;
    var moneyout = 0;
    
    for(var j in flats){
      if(flats[j].user==1){
        moneyin = moneyin+P(flats[j].rent/flats[j].state);
      }
    }
    moneyout = P(user.loan*0.05);
    user.money = P(user.money+moneyin-moneyout);
    user.loanpaid = P(user.loanpaid+moneyout);
    if(user.loan<=user.loanpaid){
      user.loan = 0;
      user.loanpaid = 0;
    }
  }
  else if (count==-1){
    
  }
  timer = 0;
  Panel();
  
  var life = P(user.rooms)<=0?1:P(user.rooms);
  //for(var j in flats){
  //  if(flats[j].user==1){
  //    life = life+flats[j].rooms;
  //  }
  //}
  user.money = user.money-life;
  if(user.money<0){
    alertc.html('You have nothing to eat and your life is ... finished ...<h3 align="center">GAME OVER</h3><button class="restart" data-target="restart">Restart</button>');
    alertx.hide();
    alert.show();
    Click();
    return;
  }
  count++;
  if(count>timeout){
    count = 0;
    //$('.progress-bg').width('0%');
  }
  Click();
  //SvgClick();
  interval = setTimeout(Update,1000);
}
function Restart(){
  //console.info('Init Restart');
  types = {
    1:'econom',
    2:'standard',
    3:'elite',
    4:'lux',
    5:'penthouse'
  };
  states = {
    1:'great',
    2:'normal',
    3:'bad'
  };
  works = $.extend(true,{},works_start);
  user = $.extend(true,{},user_start);
  //console.info(user,user_start);
  count = 0;
  flats = ImportFlats();
  $('#svg2 g').removeAttr('buy');
  alert.hide();
  alertx.show();
  back.hide();
  logo.hide();
  body.hide();
  //Builds();
  Update();
  Home();
}
function P(n){return parseInt(n);}
function drag(){
  $('button').unbind('click').click(function(){
    //Clear();
    var btn = $(this);
    var target = btn.data('target');
    
    logo.show();
    if(btn.hasClass('back')){
      btn.hide();
      logo.hide();
      $('.house').removeClass('sel');
      UnSel();
    }
    switch(target){
      case'scode':{
        
        break;
      }
      default:{
        body.scrollTop(0).show();
        break;
      }
    }
    
    
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
        var id = btn.data('id');
        for(var j in flats){
          if(flats[j].id==id){
            var flat = flats[j];
            break;
          }
        }
        var cost = flat.cost;
        cost = P((cost-cost*((flat.state-1)/10))*tax.buy);
        if(user.money>=cost){
          flat.user = 1;
          user.money = P(user.money-cost);
          user.flats += 1;
          user.rooms += flat.rooms;
          $('#'+flat.id+'').attr('buy','yes');
          Panel();
          BuyFlat(flat.house);
        }
        else{
          alertc.html('You can not buy it, do not have enough money!');
          alert.show();
        }
        break;
      }
      case'sell':{
        var id = btn.data('id');
        for(var j in flats){
          if(flats[j].id==id){
            var flat = flats[j];
            break;
          }
        }
        flat.user = 0;
        var cost = flat.cost;
        cost = P((cost-cost*((flat.state-1)/10))*tax.sell);
        user.money = user.money+cost;
        user.flats -= 1;
        user.rooms -= flat.rooms;
        $('#'+flat.id+'').attr('buy','no');
        Panel();
        BuyFlat(flat.house);
        break;
      }
      case'loan':{
        Loan();
        break;
      }
      case'restart':{
        Restart();
        break;
      }
      case'takeloan':{
        var id = btn.data('id');
        //console.info(id);
        user.loan = user.loan+P(id)+P(id)*0.05;
        user.money = user.money+P(id);
        back.hide();
        logo.hide();
        body.hide();
        //console.info(user);
        UpdateStor();
        Panel();
        Home();
        break;
      }
      case'rules':{
        Rules();
        break;
      }
      case'buyflat':{
        BuyFlat(id);
        break;
      }
      case'flats':{
        Flats(id);
        break;
      }
      case'repair':{
        var id = btn.data('id');
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
      case'workact':{
        btn.prop('disabled',true);
        user.workclicks = 1;
        back.hide();
        logo.hide();
        body.hide();
        WorkAct(0,btn);
        break;
      }
      case'upgradework':{
        var newlevel = user.work+1;
        //console.info(newlevel);
        if (works.hasOwnProperty(newlevel)) {
          if(user.money>=works[newlevel].cost){
            user.work = newlevel;
            user.money = P(user.money-works[newlevel].cost);
            Panel();
            Work();
          }
          else{
            alertc.html('You can not buy it, do not have enough money!');
            alert.show();
          }
        }
        break;
      }
      case'addmoney':{
        AddMoney();
        break;
      }
      case'credits':{
        Credits();
        break;
      }
      case'scode':{
        $('.scode').removeClass('error').removeClass('warning').removeClass('success');
        $('.errormessage,.warningmessage,.successmessage').remove();
        var scode = $('.scode').val();
        var error = '';
        var errortype = 0;
        //$('.scode').val('');
        if(scodes.hasOwnProperty(scode)&&user.scodes.indexOf(scode)==-1){
          user.scodes.push(scode);
          user.money = user.money+scodes[scode].amount;
          if (user.work<scodes[scode].work) {
            user.work = scodes[scode].work;
          }
          error = 'Success!<br>Check your possibilities!';
          errortype = 3;
        }
        else if(user.scodes.indexOf(scode)>=0){
          error = 'You already have this code!';
          errortype = 2;
        }
        else{
          error = 'Wrong code!';
          errortype = 1;
        }
        switch(errortype){
          case 1:{
            $('.scode').before('<div class="errormessage">'+error+'</div>');
            $('.scode').addClass('error');
            break;
          }
          case 2:{
            $('.scode').before('<div class="warningmessage">'+error+'</div>');
            $('.scode').addClass('warning');
            break;
          }
          case 3:{
            $('.scode').before('<div class="successmessage">'+error+'</div>');
            $('.scode').addClass('success');
            break;
          }
        }
        Panel();
        break;
      }
    }
    return false
  });
}
function UnSel(){
  $('#svg2 path').attr('class','');
}
function SvgClick(){
  
  $('#svg2').click(function(){
    UnSel();
  });
  //$('body:not(.body):not(.body *)').click(function(){
  //  UnSel();
  //});
  $('#svg2 path').each(function(){
    var item = $(this);
    if (item.attr('inkscape:label')=='shadow') {
      //item.mouseenter(function(){
      //  item.attr('class','selected');
      //});
      //item.mouseleave(function(){
      //  item.attr('class','');
      //});
      
      item.click(function(){
        //console.info($('svg').attr('class'));
        if($('#svg2').attr('class')=='noclick'){
          $('#svg2').attr('class','');
        }
        else{
        //if ($('svg').hasClass('noclick')) {
        //  $('svg').removeClass('noclick');
        //}
        //else {
          UnSel();
          item.attr('class','selected');
          //console.info('click');
          var hid = '';
          hid = item.attr('id');
          hid = hid.split('-');
          hid = hid[0];
          BuyFlat(hid);
        //}
        }
      });
    }
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
  for( var i=0; i < 8; i++ ){
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
function Rand(min,max){return P(Math.random() * (max - min) + min);}
function Get(data){
  data = JSON.parse(localStorage.getItem(data));
  return data;
}

function El(el){
  return document.getElementById(el);
}

function Get(data){
  var ls = localStorage;
  data = JSON.parse(ls.getItem(data));
  return data;
}

function Set(data,dataname){
  var ls = localStorage;
 ls.setItem(dataname,JSON.stringify(data));
}
function LTest(){
  //console.info('Init LTest');
  if (localStorage.getItem("infiniteScrollEnabled") === null){
    return true
  }
  else{
    return false
  }
}
//function playAudio(id) {
//    var audioElement = document.getElementById(id);
//    var url = audioElement.getAttribute('src');
//    var my_media = new Media(url,
//            // success callback
//             function () { console.log("playAudio():Audio Success"); },
//            // error callback
//             function (err) { console.log("playAudio():Audio Error: " + err); }
//    );
//           // Play audio
//    my_media.play();
//}
//function stopAudio(id) {
//    var audioElement = document.getElementById(id);
//    var url = audioElement.getAttribute('src');
//    var my_media = new Media(url,
//            // success callback
//             function () { console.log("stopAudio():Audio Success"); },
//            // error callback
//             function (err) { console.log("stopAudio():Audio Error: " + err); }
//    );
//           // Play audio
//    if (my_media) {
//        my_media.pause();
//    }
//}
















