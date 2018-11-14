//localStorage.clear();
//console.info(ImportFlats());
var types = {
  1: 'econom',
  2: 'standard',
  3: 'elite',
  4: 'lux',
  5: 'penthouse'
};
var states = {
  1: 'great',
  2: 'normal',
  3: 'bad'
};
var works = {
  1: {name: 'Newspaper delivery boy', amount: 10, cost: 0},
  2: {name: 'Car washing', amount: 15, cost: 1000},
  3: {name: 'Pizza delivery boy', amount: 20, cost: 5000},
  4: {name: 'Fast food waiter', amount: 30, cost: 15000},
  5: {name: 'Office worker', amount: 50, cost: 50000},
  6: {name: 'Office manager', amount: 100, cost: 200000},
  7: {name: 'Head of Department', amount: 200, cost: 500000},
  8: {name: 'Head of District', amount: 500, cost: 1000000},
  9: {name: 'Top manager', amount: 2000, cost: 10000000},
  10: {name: 'CEO', amount: 5000, cost: 100000000}
};
var works_start = works;
var user;
var user_start = {
  name: 'John Smith',
  money: 5000,
  loan: 0,
  loanpaid: 0,
  work: 1,
  workclicks: 0,
  scodes: [],
  rooms: 0,
  flats: 0
};
var flats = ImportFlats();
var sets;
var sets_start = {};
sets_start.audio = 1;
sets_start.v = '1';
var d1 = $('.d1');
var d2 = $('.d2');
var body = $('.body');
var doc = $(document);
var back = $('.back');
var logo = $('.logo');
var audio = El('audio');
var mn = $('.main');
var mnw = $('.mainwrap');
var interval;
var timeout = 30;
var timer = 0;
var worktimer = null;
var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
var wsvg = 1200;
var hsvg = 900;
var topnew = 0;
//var wb = w/10;
//var hb = h/10;
//var y = 0;
//var x = wb*(-1);
var count = 0;
var alert = $('.alert');
var alertc = $('.alert-content');
var alertx = $('.alert-close');
alertx.click(function () {
  alert.hide();
});
var tax = {};
tax.buy = 1.2;
tax.sell = 0.9;
//var bg = $('canvas#bg');
//var ac = $('canvas#cars');
//var ap = $('canvas#planes');
//var ab = $('canvas#boards');
//var as = $('canvas#sky');
//var jact = $('canvas#action');
//var plane1 = $('.plane1');
//var plane2 = $('.plane2');

var jact = $('#action');
var scodes = {
  'RENTFFW': {amount: 0, work: 4},
  'RENTOW100K': {amount: 100000, work: 5},
  'RENTMIDDLE800K': {amount: 800000, work: 0},
  'RENTPROOM1M': {amount: 1000000, work: 6},
  'RENTHIGH5M': {amount: 5000000, work: 0},
  'RENTUNLIM20M': {amount: 20000000, work: 0},
  'RENTCREDITS!': {amount: 100000000, work: 0}
};
//var fq = canvas.toDataURL("image/jpeg",1.0);
// data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ...9oADAMBAAIRAxEAPwD/AD/6AP/Z"
//var mq = canvas.toDataURL("image/jpeg",0.5); 
//var lq = canvas.toDataURL("image/jpeg",0.1);

var cars = [
  {color: '#f00', x: 20, y: 50},
  {color: '#0f0', x: 120, y: 70},
  {color: '#ff0', x: 200, y: 20},
  {color: '#00f', x: 250, y: 100}
];

var houses = [
  {f: 5, t: 2, o: 1, w: 7, h: 7, s: 8, c: '#1bbc9d'},//green
  {f: 9, t: 3, o: 1, w: 9, h: 9, s: 9, c: '#3598dc'},//blue
  {f: 8, t: 4, o: 1, w: 8, h: 8, s: 7, c: '#f1c40f'},//yellow
  {f: 7, t: 1, o: 3, w: 8, h: 8, s: 6, c: '#ecf0f1'},//white
  {f: 9, t: 5, o: 1, w: 9, h: 9, s: 7, c: '#c1392b'},//red
  {f: 9, t: 1, o: 2, w: 7, h: 7, s: 6, c: '#ecf0f1'},//white
  {f: 5, t: 4, o: 1, w: 8, h: 8, s: 7, c: '#f1c40f'},//yellow
  {f: 6, t: 2, o: 1, w: 9, h: 9, s: 9, c: '#1bbc9d'},//green
  {f: 8, t: 3, o: 1, w: 7, h: 7, s: 9, c: '#3598dc'},//blue
  {f: 9, t: 5, o: 1, w: 8, h: 8, s: 7, c: '#c1392b'},//red
  {f: 7, t: 4, o: 1, w: 7, h: 7, s: 8, c: '#f1c40f'},//yellow
  {f: 9, t: 1, o: 3, w: 8, h: 8, s: 8, c: '#ecf0f1'},//white
  {f: 8, t: 2, o: 1, w: 8, h: 8, s: 8, c: '#1bbc9d'},//green
  {f: 6, t: 5, o: 1, w: 7, h: 7, s: 7, c: '#c1392b'},//red
  {f: 5, t: 4, o: 1, w: 7, h: 7, s: 8, c: '#f1c40f'},//yellow
  {f: 9, t: 3, o: 1, w: 9, h: 9, s: 6, c: '#3598dc'} //blue
];

//white - 1
//green - 2
//blue - 3
//yellow - 4
//red - 5

//$('.panel .money,.panel .loan,.panel .out,.panel .in,.mny').autoNumeric('init',{              
//  aSep: ' ',
//  aDec: '.',
//  mDec: 0
//});

//var numeral = require('numeral');

//if(h<400){

//console.info(h);
//var hnew = h;
//var wnew = hnew*1000/400;
//bg.css({'height':hnew+'px','width':wnew+'px'});
//ac.css({'height':hnew+'px','width':wnew+'px'});
//ap.css({'height':hnew+'px','width':wnew+'px'});
//ab.css({'height':hnew+'px','width':wnew+'px'});
//as.css({'height':hnew+'px','width':wnew+'px'});
//}
//else if(h>=400){
topnew = (h - 400) / 2;
mnw.css({'top': topnew + 'px'});
//ac.css({'top':topnew+'px'});
//ap.css({'top':topnew+'px'});
//ab.css({'top':topnew+'px'});
//as.css({'top':topnew+'px'});
//}























