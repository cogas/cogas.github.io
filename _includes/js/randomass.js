window.onload = function(){
    var can = document.getElementById("cvs");
    if(!can.getContext) return false;
    var ctx = can.getContext("2d");

    //options
    var point = {x:0,y:0};//座標
    var par = {x:4,y:6};//変化量
    var timer;//タイマー
    var delay = 1;//タイマーを実行する間隔
    var width = can.width
    var height = can.height
    
    //描画処理を行う関数。loop()関数の中で呼び出す。
    function draw(x,y){
//        ctx.clearRect(0,0,width,height);//一度canvasをクリア
        ctx.fillRect(x,y,5,5);//pointの座標に描画
    }
    
    //繰り返し描画を行う関数。
    var loop = function(){

        draw(Math.random()*width,Math.random()*height);
        clearTimeout(timer);
        timer = setTimeout(loop,delay);
    }
    loop();
}

