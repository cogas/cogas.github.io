import System.Directory


checkFile :: FilePath -> IO ()
checkFile path = do
    htmlBool <- doesFileExist (path++".html") 
    jsBool <- doesFileExist (path++".js")
    if (htmlBool || jsBool) 
    then ioError (userError (error "There is a file named as the filepath."))
    else return ()

type Height = Int
type Width = Int

mkCanvas :: FilePath -> Width -> Height -> IO()
mkCanvas path wid hei = do
    checkFile path
    writeFile (path ++ ".html") $ canvashtmltext path wid hei
    writeFile (path ++ ".js") $ canvasjstext 0
    return ()

canvashtmltext :: FilePath -> Width -> Height -> String
canvashtmltext path wid hei = "<html>\n<head>\n\n<title>"++path++"</title>\n<script type=\"text/javascript\" src=\" "++path++".js\"></script>\n<link href=\"index.css\" rel=\"stylesheet\" type=\"text/css\">\n<style type=\"text/css\" media=\"screen\">\n/* <![CDATA[ */\ndiv#stage{\n    width:"++litwid++"px;\n    height:"++lithei++"px;\n    position:absolute;\n    top:50%;\n    left:50%;\n    margin-left:-300px;\n    margin-top:-250px;\n    border:1px solid black;\n}\n/* ]]> */\n</style>\n</head>\n\n<body><div class=\"lbor\">\n        <div class=\"title\">title</div>\n        <div class=\"text\">\n            brahbrah\n        </div>\n        </div>\n<div id=\"stage\">\n    <canvas id=\"cvs\" width="++(litwid)++" height="++lithei++"></canvas>\n</div>\n</body>\n</html>"
    where
    lithei = show hei
    litwid = show wid


canvasjstext :: Int -> String
canvasjstext 0 = "window.onload = function(){\n    var can = document.getElementById(\"cvs\");\n    if(!can.getContext) return false;\n    var ctx = can.getContext(\"2d\");\n    \n    ctx.fillRect(100,100,200,200);\n        //options\n    var point = {x:0,y:0};//\141\192\149W\n    var par = {x:4,y:6};//\149\207\137\187\151\202\n    var timer;//\131^\131C\131}\129[\n    var delay = 10;//\131^\131C\131}\129[\130\240\142\192\141s\130\183\130\233\138\212\138u\n    var width = can.width\n    var height = can.height\n    \n    function draw(x,y){\n        ctx.clearRect(0,0,width,height);//\136\234\147xcanvas\130\240\131N\131\138\131A\n        ctx.fillRect(x,y,5,5);//point\130\204\141\192\149W\130\201\149`\137\230\n    }\n    \n    var loop = function(){\n\n        draw(Math.random()*width,Math.random()*height);\n        clearTimeout(timer);\n        timer = setTimeout(loop,delay);\n    }\n    loop();\n\n}"
canvasjstext 1 = "window.onload = function(){\n    var can = document.getElementById(\"cvs\");\n    if(!can.getContext) return false;\n    var ctx = can.getContext(\"2d\");\n    \n    ctx.fillRect(100,100,200,200);\n    }"