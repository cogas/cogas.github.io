$(function(){
  var freq = 5;
  var length = 59;
  var area = new Array(length); // x,y,uを状態にもつ。x,yはマスの左上の座標。uは濃度(0~1)。
  var newarea = new Array (length);
  var color 
  var w = $('canvas')[0].width;
	var h = $('canvas')[0].height;
	
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
        area[i][j] = {x:600/(length+1)*i, y:600/(length+1)*j, u: Math.round(Math.random())};
      }
    }
  };
  

  function draw() {
    $('canvas').clearCanvas();
    for (var i=0; i<=length; i++){
      for(var j=0; j<=length; j++){
        $('canvas').drawRect({
          fillStyle: 'rgba(0,0,0,'+((area[i][j].u+1)%2)+')',
          width : 600/(length+1), height : 600/(length+1), fromCenter : false,
          x: area[i][j].x, y: area[i][j].y,
        });
        }
    }
  };
  
  
  function renew() {
    for(var i=0; i<=length; i++){
      for(var j=0; j<=length; j++){
        if(deathCheck (area[i][j])) {newarea[i][j] = 1;}
        else {
          if (birthCheck (area[i][j])) {newarea[i][j] = 0;}
          else newarea[i][j] = area[i][j].u;
        }
      }
    }
    for(var i=0; i<=length; i++){
      for(var j=0; j<=length; j++){
        area[i][j].u = newarea[i][j];
      }
    }
  };
  
  
  function birthCheck(obj) {
    return (obj.u == 1 && (aroundSum (obj) == 3));
  };
  
  
  function deathCheck(obj) {
    return (obj.u == 0 && (aroundSum(obj) != 3) && (aroundSum(obj) !=2));
  };
  
  
  function aroundSum(obj){
    var sum;
    var i = (obj.x)*(length+1)/600;
    var j = (obj.y)*(length+1)/600;
    var a,b,c,d;
    if(i == 0) a = 1; else a = area[i-1][j].u;
    if(i == length) b = 1; else b = area[i+1][j].u;
    if(j == 0) c = 1; else c = area[i][j-1].u;
    if(j == length) d = 1; else d = area[i][j+1].u;
    if(i != 0 && j != 0) e = area[i-1][j-1].u; else e = 1;
    if(i != length && j != 0) f = area[i+1][j-1].u; else f =1;
    if(j != length && i != 0) g = area[i-1][j+1].u; else g =1;
    if(j != length && i != length) h = area[i+1][j+1].u; else h=1;
    sum = a+b+c+d+e+f+g+h;
    return (8-sum);
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
    freq = $(this)[0].value;
    interval = setInterval(loop,1000/freq);
  });
  $('#extinct').click(function(){
    for (var i=0; i<=length; i++){
      for(var j=0; j<=length; j++){
        area[i][j].u = 1;
        $('canvas').drawRect({
          fillStyle: 'rgb('+ Math.round(area[i][j].u*256) + ',' + Math.round(area[i][j].u*256) + ',' + Math.round(area[i][j].u*256) + ')',
          width : 600/(length+1), height : 600/(length+1), fromCenter : false,
          x: area[i][j].x, y: area[i][j].y,
        });
        }
    }
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
    area[i][j].u = (area[i][j].u+1)%2;
    $('canvas').drawRect({
      fillStyle: 'rgb('+ Math.round(area[i][j].u*256) + ',' + Math.round(area[i][j].u*256) + ',' + Math.round(area[i][j].u*256) + ')',
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
        area[i][j].u = (area[i][j].u+1)%2;
        $('canvas').drawRect({
          fillStyle: 'rgb('+ Math.round(area[i][j].u*256) + ',' + Math.round(area[i][j].u*256) + ',' + Math.round(area[i][j].u*256) + ')',
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


