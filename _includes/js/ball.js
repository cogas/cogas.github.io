$(function(){
  var freq = 100;
  var mass = new Array();
  var round = 5;
  var delta = 0.1;
  var n = 99;
  var center = {x:0,y:0}
  var w= $('canvas')[0].width;

  init();
  var interval = setInterval (loop, 1000/freq);
  loop();
  
  
  function loop () {
    center = {x:0, y:0};
    $('canvas').clearCanvas()
    for(var i=0; i<=n; i++){
      renew(mass[i]);
      draw(mass[i]);
      center = {x: center.x + mass[i].point.x, y: center.y + mass[i].point.y};
    }
    $('canvas')
    .drawArc({
      fillStyle: 'rgba(200,200,200,250)',
      x:300,y:300,radius:50
    })
    .drawArc({
      groups: ['center'],
      fillStyle: 'darkred',
      x: center.x/(n+1), y: center.y/(n+1), radius: round,
    });
    if(Math.sqrt(Math.pow(center.x/(n+1)-300,2)+Math.pow(center.y/(n+1)-300,2))>=50) clearInterval(interval);      
  }
  function init() {
    center = {x:0, y:0}
    for(var i=0; i<= n; i++){
      mass[i] = {point:{x:0, y:0}, vel:{x:0, y:0}};
      mass[i].point = {x: round + Math.random()*(600-2*round), y: round + Math.random()*(600-2*round)};
      mass[i].vel = {x : (Math.random()-0.5)*10, y: (Math.random()-0.5)*10};
      center = {x: center.x + mass[i].point.x, y: center.x + mass[i].point.y};
    };
  };
  
  function draw(m) {
    $('canvas')
    .drawArc({
      groups: ['particle'],
      fillStyle: 'darkblue',
      x: m.point.x, y: m.point.y, radius: round,
    });
  };
  
  function renew(m) {
    m.vel.x += (Math.random()-0.5)*20*delta;
    m.vel.y += (Math.random()-0.5)*20*delta;
    m.point.x += m.vel.x*delta;
    m.point.y += m.vel.y*delta;
    reflect (m);
  };
  
  function reflect (m){
    if (m.point.x - round  < 0) {m.point.x = round; m.vel.x *= -1;}
    if (m.point.x + round > 600) {m.point.x = 600-round; m.vel.x *= -1;}
    if (m.point.y - round  < 0) {m.point.y = round; m.vel.y *= -1;}
    if (m.point.y + round > 600) {m.point.y = 600-round; m.vel.y *= -1;}
  };
});


