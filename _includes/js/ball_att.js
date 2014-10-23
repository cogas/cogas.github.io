$(function(){
  var freq = 100;
  var mass = new Array();
  var round = 25;
  var delta = 0.1;
  var n = 4;
  var center = {x:0,y:0}
  var w = $('canvas')[0].width;
  var yuragi = 50;
  var gravity = 0;
  var gensui = 0.5;

  init();
  var interval = setInterval (loop, 1000/freq);
  loop();
  
  
  function loop () {
    $('canvas').clearCanvas()
    for(var i=0; i<=n; i++){
      renew(mass[i]);
      draw(mass[i]);
      center = {x: center.x + mass[i].point.x, y: center.y + mass[i].point.y};
    }
  };
  
  function init() {
    for(var i=0; i<= n; i++){
      mass[i] = {point:{x:0, y:0}, vel:{x:0, y:0}};
      mass[i].point = {x: round + Math.random()*(600-2*round), y: round + Math.random()*(600-2*round)};
      mass[i].vel = {x : (Math.random()-0.5)*100, y: (Math.random()-0.5)*100};
    };
  };
  
  function draw(m) {
    $('canvas')
    .drawArc({
      fillStyle: color,
      x: m.point.x, y: m.point.y, radius: round,
    });
  };
  
  function renew(m) {
    m.vel.x += -gensui*m.vel.x*delta + Math.sqrt((-2)*Math.log(Math.random()))*Math.sin(2*Math.PI*Math.random())*yuragi*delta;
    m.vel.y += -gensui*m.vel.y*delta + Math.sqrt((-2)*Math.log(Math.random()))*Math.sin(2*Math.PI*Math.random())*yuragi*delta + gravity*delta;
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
  
  
  $('#reset')
  .click(function(event){
    clearInterval (interval);
    init();
    interval = setInterval(loop,1000/freq);
  }); 
  var color = "darkblue";
  $('#color1').change(function(){
    color = "darkblue";
  });
  $('#color2').change(function(){
    color = "darkred";
  });
  $('#speed').change(function(){
    clearInterval(interval);
    freq = $(this)[0].value;
    interval = setInterval(loop,1000/freq);
  });
  $('#number').change(function(){
    clearInterval(interval);
    n = Number($(this)[0].value-1);
    init();
    interval = setInterval(loop,1000/freq);
  });
  $('#rad').change(function(){
    round = Number($(this)[0].value);
  });
  $('#yuragi').change(function(){
    yuragi = Number($(this)[0].value);
  });
  $('#gravity').change(function(){
    gravity = Number($(this)[0].value);
  });
  $('#gensui').change(function(){
    gensui = Number($(this)[0].value);
  });
  
});


