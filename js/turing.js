﻿$(function(){
  var freq = 5;
  var length = 59;
  var area = new Array(length); // area[i][j]は、そのマスのu,v量、拡散係数du,dv、換算座標(x,y)をプロパティにもつ。u,vは0-1.
  var newarea = new Array(length); //newarea[i][j]は、更新時のu,v量、Dをプロパティにもつ。
  var color;
  var w = $('canvas')[0].width;
	var h = $('canvas')[0].height;
	var dt = 0.01;
	var Du = 0.5;
	var Dv = 0.5;
	var a=1;
	var b=-1;
	var c=-1;
	var d=1;
	
  init();
  draw();
  var interval = setInterval(loop, 1000/freq);
  
  
  function loop (){
    renew();
    draw();
  }
  
  function init() {
    for (var i=0; i<=length; i++){
      area[i] = new Array(length);
      newarea[i] = new Array (length); 
      for(var j=0; j<=length; j++){
        area[i][j] = {x:600/(length+1)*i, y:600/(length+1)*j, u:Math.random(), v:Math.random(), Du:Du, Dv:Dv};
        newarea[i][j] = {u:0, v:0, Du:Du, Dv:Dv};
      }
    }
  };
  

  function draw() {
    $('canvas').clearCanvas();
    for (var i=0; i<=length; i++){
      for(var j=0; j<=length; j++){
        $('canvas').drawRect({
          fillStyle: 'rgba(0,0,0,'+(area[i][j].u)+')',
          width : 600/(length+1), height : 600/(length+1), fromCenter : false,
          x: area[i][j].x, y: area[i][j].y,
        });
        }
    }
  };
  
  
  function renew() {
    for(var i=0; i<=length; i++){
      for(var j=0; j<=length; j++){
      	newarea[i][j].u = dt*( f(area[i][j].u, area[i][j].v) + Du*laplacianU(i,j) );
      	newarea[i][j].v = dt*( g(area[i][j].u, area[i][j].v) + Dv*laplacianV(i,j) );
      }
    }
    for(var i=0; i<=length; i++){
      for(var j=0; j<=length; j++){
        area[i][j].u += newarea[i][j].u;
        area[i][j].v += newarea[i][j].v;
      }
    }
  };
  
	function laplacianU(i,j){
    var a,b,c,d;
    if(i == 0) a = 0; else a = area[i-1][j].u;
    if(i == length) b = 0; else b = area[i+1][j].u;
    if(j == 0) c = 0; else c = area[i][j-1].u;
    if(j == length) d = 0; else d = area[i][j+1].u;
    return (a+b+c+d-4*area[i][j].u);
	};
	
	function laplacianV(i,j){
    var a,b,c,d;
    if(i == 0) a = 0; else a = area[i-1][j].v;
    if(i == length) b = 0; else b = area[i+1][j].v;
    if(j == 0) c = 0; else c = area[i][j-1].v;
    if(j == length) d = 0; else d = area[i][j+1].v;
    return (a+b+c+d-4*area[i][j].v);
	};

	function f (u,v){
		return (a*u+b*v);
	};
	
	function g (u,v){
		return (c*u+d*v);
	};


  $('#mass20')
  .change(function(){
    clearInterval(interval);
    length = 19;
    init();
    draw();
    interval = setInterval(loop,1000/freq);
  });
  $('#mass60')
  .change(function(){
    clearInterval(interval);
    length = 59;
    init();
    draw();
    interval = setInterval(loop,1000/freq);
  });
  $('#mass100')
  .change(function(){
    clearInterval(interval);
    length = 99;
    init();
    draw();
    interval = setInterval(loop,1000/freq);
  });
  $('#mass150')
  .change(function(){
    clearInterval(interval);
    length = 149;
    init();
    draw();
    interval = setInterval(loop,1000/freq);
  });
  $('#speed').change(function(){
    clearInterval(interval);
    freq = Number($(this)[0].value);
    interval = setInterval(loop,1000/freq);
  });
  $('#Du').change(function(){
    Du = Number($(this)[0].value);
  });
  $('#Dv').change(function(){
    Dv = Number($(this)[0].value);
  });
  $('#a').change(function(){
    a = Number($(this)[0].value);
  });
  $('#b').change(function(){
    b = Number($(this)[0].value);
  });
  $('#c').change(function(){
    c =Number($(this)[0].value);
  });
  $('#d').change(function(){
    d = Number($(this)[0].value);
  });

  $('#dt').change(function(){
    dt = Number($(this)[0].value);
  });
  $('#extinct').click(function(){
    for (var i=0; i<=length; i++){
      for(var j=0; j<=length; j++){
        area[i][j].u = 0;
 				area[i][j].v = 0;
        $('canvas').drawRect({
          fillStyle: 'rgba(0,0,0,0)',
          width : 600/(length+1), height : 600/(length+1), fromCenter : false,
          x: area[i][j].x, y: area[i][j].y,
        });
        }
    }
  });
  $('#reset').click(function(){
  	init();
  	draw();
  });

  
  var mauseState = false;
  var memi,memj;
  $('canvas')
  .mousedown(function(event){
    clearInterval (interval);
    mauseState = true;
    var ofst = $(event.target).offset();
    var x = event.pageX - ofst.left;
    var y = event.pageY - ofst.top;
    var i = Math.floor(x*(length+1)/600);
    var j = Math.floor(y*(length+1)/600);
    memi = i; memj = j;
    area[i][j].u = 1;
    area[i][j].v = 0;
    $('canvas').drawRect({
      fillStyle: 'rgba(0,0,0,1)',
      width : 600/(length+1), height : 600/(length+1), fromCenter : false,
      x: area[i][j].x, y: area[i][j].y,
    });
  })
  .mousemove(function(event){
    if(mauseState){
      var ofst = $(event.target).offset();
      var x = event.pageX - ofst.left;
      var y = event.pageY - ofst.top;
      var i = Math.floor(x*(length+1)/600);
      var j = Math.floor(y*(length+1)/600);
      if(memi != i || memj != j){
        memi = i; memj = j;
        area[i][j].u = 1;
		    area[i][j].v = 0;
        $('canvas').drawRect({
          fillStyle: 'rgba(0,0,0,1)',
          width : 600/(length+1), height : 600/(length+1), fromCenter : false,
          x: area[i][j].x, y: area[i][j].y,
        });
      }
    }
  })
  .mouseup(function(event){
    mauseState = false;
    interval = setInterval(loop,1000/freq);
  });


});


