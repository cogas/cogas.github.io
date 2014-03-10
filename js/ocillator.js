window.onload = function(){
    var point = new Array();
    point[0] = {x:250, y:250};
    point[1] = {x:0, y:250};
    point[2] = {x : (point[0].x + point[1].x)/2,y : (point[0].y + point[1].y)/2};
    var velosity = new Array();
    velosity[0] = {x:0, y:0};
    velosity[1] = {x:0, y:0};
    var timer;//タイマー
    var delay = 100;//タイマーを実行する間隔
    var k = 0.5;
    var m = 1;
    var len = 50;
    
    var loop = function(){
        $('canvas').clearCanvas()
        length = Math.sqrt(Math.pow(point[0].x-point[1].x,2)+Math.pow(point[0].y-point[1].y,2))
        velosity[0].x += -m*(length-len)*0.1*(point[0].x-point[1].x)/length;
        velosity[0].y += -m*(length-len)*0.1*(point[0].y-point[1].y)/length;
        point[0].x += velosity[0].x * 0.1 ;
        point[0].y += velosity[0].y * 0.1 ;
        draw(250 + point[0].x, 250 + point[0].y);
        velosity[1].x += -k*(point[1].x-250)*0.1- m*0.1*(length-len)*(point[1].x-point[0].x)/length;
        velosity[1].y += -k*(point[1].y-250)*0.1- m*0.1*(length-len)*(point[1].y-point[0].y)/length;
        point[1].x += velosity[1].x * 0.1 ;
        point[1].y += velosity[1].y * 0.1 ;
        draw(250 + point[1].x, 250 + point[1].y);
        point[2] = {x : (point[0].x + point[1].x)/2,y : (point[0].y + point[1].y)/2};
        
        energyX = Math.pow(velosity[0].x,2)/2+Math.pow(velosity[1].x,2)/2+Math.pow(point[1].x-250,2)/2*k+Math.pow(point[0].x-point[1].x,2)/2*m;

        $('canvas')
        .drawEllipse({fillStyle: '#0f0', x:125+0.5*point[2].x, y:125+0.5*point[2].y, width: 10, height: 10})
     
        
        clearTimeout(timer);
        timer = setTimeout(loop,delay);
    }
    
    loop();
}

function draw(x,y){
        $('canvas')
        .drawEllipse({fillStyle: '#000', x:0.5*x, y:0.5*y, width: 20, height: 20})
        .drawEllipse({fillStyle: '#f00', x:250, y:250, width: 10, height: 10});
}

